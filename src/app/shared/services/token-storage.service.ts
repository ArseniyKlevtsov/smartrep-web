import { Injectable } from '@angular/core';
import { LoginResponseDto } from '../interfaces/auth/responses/login-response-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private ACCESS_TOKEN_KEY = 'auth-token';
  private REFRESH_TOKEN_KEY = 'refresh-token';
  private USER_ID_KEY = 'user-id';

  constructor() {}

  public saveTokens(tokenResponse: LoginResponseDto): void {
    this.saveAccessToken(tokenResponse.accessToken);
    this.saveRefreshToken(tokenResponse.refreshToken);
  }

  public saveAccessToken(accessToken: string): void {
    window.localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
  }

  public saveRefreshToken(refreshToken: string): void {
    window.localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  public saveUserId(userId: string): void {
    window.localStorage.setItem(this.USER_ID_KEY, userId);
  }

  public getTokens(): LoginResponseDto | null {
    return {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
    };
  }

  public getAccessToken(): string | null {
    return window.localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return window.localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  public getUserId(): string | null {
    return window.localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }
  public signOut(): void {
    window.localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}
