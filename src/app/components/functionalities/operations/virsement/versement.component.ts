import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OperationDto, CompteDto } from '../../../../models/dtos';
import { OperationService } from '../../../../services/operation.service';
import { CompteService } from '../../../../services/compte.service';

@Component({
  selector: 'app-versement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './versement.component.html',
})
export class VersementComponent implements OnInit {
  form: FormGroup;
  operation: OperationDto | null = null;
  error = '';
  loading = false;

  allComptes: CompteDto[] = [];
  filteredComptes$: Observable<CompteDto[]> = of([]);
  selectedCompte: CompteDto | null = null;
  hovered?: string;

  constructor(
    private fb: FormBuilder,
    private operationService: OperationService,
    private compteService: CompteService
  ) {
    this.form = this.fb.group({
      montant: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.compteService.getAllComptes().subscribe({
      next: comptes => {
        this.allComptes = comptes;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des comptes.';
      }
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const query = input?.value || '';
    console.log('Search query:', query);

    this.filteredComptes$ = of(this.allComptes).pipe(
      map(comptes =>
        comptes.filter(compte =>
          (compte.client?.fullName || '').toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  selectCompte(compte: CompteDto): void {
    this.selectedCompte = compte;
    this.filteredComptes$ = of([]);
  }

  onSubmit(): void {
    if (this.form.invalid || !this.selectedCompte?.code) return;

    this.loading = true;
    this.error = '';

    this.operationService
      .versement(this.selectedCompte.code, this.form.value.montant)
      .subscribe({
        next: op => {
          this.operation = op;
          this.loading = false;
          this.form.reset();
          this.selectedCompte = null;
        },
        error: () => {
          this.error = 'Erreur lors du versement.';
          this.loading = false;
        }
      });
  }
}
