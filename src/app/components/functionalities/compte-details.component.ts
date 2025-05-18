// src/app/components/compte-details.component.ts
import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompteService } from '../../services/compte.service';
import { CompteDto } from '../../models/dtos';

@Component({
  selector: 'app-compte-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Détails du compte {{ compteCode }}</h2>
    <button (click)="loadCompte()">Charger</button>
    <div *ngIf="compte">
      <p>Code: {{ compte.code }}</p>
      <p>Solde: {{ compte.solde | currency:'EUR' }}</p>
      <p>Date de création: {{ compte.dateCreation | date }}</p>
      <p>Status: {{ compte.status }}</p>
      <p>Client ID: {{ compte.clientId }}</p>
      <p>Agent ID: {{ compte.agentId }}</p>
    </div>
    <div *ngIf="error" style="color:red">{{ error }}</div>
  `
})
export class CompteDetailsComponent {
  @Input() compteCode!: string;

  compte: CompteDto | null = null;
  error = '';

  constructor(private compteService: CompteService) {}

  loadCompte() {
    if (!this.compteCode) return;
    this.error = '';
    this.compteService.getCompteByCode(this.compteCode).subscribe({
      next: compte => this.compte = compte,
      error: () => this.error = 'Erreur lors du chargement du compte.'
    });
  }
}
