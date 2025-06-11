import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInfoRequest } from '../../interfaces/user/requests/user-info-request.interface';
import { UserStorageService } from '../../services/user-storage.service';
import { NgIf } from '@angular/common';
import { ShortcutUserProfileResponse } from '../../interfaces/user/responses/shortcut-user-profile-response.interface';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-shortcut',
  imports: [NgIf],
  templateUrl: './profile-shortcut.component.html',
  styleUrl: './profile-shortcut.component.css',
})
export class ProfileShortcutComponent implements OnInit {
  profile: ShortcutUserProfileResponse | null = null;

  constructor(private router: Router,private userService: UserService,public imageService: ImageService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    const userId = UserStorageService.getUserId();
    
    if (!userId) {
      console.error('User ID not found in storage');
      return;
    }

    const request: UserInfoRequest = { userId: userId };

    this.userService.getShortcutUserProfile(request).subscribe({
      next: (response) => {
        this.profile = response;
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
      }
    });
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'avatar-default.png';
  }

  toProfile() {
    this.router.navigate(['/profile']);
  }
} 
