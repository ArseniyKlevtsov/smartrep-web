import { Component, OnInit } from '@angular/core';
import { UserProfileResponse } from '../../shared/interfaces/user/responses/user-profile-response.interface';
import { UserService } from '../../shared/services/user.service';
import { UserInfoRequest } from '../../shared/interfaces/user/requests/user-info-request.interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { MyCoursesComponent } from '../../shared/components/my-courses/my-courses.component';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [NgIf, FormsModule, DatePipe, MyCoursesComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  user!: UserProfileResponse;
  isEditing = false;
  editData!: Partial<UserProfileResponse>;
  isCurrentUserProfile = true;
  profileUserId: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.profileUserId = params.get('id');
      this.isCurrentUserProfile =
        !this.profileUserId ||
        this.profileUserId === UserStorageService.getUserId();
      this.loadProfile();
    });
  }

  loadProfile(): void {
    const userId = this.profileUserId || UserStorageService.getUserId();
    const request: UserInfoRequest = { userId };

    this.userService
      .getUserProfile(request)
      .pipe(
        switchMap((response) => {
          this.user = response;
          // Задержка на полсекунды перед дальнейшими действиями
          return timer(500); // 500 мс задержки
        })
      )
      .subscribe({
        next: () => {
          // Здесь можно добавить дополнительные действия после задержки
          console.log('Профиль загружен и задержка завершена');
        },
        error: (err) => console.error('Ошибка загрузки профиля', err),
      });
  }

  startEditing(): void {
    if (!this.isCurrentUserProfile) return;

    this.editData = { ...this.user };
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.isEditing = false;
  }

  saveChanges(): void {
    if (!this.isCurrentUserProfile) return;

    console.log('Данные для сохранения:', this.editData);
    this.isEditing = false;
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'avatar-default.png';
  }

  onAddCourse(): void {
    this.router.navigate(['/courses/new']);
  }

  isValidGuid(guid: string | null): boolean {
    const guidPattern =
      /^[{]?([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})[}]?$/;
    return guidPattern.test(guid || '');
  }
}
