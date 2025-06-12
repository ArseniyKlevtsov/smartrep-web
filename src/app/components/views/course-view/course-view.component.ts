import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../shared/services/course.service';
import { UserStorageService } from '../../../shared/services/user-storage.service';
import { FullCourseResponse } from '../../../shared/interfaces/courses/responses/full-course-info-response.interface';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ImeageErrorHandelrService } from '../../../shared/services/image-error-handler.service';

@Component({
  selector: 'app-course-view',
  imports: [NgIf, NgFor, CurrencyPipe],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css',
})
export class CourseViewComponent {
  courseId!: string;
  course!: FullCourseResponse;
  isLoading = true;
  isCurrentUserTeacher = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    public iehs: ImeageErrorHandelrService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.loadCourse();
  }

  loadCourse(): void {
    this.courseService.getFullCourse({ courseId: this.courseId }).subscribe({
      next: (response) => {
        this.course = response;
        this.isCurrentUserTeacher =
          UserStorageService.getUserId() === response.teacherId;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load course', err);
        this.isLoading = false;
      },
    });
  }

  onEditCourse(): void {
    this.router.navigate([`/courses/edit/${this.courseId}`]);
  }

}
