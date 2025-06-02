import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  static USER_ID_KEY = 'user-id';

  public static saveUserId(userId: string): void {
    window.localStorage.setItem(this.USER_ID_KEY, userId);
  }
  public static getUserId(): string | null {
    return window.localStorage.getItem(this.USER_ID_KEY);
  }
  public static clearUserId(): void {
    window.localStorage.removeItem(this.USER_ID_KEY);
  }
}
