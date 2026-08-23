import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-studio',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './studio.component.html'
})
export class StudioComponent {
  videos: any[] = [];

  onUploadClick() {
    console.log('Upload clicked');
  }
}
