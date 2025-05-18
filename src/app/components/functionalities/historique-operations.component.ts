// src/app/components/historique-operations.component.ts
import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationService } from '../../services/operation.service';
import { OperationDto } from '../../models/dtos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historique-operations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Historique des opérations pour compte {{ compteCode }}</h2>
    <button (click)="loadOperations()">Rafraîchir</button>
    <div *ngIf="loading">Chargement...</div>
    <div *ngIf="error" style="color:red">{{ error }}</div>
    <ul>
      <li *ngFor="let op of operations">
        {{ op.dateOperation | date:'short' }} - {{ op.type }} - {{ op.montant | currency:'EUR' }}
      </li>
    </ul>
  `
})
export class HistoriqueOperationsComponent implements OnChanges {
  @Input() compteCode!: string;

  operations: OperationDto[] = [];
  loading = false;
  error = '';

  constructor(private operationService: OperationService) {}

  ngOnChanges() {
    if (this.compteCode) {
      this.loadOperations();
    }
  }

  loadOperations() {
    this.loading = true;
    this.error = '';
    this.operationService.getHistorique(this.compteCode).subscribe({
      next: ops => {
        this.operations = ops;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement de l\'historique.';
        this.loading = false;
      }
    });
  }
}
