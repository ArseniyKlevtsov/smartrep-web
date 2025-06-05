import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  imports: [NgIf, FormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent {
  @Input() lessonId!: string;
  @Output() commentAdded = new EventEmitter<void>();
  
  message = '';
  file: File | null = null;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(private commentService: CommentService) {}

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  submitComment(): void {
    if (!this.message.trim() && !this.file) return;

    this.isSubmitting = true;
    this.errorMessage = null;

    // Здесь должна быть реализация отправки комментария
    // В реальном приложении используйте FormData для отправки файла
    const formData = new FormData();
    formData.append('lessonId', this.lessonId);
    formData.append('message', this.message);
    if (this.file) {
      formData.append('file', this.file);
    }
    /*
    this.commentService.addComment(formData).subscribe({
      next: () => {
        this.message = '';
        this.file = null;
        this.isSubmitting = false;
        this.commentAdded.emit();
      },
      error: (err) => {
        this.errorMessage = 'Ошибка при отправке комментария';
        this.isSubmitting = false;
        console.error(err);
      }
    });
    */
  }
}
