import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { ClientDto } from '../../../models/dtos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  protected clients: ClientDto[] = [];
  protected filteredClients: ClientDto[] = [];
  protected searchTerm: string = '';

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.filteredClients = clients;
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors du chargement des clients');
      },
    });
  }

  protected applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      (client.fullName?.toLowerCase().includes(term) ||
        client.email?.toLowerCase().includes(term) ||
        client.telephone?.toLowerCase().includes(term) ||
        client.id?.toString().includes(term))
    );
  }
}
