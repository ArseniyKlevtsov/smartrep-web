import { Component, OnInit } from '@angular/core';
import { UserProfileResponse } from '../../shared/interfaces/user/responses/user-profile-response.interface';
import { UserService } from '../../shared/services/user.service';
import { UserInfoRequest } from '../../shared/interfaces/user/requests/user-info-request.interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { MyCoursesComponent } from '../../shared/components/my-courses/my-courses.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [NgIf, FormsModule, DatePipe, MyCoursesComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
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
    this.route.paramMap.subscribe(params => {
      this.profileUserId = params.get('id');
      this.isCurrentUserProfile = !this.profileUserId || 
                                 this.profileUserId === UserStorageService.getUserId();
      this.loadProfile();
    });
  }

  loadProfile(): void {
    const userId = this.profileUserId || UserStorageService.getUserId();
    const request: UserInfoRequest = { userId };

    this.userService.getUserProfile(request).subscribe({
      next: (response) => {
        this.user = response;
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
}