import { Component, Input } from '@angular/core';
import { LessonPreviewResponse } from '../../interfaces/lessons/responses/lesson-preview-response';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-card',
  imports: [NgIf],
  templateUrl: './lesson-card.component.html',
  styleUrl: './lesson-card.component.css',
})
export class LessonCardComponent {
  @Input() lesson!: LessonPreviewResponse;
  @Input() backgroundColor: string = '#ffffff';

  constructor(private router: Router) {}

  truncateText(text: string, maxLength: number): string {
    return text?.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  }

  formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  navigateToLesson(lessonId: string): void {
    this.router.navigate(['/lessons', lessonId]);
  }
}
