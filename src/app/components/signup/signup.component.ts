import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }

    this.errorMessage = '';
    this.authService.signup({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errorMessage = 'Email is already taken.';
        } else {
          this.errorMessage = err.error?.message || 'Signup failed. Please try again.';
        }
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
