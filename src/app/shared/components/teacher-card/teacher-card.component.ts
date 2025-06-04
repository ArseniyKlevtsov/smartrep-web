import { Component, Input } from '@angular/core';
import { TeacherPreviewResponse } from '../../interfaces/teachers/responses/teacher-preview-response.interface';

@Component({
  selector: 'app-teacher-card',
  imports: [],
  templateUrl: './teacher-card.component.html',
  styleUrl: './teacher-card.component.css'
})
export class TeacherCardComponent {
  @Input() teacher!: TeacherPreviewResponse;

  truncateText(text: string, maxLength: number): string {
    return text?.length > maxLength ? text.substring(0, maxLength) + '...' : text || '';
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'avatar-default.png';
  }
}
