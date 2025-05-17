import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {ClientService} from '../../../services/client.service';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent {
  client = {
    fullName: '',
    email: '',
    telephone: '',
    password: '',
  };

  constructor(private router: Router, private clientService: ClientService) {}

  saveClient() {
    this.clientService.createClient(this.client)
      .subscribe({
        next: () => {
          alert('Client enregistré avec succès');
          this.router.navigate(['/agent/clients']);
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de l\'enregistrement du client');
        },
      });

    this.router.navigate(['/agent/clients']);
  }
}
