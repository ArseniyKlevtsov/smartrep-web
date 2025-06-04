import { Component, Input, OnInit } from '@angular/core';
import { LessonPreviewResponse } from '../../interfaces/lessons/responses/lesson-preview-response';
import moment from 'moment';
import { LessonCardComponent } from "../lesson-card/lesson-card.component";
import { NgFor } from '@angular/common';
import { GetMyLessonsRequest } from '../../interfaces/lessons/requests/get-my-lessons-request';
import { UserStorageService } from '../../services/user-storage.service';
import { LessonService } from '../../services/lesson.service';

@Component({
  selector: 'app-schedule',
  imports: [LessonCardComponent, NgFor],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent implements OnInit {
  @Input() asTeacher: boolean = false;
  @Input() cardBackgroundColor: string = '#f8f9fa';

  currentWeekStart: moment.Moment;
  days: moment.Moment[] = [];
  daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  lessons: LessonPreviewResponse[] = [];
  isLoading = false;

  constructor(private lessonService: LessonService) {
    this.currentWeekStart = moment().startOf('isoWeek');
  }

  ngOnInit(): void {
    this.generateWeekDays();
    this.loadLessons();
  }

  generateWeekDays(): void {
    this.days = [];
    for (let i = 0; i < 7; i++) {
      this.days.push(moment(this.currentWeekStart).add(i, 'days'));
    }
  }

  loadLessons(): void {
    this.isLoading = true;
    const userId = UserStorageService.getUserId();
    const startDate = this.currentWeekStart.format();
    const endDate = this.currentWeekStart.clone().endOf('isoWeek').format();

    const request: GetMyLessonsRequest = {
      userId: userId,
      startDate: startDate,
      endDate: endDate,
      asTeacher: this.asTeacher
    };

    this.lessonService.GetLessons(request).subscribe({
      next: (response) => {
        this.lessons = response.lessons;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  prevWeek(): void {
    this.currentWeekStart.subtract(1, 'week');
    this.generateWeekDays();
    this.loadLessons();
  }

  nextWeek(): void {
    this.currentWeekStart.add(1, 'week');
    this.generateWeekDays();
    this.loadLessons();
  }

  getLessonsForDay(day: moment.Moment): LessonPreviewResponse[] {
    return this.lessons
      .filter((lesson) => moment(lesson.startTime).isSame(day, 'day'))
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
  }

  formatDateHeader(date: moment.Moment): string {
    return date.format('D MMM');
  }
}