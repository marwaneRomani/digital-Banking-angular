import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CompteDto} from '../../../models/dtos';
import {CompteService} from '../../../services/compte.service';

@Component({
  selector: 'app-compte-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compte-list.component.html'
})
export class CompteListComponent {
  @Input() clientId?: number;
  comptes: CompteDto[] = [];
  error = '';

  // Search and filter bindings
  searchTerm = '';
  selectedType = '';

  constructor(private compteService: CompteService) {
    this.loadComptes();
  }


  loadComptes() {
    this.error = '';
    if (this.clientId != null) {
      this.compteService.getComptesByClient(this.clientId).subscribe({
        next: comptes => (this.comptes = comptes),
        error: () => (this.error = 'Erreur lors du chargement des comptes par client.')
      });
    } else {
      this.compteService.getAllComptes().subscribe({
        next: comptes => (this.comptes = comptes),
        error: () => (this.error = 'Erreur lors du chargement de tous les comptes.')
      });
    }
  }

  filteredComptes(): CompteDto[] {
    return this.comptes.filter((compte) => {
      // Filter by type (case-insensitive)
      const typeMatch =
        !this.selectedType ||
        (compte.type && compte.type.toUpperCase() === this.selectedType.toUpperCase());

      // Filter by client fullName safely
      const clientName = compte.client?.fullName ?? '';
      const nameMatch =
        !this.searchTerm ||
        clientName.toLowerCase().includes(this.searchTerm.toLowerCase());

      return typeMatch && nameMatch;
    });
  }

  changeStatus(compte: CompteDto, newStatus: 'CREATED' | 'ACTIVATED' | 'SUSPENDED') {
    if (!compte.code) {
      this.error = "Code du compte invalide.";
      return;
    }
    this.error = '';
    this.compteService.changeCompteStatus(compte.code, newStatus).subscribe({
      next: updatedCompte => {
        const index = this.comptes.findIndex(c => c.code === updatedCompte.code);
        if (index !== -1) {
          this.comptes[index] = updatedCompte;
        }
      },
      error: () => {
        this.error = 'Erreur lors du changement du statut du compte.';
      }
    });
  }

}
