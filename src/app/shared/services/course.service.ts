import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetFSPCoursesRequest } from '../interfaces/courses/requests/get-fsp-courses-request.interface';
import { GetFSPCoursesResponse } from '../interfaces/courses/responses/get-fsp-courses-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
  ) {}

  getShortcutUserProfile(request: GetFSPCoursesRequest): Observable<GetFSPCoursesResponse> {
    return this.http.post<GetFSPCoursesResponse>('/api/courses/getFSPCoursesResponse', request);
  }
}
