import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../shared/services/lesson.service';
import { GetLessonResponse } from '../../shared/interfaces/lessons/responses/get-lesson-response';
import { CommentResponse } from '../../shared/interfaces/comments/responses/comment-response';
import { LessonTaskResponse } from '../../shared/interfaces/lesson-tasks/responses/lesson-task-response';
import { CommentService } from '../../shared/services/comment.service';
import { LessonTaskService } from '../../shared/services/lesson-task.service';
import { GetLessonRequest } from '../../shared/interfaces/lessons/requests/get-lesson-request';
import { NotificationService } from '../../shared/services/notification.service';
import { CurrencyPipe, DatePipe, NgClass, NgIf } from '@angular/common';
import { StatusTranslatePipe } from '../../shared/pipes/status-translate.pipe';
import { TaskListComponent } from "../../shared/components/task-list/task-list.component";
import { CommentListComponent } from "../../shared/components/comment-list/comment-list.component";
import { AddCommentComponent } from "../../shared/components/add-comment/add-comment.component";

@Component({
  selector: 'app-lesson-page',
  imports: [DatePipe, NgIf, NgClass, StatusTranslatePipe, CurrencyPipe, TaskListComponent, CommentListComponent, AddCommentComponent],
  templateUrl: './lesson-page.component.html',
  styleUrl: './lesson-page.component.css',
})
export class LessonPageComponent implements OnInit {
  lesson: GetLessonResponse | null = null;
  comments: CommentResponse[] = [];
  tasks: LessonTaskResponse[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  activeTab: 'info' | 'tasks' | 'comments' = 'info';

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private commentService: CommentService,
    private taskService: LessonTaskService
  ) {}

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('id');
    if (lessonId) {
      this.loadData(lessonId);
    } else {
      this.errorMessage = 'ID урока не указан';
      this.isLoading = false;
    }
  }

  loadData(lessonId: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    let request: GetLessonRequest = {
      lessonId: lessonId
    }
    this.lessonService.getLesson(request).subscribe({
      next: (lesson) => {
        this.lesson = lesson;
        this.loadComments(lessonId);
        this.loadTasks(lessonId);
      },
      error: (err) => this.handleError('Ошибка загрузки урока', err),
    });
  }

  loadComments(lessonId: string): void {
    this.commentService.getLessonComments({ lessonId }).subscribe({
      next: (response) => (this.comments = response.comments),
      error: (err) => console.error('Ошибка загрузки комментариев:', err),
    });
  }

  loadTasks(lessonId: string): void {
    this.taskService.getLessonTasks({ lessonId }).subscribe({
      next: (response) => {
        this.tasks = response.lessonTask;
        this.isLoading = false;
      },
      error: (err) => this.handleError('Ошибка загрузки заданий', err),
    });
  }

  handleError(message: string, error: any): void {
    this.errorMessage = message;
    this.isLoading = false;
    NotificationService.error(message)
    console.error(message, error);
  }

  changeTab(tab: 'info' | 'tasks' | 'comments'): void {
    this.activeTab = tab;
  }
}
