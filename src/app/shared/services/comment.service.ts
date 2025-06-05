import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetLessonRequest } from '../interfaces/lessons/requests/get-lesson-request';
import { CommentsResponse } from '../interfaces/comments/responses/comments-response';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getLessonComments(request: GetLessonRequest): Observable<CommentsResponse> {
    return this.http.post<CommentsResponse>(
      '/api/Comments/getLessonComents',
      request
    );
  }

}
