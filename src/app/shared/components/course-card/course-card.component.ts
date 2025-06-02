import { Component, Input } from '@angular/core';
import { CoursePreviewResponse } from '../../interfaces/courses/responses/course-preview-response.interface';

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent {
  @Input() course!: CoursePreviewResponse;

  handleAvatarImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'avatar-default.png';
  }
  
  handleCourseImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'default-course.png';
  }

  truncateText(text: string, limit: number = 100): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('by-BY', {
      style: 'currency',
      currency: 'BYN',
      minimumFractionDigits: 0,
    }).format(amount);
  }
}
