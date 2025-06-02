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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  login(user: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>('/api/auth/login', user).pipe(
      tap((loginResponse) => {
        this.tokenStorage.saveTokens(loginResponse);
        UserStorageService.saveUserId(loginResponse.userId);
      })
    );
  }

  register(request: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>('/api/auth/register', request);
  }

  logout(): void {
    this.tokenStorage.signOut();
    UserStorageService.clearUserId();
  }

  isLoggedIn(): boolean {
    return !!this.tokenStorage.getAccessToken();
  }

  getAuthToken(): string {
    return this.tokenStorage.getAccessToken();
  }

  refresh(request: RefreshRequestDto): Observable<LoginResponseDto> {
    return this.http.post(
      '/api/auth/refresh',
      request
    ) as Observable<LoginResponseDto>;
  }

  handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      let tokenResponse = this.tokenStorage.getTokens();
      if (
        tokenResponse.accessToken !== null &&
        tokenResponse.refreshToken !== null
      ) {
        this.refresh({
          expiredAccessToken: tokenResponse.accessToken,
          refreshToken: tokenResponse.refreshToken,
        }).subscribe((newTokens) => {
          this.tokenStorage.saveTokens(newTokens);
        });
      } else {
        this.router.navigate(['/login'], {
          queryParams: {
            sessionFailed: true,
          },
        });
      }
    }
    return throwError(() => error);
  }
  
}
