import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { DashboardComponent as AgentDashboardComponent } from './components/agent/dashboard/dashboard.component';
import { DashboardComponent as ClientDashboardComponent } from './components/client/dashboard/dashboard.component';
import { authGuard, agentGuard, clientGuard } from './guards/auth.guard';
import { CreateClientComponent } from './components/agent/clients/create-client.component';
import { ClientsComponent } from './components/agent/clients/clients.component';
import { AgentLayoutComponent } from './components/agent/agent-layout/agent-layout.component';
import {CompteListComponent} from './components/functionalities/list-comptes/compte-list.component';
import {CreateCompteComponent} from './components/functionalities/create-compte/create-compte.component';
import {HistoriqueOperationsComponent} from './components/functionalities/historique-operations.component';
import {VersementComponent} from './components/functionalities/operations/virsement/versement.component';
import {RetraitComponent} from './components/functionalities/retrait.component';
import {VirementComponent} from './components/functionalities/operations/virement/virement.component';




export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'agent',
    component: AgentLayoutComponent,
    canActivate: [authGuard, agentGuard],
    children: [
      { path: 'dashboard', component: AgentDashboardComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'clients/new', component: CreateClientComponent },
      { path: 'comptes', component: CompteListComponent },
      { path: 'comptes/new', component: CreateCompteComponent },
      { path: 'transactions', component: HistoriqueOperationsComponent },

      { path: 'versement', component: VersementComponent },
      { path: 'retrait', component: RetraitComponent },
      { path: 'virement', component: VirementComponent },

    ],
  },
  {
    path: 'client',
    canActivate: [authGuard, clientGuard],
    children: [
      { path: 'dashboard', component: ClientDashboardComponent },
      // Add more client routes as needed
    ],
  },
  { path: '**', redirectTo: '/login' },
];
