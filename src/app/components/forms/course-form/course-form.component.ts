import { Component, OnInit } from '@angular/core';
import { FullCourseResponse } from '../../../shared/interfaces/courses/responses/full-course-info-response.interface';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../shared/services/course.service';
import { ShortcutUserProfileResponse } from '../../../shared/interfaces/user/responses/shortcut-user-profile-response.interface';
import { NgFor, NgIf } from '@angular/common';
import { ImeageErrorHandelrService } from '../../../shared/services/image-error-handler.service';

@Component({
  selector: 'app-course-form',
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  isEditMode = false;
  courseId: string | null = null;
  students: ShortcutUserProfileResponse[] = [];
  newStudentNickname = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private courseService: CourseService,
    public imageHandler: ImeageErrorHandelrService
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
      this.isEditMode = this.route.snapshot.data['mode'] === 'edit';

      if (this.isEditMode && this.courseId) {
        this.loadCourseData();
      }
    });
  }

  loadCourseData(): void {
    this.courseService.getFullCourse({ courseId: this.courseId! }).subscribe({
      next: (course: FullCourseResponse) => {
        this.courseForm.patchValue({
          title: course.courseName,
          description: course.courseDescription,
          price: course.price,
        });
        this.students = course.students || [];
      },
      error: (err) => console.error('Ошибка загрузки курса', err),
    });
  }

  onSubmit(): void {
    if (this.courseForm.invalid) return;

    const courseData = {
      ...this.courseForm.value,
      studentNicknames: this.students.map((s) => s.username),
    };

    if (this.isEditMode) {
      this.courseService.updateCourse(this.courseId!, courseData).subscribe({
        next: () => this.router.navigate(['/my-courses']),
        error: (err) => console.error('Ошибка обновления', err),
      });
    } else {
      this.courseService.createCourse(courseData).subscribe({
        next: () => this.router.navigate(['/my-courses']),
        error: (err) => console.error('Ошибка создания', err),
      });
    }
  }

  addStudent(): void {
    const nickname = this.newStudentNickname.trim();
    if (!nickname) return;

    if (this.students.some((s) => s.username === nickname)) {
      alert('Этот ученик уже добавлен');
      return;
    }

    this.students.push({
      username: nickname,
      avatarUrl: 'assets/images/default-avatar.png',
    });
    this.newStudentNickname = '';
  }

  removeStudent(index: number): void {
    this.students.splice(index, 1);
  }

  deleteCourse(): void {
    if (confirm('Вы уверены, что хотите удалить этот курс?')) {
      this.courseService.deleteCourse(this.courseId!).subscribe({
        next: () => this.router.navigate(['/my-courses']),
        error: (err) => console.error('Ошибка удаления', err),
      });
    }
  }
}
