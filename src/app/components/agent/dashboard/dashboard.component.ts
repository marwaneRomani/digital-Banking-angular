import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  email: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get user email from local storage
    const storedEmail = localStorage.getItem('auth_email');
    if (storedEmail) {
      this.email = storedEmail;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
