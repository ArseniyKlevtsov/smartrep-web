import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from './token-storage.service';

import { RegisterRequestDto } from '../interfaces/auth/requests/register-request-dto.interface';
import { RefreshRequestDto } from '../interfaces/auth/requests/refresh-request-dto.interface';
import { LoginRequestDto } from '../interfaces/auth/requests/login-request-dto.interface';
import { LoginResponseDto } from '../interfaces/auth/responses/login-response-dto.interface';
import { Observable, tap, throwError } from 'rxjs';
import { RegisterResponseDto } from '../interfaces/auth/responses/register-response-dto';
import { UserStorageService } from './user-storage.service';
import { ShortcutUserProfileResponse } from '../interfaces/user/responses/shortcut-user-profile-response.interface';
import { UserInfoRequest } from '../interfaces/user/requests/user-info-request.interface';

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

}
