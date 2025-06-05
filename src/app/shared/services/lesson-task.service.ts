import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { GetLessonRequest } from '../interfaces/lessons/requests/get-lesson-request';
import { LessonTasksResponse } from '../interfaces/lesson-tasks/responses/lesson-tasks-response';

@Injectable({
  providedIn: 'root',
})
export class LessonTaskService {

  constructor(
    private http: HttpClient,
  ) {}

  getLessonTasks(request: GetLessonRequest): Observable<LessonTasksResponse> {
    return this.http.post<LessonTasksResponse>('/api/lessonTasks/getLessonTasks', request);
  }
}
