import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
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
}
