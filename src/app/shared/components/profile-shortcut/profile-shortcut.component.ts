import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInfoRequest } from '../../interfaces/user/requests/user-info-request.interface';
import { UserStorageService } from '../../services/user-storage.service';
import { NgIf } from '@angular/common';
import { ShortcutUserProfileResponse } from '../../interfaces/user/responses/shortcut-user-profile-response.interface';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-profile-shortcut',
  imports: [NgIf],
  templateUrl: './profile-shortcut.component.html',
  styleUrl: './profile-shortcut.component.css',
})
export class ProfileShortcutComponent implements OnInit {
  profile: ShortcutUserProfileResponse | null = null;

  constructor(private userService: UserService,public imageService: ImageService) {}

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
        console.log(response.avatarUrl);
        console.log(response.username);
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
      }
    });
  }
}
