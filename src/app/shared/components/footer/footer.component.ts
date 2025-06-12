import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  constructor(private router: Router) {}

  navigateToCourses(): void {
    this.router.navigate(['/all-courses']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToTeachers(): void {
    this.router.navigate(['/all-teachers']);
  }
}
