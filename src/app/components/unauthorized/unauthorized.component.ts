import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css',
})
export class UnauthorizedComponent {
  constructor(private router: Router, private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
