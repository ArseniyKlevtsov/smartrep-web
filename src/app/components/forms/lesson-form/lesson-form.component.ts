import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../../shared/services/lesson.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { GetLessonResponse } from '../../../shared/interfaces/lessons/responses/get-lesson-response';

@Component({
  selector: 'app-lesson-form',
  imports: [NgIf, ReactiveFormsModule, NgFor],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css',
  providers: [DatePipe]
})
export class LessonFormComponent implements OnInit {
  lessonForm: FormGroup;
  isEditMode = false;
  lessonId: string | null = null;
  currentLesson: GetLessonResponse | null = null;
  isLoading = false;

  statuses = [
    { value: 'SCHEDULED', label: 'Запланировано' },
    { value: 'COMPLETED', label: 'Завершено' },
    { value: 'CANCELLED', label: 'Отменено' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private lessonService: LessonService,
    private datePipe: DatePipe
  ) {
    this.lessonForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      price: [0, [Validators.required, Validators.min(0)]],
      startTime: ['', Validators.required],
      durationMinutes: [60, [Validators.required, Validators.min(30), Validators.max(240)]],
      paymentStatus: [false],
      status: ['SCHEDULED', Validators.required]
    });
  }

  ngOnInit(): void {
    this.lessonId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.lessonId;

    if (this.isEditMode) {
      this.loadLessonData();
    }
  }

  loadLessonData(): void {
    this.isLoading = true;
    this.lessonService.getLesson({ lessonId: this.lessonId! }).subscribe({
      next: (lesson) => {
        this.currentLesson = lesson;
        this.patchFormWithLessonData(lesson);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Ошибка загрузки занятия', err);
        this.isLoading = false;
        this.router.navigate(['/lessons']);
      }
    });
  }

  patchFormWithLessonData(lesson: GetLessonResponse): void {
    const formattedDate = this.datePipe.transform(lesson.startTime, 'yyyy-MM-ddTHH:mm');
    
    this.lessonForm.patchValue({
      name: lesson.name,
      description: lesson.description,
      price: lesson.price,
      startTime: formattedDate,
      durationMinutes: lesson.durationMinutes,
      paymentStatus: lesson.paymentStatus,
      status: lesson.status
    });
  }

  onSubmit(): void {
    if (this.lessonForm.invalid) return;

    const formValue = this.lessonForm.value;
    const lessonData = {
      id: this.lessonId,
      name: formValue.name,
      description: formValue.description,
      price: formValue.price,
      startTime: new Date(formValue.startTime),
      durationMinutes: formValue.durationMinutes,
      paymentStatus: formValue.paymentStatus,
      status: formValue.status
    };

    if (this.isEditMode) {
      this.updateLesson(lessonData);
    } else {
      this.createLesson(lessonData);
    }
  }

  createLesson(data: Omit<GetLessonResponse, 'id'>): void {
    this.lessonService.createLesson(data).subscribe({
      next: () => this.router.navigate(['/lessons']),
      error: (err) => console.error('Ошибка создания занятия', err)
    });
  }

  updateLesson(data: Partial<GetLessonResponse>): void {
    if (!this.lessonId) return;

    this.lessonService.updateLesson(this.lessonId, data).subscribe({
      next: () => this.router.navigate(['/lessons']),
      error: (err) => console.error('Ошибка обновления занятия', err)
    });
  }
}