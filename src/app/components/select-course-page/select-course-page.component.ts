import { Component, OnInit } from '@angular/core';
import { CoursePreviewResponse } from '../../shared/interfaces/courses/responses/course-preview-response.interface';
import { CourseService } from '../../shared/services/course.service';
import { Router } from '@angular/router';
import { GetMyCoursesRequest } from '../../shared/interfaces/courses/requests/my-courses.request.interface';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-select-course-page',
  imports: [NgFor, NgIf],
  templateUrl: './select-course-page.component.html',
  styleUrl: './select-course-page.component.css'
})
export class SelectCoursePageComponent implements OnInit {
  courses: CoursePreviewResponse[] = [];
  isLoading = true;

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    let request: GetMyCoursesRequest = {
      AsTeacher: true,
      userId: UserStorageService.getUserId()
    }
    this.courseService.getMyCourses(request).subscribe({
      next: (response) => {
        this.courses = response.courses;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Ошибка загрузки курсов', err);
        this.isLoading = false;
      }
    });
  }

  selectCourse(courseId: string): void {
    this.router.navigate(['/lessons/new'], {
      queryParams: { courseId }
    });
  }
}