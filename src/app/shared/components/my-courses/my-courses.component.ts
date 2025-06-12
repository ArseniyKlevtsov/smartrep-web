import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoursePreviewResponse } from '../../interfaces/courses/responses/course-preview-response.interface';
import { CourseService } from '../../services/course.service';
import { GetMyCoursesRequest } from '../../interfaces/courses/requests/my-courses.request.interface';
import { UserStorageService } from '../../services/user-storage.service';
import { finalize } from 'rxjs';
import { CourseCardComponent } from "../course-card/course-card.component";

@Component({
  selector: 'app-my-courses',
  imports: [NgIf, CourseCardComponent, NgFor],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
  @Input() userId!: string;
  @Input() AsTeacher: boolean = false;
  @Input() showAddButton: boolean = false;
  @Output() addCourse = new EventEmitter<void>();

  courses: CoursePreviewResponse[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.error = null;

    const request: GetMyCoursesRequest = {
      userId: this.userId,
      AsTeacher: this.AsTeacher
    };

    this.courseService.getMyCourses(request).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response) => {
        this.courses = response.courses || [];
      },
      error: (err) => {
        this.error = 'Не удалось загрузить курсы';
        console.error(err);
      }
    });
  }

  onAddCourse(): void {
    this.addCourse.emit();
  }
}