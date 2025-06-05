import { Component, Input } from '@angular/core';
import { LessonTaskResponse } from '../../interfaces/lesson-tasks/responses/lesson-task-response';
import { NgFor, NgIf } from '@angular/common';
import { TaskComponent } from "../task/task.component";

@Component({
  selector: 'app-task-list',
  imports: [NgIf, NgFor, TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks: LessonTaskResponse[] = [];
}
