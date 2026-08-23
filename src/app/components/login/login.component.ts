import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }

    this.errorMessage = '';
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 400) {
          this.errorMessage = 'Invalid email or password.';
        } else {
          this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        }
      }
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
