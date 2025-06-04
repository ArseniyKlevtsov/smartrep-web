import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetFSPTeachersRequest } from '../interfaces/teachers/requests/get-fsp-teachers-request.interface';
import { GetFSPTeachersResponse } from '../interfaces/teachers/responses/get-fsp-teachers-response.interface';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(
    private http: HttpClient,
  ) {}

  getShortcutUserProfile(request: GetFSPTeachersRequest): Observable<GetFSPTeachersResponse> {
    return this.http.post<GetFSPTeachersResponse>('/api/teachers/getFSPTeachersResponse', request);
  }
}
