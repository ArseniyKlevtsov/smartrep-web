import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetMyLessonsRequest } from '../interfaces/lessons/requests/get-my-lessons-request';
import { GetMyLessonsResponse } from '../interfaces/lessons/responses/get-my-lessons-response';
import { GetLessonRequest } from '../interfaces/lessons/requests/get-lesson-request';
import { GetLessonResponse } from '../interfaces/lessons/responses/get-lesson-response';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private http: HttpClient) {}

  GetLessons(request: GetMyLessonsRequest): Observable<GetMyLessonsResponse> {
    const formattedRequest = {
      ...request,
      startDate: this.formatDate(request.startDate),
      endDate: this.formatDate(request.endDate),
    };
    return this.http.post<GetMyLessonsResponse>(
      '/api/lessons/getMyLessons',
      formattedRequest
    );
  }

  private formatDate(dateString: string): string {
    return new Date(dateString).toISOString();
  }

  getLesson(request: GetLessonRequest): Observable<GetLessonResponse> {
    return this.http.post<GetLessonResponse>(
      '/api/lessons/getLesson',
      request
    );
  }
}
