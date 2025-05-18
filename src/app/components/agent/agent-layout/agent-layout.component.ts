// agent-layout.component.ts
import { Component } from '@angular/core';
import {
  RouterModule,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-agent-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <h2 class="text-black text-xl font-bold mb-6">Agent Panel</h2>
        <nav class="flex flex-col gap-2">
          <a
            routerLink="/agent/dashboard"
            routerLinkActive="bg-gray-700"
            [routerLinkActiveOptions]="{ exact: true }"
            class="px-3 py-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </a>
          <a
            routerLink="/agent/clients"
            routerLinkActive="bg-gray-700"
            class="px-3 py-2 rounded hover:bg-gray-700"
          >
            Clients
          </a>
          <a
            routerLink="/agent/clients/new"
            routerLinkActive="bg-gray-700"
            class="px-3 py-2 rounded hover:bg-gray-700"
          >
            Ajouter un client
          </a>
          <a
            routerLink="/agent/comptes"
            routerLinkActive="bg-gray-700"
            class="px-3 py-2 rounded hover:bg-gray-700"
          >
            Comptes
          </a>
          <a
            routerLink="/agent/comptes/new"
            routerLinkActive="bg-gray-700"
            class="px-3 py-2 rounded hover:bg-gray-700"
          >
            Créer un compte
          </a>
          <a
            routerLink="/agent/transactions"
            routerLinkActive="bg-gray-700"
            class="px-3 py-2 rounded hover:bg-gray-700"
          >
            Transactions
          </a>

          <a
            routerLink="/agent/versement"
            routerLinkActive="bg-gray-700"
            class="px-3 py-2 rounded hover:bg-gray-700"
          >
            Versement
          </a>
          <a
            routerLink="/agent/retrait"
            routerLinkActive="bg-gray-700"
            class="px-3 py-2 rounded hover:bg-gray-700"
          >
            Retrait
          </a>
          <a
            routerLink="/agent/virement"
            routerLinkActive="bg-gray-700"
            class="px-3 py-2 rounded hover:bg-gray-700"
          >
            Virement
          </a>
        </nav>

        <button
          style="padding: 10px 15px;
                        background-color: #e74c3c;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 16px;
                        transition: background-color 0.3s;"
          (click)="logout()"
        >
          Logout
        </button>
      </aside>

      <!-- Main content -->
      <main class="flex-1 bg-gray-100 p-6">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AgentLayoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
  }
}
