import { Component } from '@angular/core';
import { ModeService } from '../../shared/services/mode.service';
import { Router } from '@angular/router';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { NotificationService } from '../../shared/services/notification.service';
import { TeacherService } from '../../shared/services/teacher.service';

@Component({
  selector: 'app-select-mode-page',
  imports: [],
  templateUrl: './select-mode-page.component.html',
  styleUrl: './select-mode-page.component.css',
})
export class SelectModePageComponent {
  constructor(
    private modeService: ModeService,
    private router: Router,
    private teacherService: TeacherService
  ) {}

  selectTeacherMode() {
    const userId = UserStorageService.getUserId();
    this.teacherService.setTeacherStatus(userId).subscribe({
      next: () => this.router.navigate(['/all-courses']),
      error: (err) => console.error('Ошибка:', err),
    });
  }

  selectStudentMode() {
    this.modeService.setStudentMode();
    this.router.navigate(['/all-courses']);
  }
}
