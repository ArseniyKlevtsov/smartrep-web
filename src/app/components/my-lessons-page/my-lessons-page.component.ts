import { Component, OnInit } from '@angular/core';
import { GetMyLessonsRequest } from '../../shared/interfaces/lessons/requests/get-my-lessons-request';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { LessonService } from '../../shared/services/lesson.service';
import moment from 'moment';
import { ScheduleComponent } from "../../shared/components/schedule/schedule.component";

@Component({
  selector: 'app-my-lessons-page',
  imports: [ScheduleComponent],
  templateUrl: './my-lessons-page.component.html',
  styleUrl: './my-lessons-page.component.css'
})
export class MyLessonsPageComponent implements OnInit {
  teacherLessons: any[] = [];
  studentLessons: any[] = [];
  isLoading = false;
  currentDate = moment();
  
  constructor(
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    this.loadLessons();
  }

  loadLessons(): void {
    this.isLoading = true;
    const userId = UserStorageService.getUserId();
    const startDate = this.currentDate.startOf('isoWeek').format();
    const endDate = this.currentDate.endOf('isoWeek').format();

    // Загрузка занятий как учитель
    const teacherRequest: GetMyLessonsRequest = {
      userId: userId,
      startDate: startDate,
      endDate: endDate,
      asTeacher: true
    };

    // Загрузка занятий как студент
    const studentRequest: GetMyLessonsRequest = {
      userId: userId,
      startDate: startDate,
      endDate: endDate,
      asTeacher: false
    };

    this.lessonService.GetLessons(teacherRequest).subscribe({
      next: (teacherResponse) => {
        this.teacherLessons = teacherResponse.lessons;
        
        this.lessonService.GetLessons(studentRequest).subscribe({
          next: (studentResponse) => {
            this.studentLessons = studentResponse.lessons;
            this.isLoading = false;
          },
          error: () => this.isLoading = false
        });
      },
      error: () => this.isLoading = false
    });
  }

  changeWeek(weeks: number): void {
    this.currentDate.add(weeks, 'weeks');
    this.loadLessons();
  }
}