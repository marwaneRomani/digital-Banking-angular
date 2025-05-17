import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OperationService } from '../../../../services/operation.service';
import { CompteService } from '../../../../services/compte.service';
import { CompteDto } from '../../../../models/dtos';

@Component({
  selector: 'app-virement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './virement.component.html',
})
export class VirementComponent implements OnInit {
  form: FormGroup;
  error = '';
  loading = false;

  allComptes: CompteDto[] = [];

  filteredComptesSource$: Observable<CompteDto[]> = of([]);
  filteredComptesDestination$: Observable<CompteDto[]> = of([]);

  selectedCompteSource: CompteDto | null = null;
  selectedCompteDestination: CompteDto | null = null;

  hoveredSource?: string;
  hoveredDestination?: string;

  constructor(
    private fb: FormBuilder,
    private operationService: OperationService,
    private compteService: CompteService
  ) {
    this.form = this.fb.group({
      montant: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.compteService.getAllComptes().subscribe({
      next: (comptes) => {
        this.allComptes = comptes;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des comptes.';
      },
    });
  }

  onSearchSource(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const query = input?.value || '';

    this.filteredComptesSource$ = of(this.allComptes).pipe(
      map(comptes =>
        comptes.filter(compte =>
          (compte.client?.fullName || '').toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  onSearchDestination(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const query = input?.value || '';

    this.filteredComptesDestination$ = of(this.allComptes).pipe(
      map(comptes =>
        comptes
          // Exclude the source account here:
          .filter(compte => compte.code !== this.selectedCompteSource?.code)
          .filter(compte =>
            (compte.client?.fullName || '').toLowerCase().includes(query.toLowerCase())
          )
      )
    );
  }

  selectCompteSource(compte: CompteDto): void {
    this.selectedCompteSource = compte;
    this.filteredComptesSource$ = of([]);
    // reset destination on source change to avoid stale selection
    this.selectedCompteDestination = null;
    this.filteredComptesDestination$ = of([]);
  }

  selectCompteDestination(compte: CompteDto): void {
    this.selectedCompteDestination = compte;
    this.filteredComptesDestination$ = of([]);
  }


  onSubmit(): void {
    if (
      this.form.invalid ||
      !this.selectedCompteSource?.code ||
      !this.selectedCompteDestination?.code
    )
      return;

    if (this.selectedCompteSource.code === this.selectedCompteDestination.code) {
      this.error = "Le compte source et le compte de destination doivent être différents.";
      return;
    }

    this.loading = true;
    this.error = '';

    this.operationService
      .virement(
        this.selectedCompteSource.code,
        this.selectedCompteDestination.code,
        this.form.value.montant
      )
      .subscribe({
        next: () => {
          this.loading = false;
          this.form.reset();
          this.selectedCompteSource = null;
          this.selectedCompteDestination = null;
          alert('Virement effectué avec succès.');
        },
        error: () => {
          this.error = 'Erreur lors du virement.';
          this.loading = false;
        },
      });
  }
}
