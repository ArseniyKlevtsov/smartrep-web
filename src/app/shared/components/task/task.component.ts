import { Component, Input } from '@angular/core';
import { LessonTaskResponse } from '../../interfaces/lesson-tasks/responses/lesson-task-response';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [NgIf],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task!: LessonTaskResponse;
  isExpanded = false;
}
