import { Component, OnInit } from '@angular/core';
import { CoursePreviewResponse } from '../../shared/interfaces/courses/responses/course-preview-response.interface';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, Observable, of, switchMap, tap } from 'rxjs';
import { CourseService } from '../../shared/services/course.service';
import { GetFSPCoursesResponse } from '../../shared/interfaces/courses/responses/get-fsp-courses-response.interface';
import { GetFSPCoursesRequest } from '../../shared/interfaces/courses/requests/get-fsp-courses-request.interface';
import { NgFor, NgIf } from '@angular/common';
import { CourseCardComponent } from "../../shared/components/course-card/course-card.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-courses-page',
  imports: [NgIf, NgFor, CourseCardComponent, FormsModule],
  templateUrl: './all-courses-page.component.html',
  styleUrl: './all-courses-page.component.css'
})
export class AllCoursesPageComponent implements OnInit {
  isLoading = false;
  isLoadingMore = false;
  searchText = '';
  courses: CoursePreviewResponse[] = [];
  totalCount = 0;
  currentPage = 0;
  pageSize = 10;

  private searchSubject = new BehaviorSubject<string>('');

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(search => {
        this.currentPage = 0;
        this.courses = [];
        return this.loadCourses(search);
      })
    ).subscribe();
  }

  onSearch(): void {
    this.searchSubject.next(this.searchText);
  }

  loadMore(): void {
    if (this.canLoadMore()) {
      this.currentPage++;
      this.loadCourses(this.searchText, false).subscribe();
    }
  }

  canLoadMore(): boolean {
    return !this.isLoadingMore && 
           this.courses.length < this.totalCount && 
           this.courses.length > 0;
  }

  private loadCourses(nameFilter: string = '', reset: boolean = true): Observable<GetFSPCoursesResponse> {
    this.isLoading = reset;
    this.isLoadingMore = !reset;

    const request: GetFSPCoursesRequest = {
      nameFilter: nameFilter,
      startIndex: this.currentPage * this.pageSize,
      pageSize: this.pageSize
    };

    return this.courseService.getFSPCourses(request).pipe(
      tap(response => {
        if (reset) {
          this.courses = response.courses;
        } else {
          this.courses = [...this.courses, ...response.courses];
        }
        this.totalCount = response.totalCount;
        this.isLoading = false;
        this.isLoadingMore = false;
      }),
      catchError(error => {
        this.isLoading = false;
        this.isLoadingMore = false;
        console.error('Error loading courses', error);
        return of({ courses: [], totalCount: 0 });
      })
    );
  }
}
