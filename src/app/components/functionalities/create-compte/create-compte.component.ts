import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CompteService } from '../../../services/compte.service';
import { CompteCourantDto, CompteEpargneDto } from '../../../models/dtos';

@Component({
  selector: 'app-create-compte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-compte.component.html'  // assuming you put the html in this file
})
export class CreateCompteComponent implements OnInit {
  form!: FormGroup;
  createdCompte: CompteCourantDto | CompteEpargneDto | null = null;
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private compteService: CompteService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['courant', Validators.required],
      clientId: [null, [Validators.required, Validators.min(1)]],
      decouvert: [0, [this.positiveOrZeroValidator]],
      tauxInteret: [0, [this.positiveOrZeroValidator, Validators.max(100)]],
    });

    // Optional: dynamically enable/disable validators based on type selection
    this.form.get('type')?.valueChanges.subscribe(type => {
      if (type === 'courant') {
        this.form.get('decouvert')?.setValidators([this.positiveOrZeroValidator]);
        this.form.get('tauxInteret')?.clearValidators();
        this.form.get('tauxInteret')?.setValue(0);
      } else {
        this.form.get('tauxInteret')?.setValidators([this.positiveOrZeroValidator, Validators.max(100)]);
        this.form.get('decouvert')?.clearValidators();
        this.form.get('decouvert')?.setValue(0);
      }
      this.form.get('decouvert')?.updateValueAndValidity();
      this.form.get('tauxInteret')?.updateValueAndValidity();
    });
  }

  positiveOrZeroValidator(control: AbstractControl) {
    const value = control.value;
    if (value == null || value < 0) {
      return { positiveOrZero: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';
    this.createdCompte = null;

    const { type, clientId, decouvert, tauxInteret } = this.form.value;

    if (type === 'courant') {
      const dto: CompteCourantDto = {
        clientId: clientId ?? undefined,
        decouvert: decouvert ?? undefined,
      };
      this.compteService.createCompteCourant(dto).subscribe({
        next: compte => {
          this.createdCompte = compte;
          this.loading = false;
          this.form.reset({ type: 'courant', clientId: null, decouvert: 0, tauxInteret: 0 });
        },
        error: () => {
          this.error = 'Erreur lors de la création du compte courant.';
          this.loading = false;
        }
      });
    } else if (type === 'epargne') {
      const dto: CompteEpargneDto = {
        clientId: clientId ?? undefined,
        tauxInteret: tauxInteret ?? undefined,
      };
      this.compteService.createCompteEpargne(dto).subscribe({
        next: compte => {
          this.createdCompte = compte;
          this.loading = false;
          this.form.reset({ type: 'epargne', clientId: null, decouvert: 0, tauxInteret: 0 });
        },
        error: () => {
          this.error = 'Erreur lors de la création du compte épargne.';
          this.loading = false;
        }
      });
    }
  }
}
