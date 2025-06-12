import { Component, OnInit } from '@angular/core';
import { UserProfileResponse } from '../../shared/interfaces/user/responses/user-profile-response.interface';
import { UserService } from '../../shared/services/user.service';
import { UserInfoRequest } from '../../shared/interfaces/user/requests/user-info-request.interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { MyCoursesComponent } from '../../shared/components/my-courses/my-courses.component';

@Component({
  selector: 'app-profile-page',
  imports: [NgIf, FormsModule, DatePipe, MyCoursesComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  user!: UserProfileResponse;
  isEditing = false;
  editData!: Partial<UserProfileResponse>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const request: UserInfoRequest = { userId: UserStorageService.getUserId() };

    this.userService.getUserProfile(request).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (err) => console.error('Ошибка загрузки профиля', err),
    });
  }

  startEditing(): void {
    this.editData = { ...this.user };
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.isEditing = false;
  }

  saveChanges(): void {
    console.log('Данные для сохранения:', this.editData);
    this.isEditing = false;
    // Здесь будет вызов API для сохранения
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'avatar-default.png';
  }

  onAddCourse(): void {
    // Навигация на создание курса
  }
}
