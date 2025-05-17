// src/app/components/retrait.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { OperationService } from '../../services/operation.service';
import { OperationDto } from '../../models/dtos';

@Component({
  selector: 'app-retrait',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Retrait (Withdrawal)</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>Compte Code:
        <input formControlName="compteCode" />
      </label>
      <label>Montant:
        <input formControlName="montant" type="number" min="0" />
      </label>
      <button type="submit" [disabled]="form.invalid || loading">Retirer</button>
    </form>

    <div *ngIf="operation">
      <h3>Retrait effectué</h3>
      <pre>{{ operation | json }}</pre>
    </div>

    <div *ngIf="error" style="color:red">{{ error }}</div>
  `
})
export class RetraitComponent {
  form: any;
  operation: OperationDto | null = null;
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private operationService: OperationService) {
    this.form = this.fb.group({
      compteCode: ['', Validators.required],
      montant: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    this.operationService
      .retrait(this.form.value.compteCode!, this.form.value.montant!)
      .subscribe({
        next: op => {
          this.operation = op;
          this.loading = false;
          this.form.reset();
        },
        error: err => {
          this.error = 'Erreur lors du retrait.';
          this.loading = false;
        }
      });
  }
}
