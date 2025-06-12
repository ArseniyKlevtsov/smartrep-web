import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetFSPCoursesRequest } from '../interfaces/courses/requests/get-fsp-courses-request.interface';
import { GetFSPCoursesResponse } from '../interfaces/courses/responses/get-fsp-courses-response.interface';
import { Observable } from 'rxjs';
import { FullCourseResponse } from '../interfaces/courses/responses/full-course-info-response.interface';
import { CourseInfoRequest } from '../interfaces/courses/requests/course-info-request.interface';
import { UpdateCourseRequest } from '../interfaces/courses/requests/update-course-request.interface';
import { CreateCourseRequest } from '../interfaces/courses/requests/create-course-request.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  getFSPCourses(
    request: GetFSPCoursesRequest
  ): Observable<GetFSPCoursesResponse> {
    return this.http.post<GetFSPCoursesResponse>(
      '/api/courses/getFSPCourses',
      request
    );
  }

  getMyCourses(request: any): Observable<any> {
    return this.http.post('/api/courses/getMyCourses', request);
  }

  createCourse(request: CreateCourseRequest): Observable<void> {
    return this.http.post<void>('/api/courses/createCourse', request);
  }

  updateCourse(request: UpdateCourseRequest): Observable<void> {
    return this.http.post<void>('/api/courses/updateCourse', request);
  }

  deleteCourse(courseId: string): Observable<void> {
    return this.http.delete<void>(`/api/courses/deleteCourse?id=${courseId}`);
  }

  getFullCourse(request: CourseInfoRequest): Observable<FullCourseResponse> {
    return this.http.post<FullCourseResponse>(
      '/api/courses/getFullCourse',
      request
    );
  }
}
