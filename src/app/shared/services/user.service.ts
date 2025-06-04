import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { ShortcutUserProfileResponse } from '../interfaces/user/responses/shortcut-user-profile-response.interface';
import { UserInfoRequest } from '../interfaces/user/requests/user-info-request.interface';
import { UserProfileResponse } from '../interfaces/user/responses/user-profile-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) {}

  getShortcutUserProfile(request: UserInfoRequest): Observable<ShortcutUserProfileResponse> {
    return this.http.post<ShortcutUserProfileResponse>('/api/users/getShortcutUserProfile', request);
  }

  getUserProfile(request: UserInfoRequest): Observable<UserProfileResponse> {
    return this.http.post<UserProfileResponse>('/api/users/getUserProfile', request);
  }

}
