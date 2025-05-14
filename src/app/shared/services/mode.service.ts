import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  private readonly MODE_KEY = 'app_mode';

  readonly MODES = {
    TEACHER: 'teacher',
    STUDENT: 'student',
  } as const;

  constructor() {}

  setTeacherMode(): void {
    this.setMode(this.MODES.TEACHER);
  }

  setStudentMode(): void {
    this.setMode(this.MODES.STUDENT);
  }

  getCurrentMode(): string | null {
    return localStorage.getItem(this.MODE_KEY);
  }

  isTeacherMode(): boolean {
    return this.getCurrentMode() === this.MODES.TEACHER;
  }

  isStudentMode(): boolean {
    return this.getCurrentMode() === this.MODES.STUDENT;
  }

  private setMode(mode: string): void {
    localStorage.setItem(this.MODE_KEY, mode);
  }

  clearMode(): void {
    localStorage.removeItem(this.MODE_KEY);
  }
}
