import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onLogoutClick() {
    const confirmed = confirm('Are you sure you want to log out?');
    if (confirmed) {
      this.authService.logout().subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.router.navigate(['/']);
        }
      });
    }
  }
}
