import { Component } from '@angular/core';
import { ModeService } from '../../shared/services/mode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-mode-page',
  imports: [],
  templateUrl: './select-mode-page.component.html',
  styleUrl: './select-mode-page.component.css',
})
export class SelectModePageComponent {
  constructor(private modeService: ModeService, private router: Router) {}

  selectTeacherMode() {
    this.modeService.setTeacherMode();
    this.router.navigate(['/teacher-courses']);
  }

  selectStudentMode() {
    this.modeService.setStudentMode();
    this.router.navigate(['/all-courses']);
  }
}
