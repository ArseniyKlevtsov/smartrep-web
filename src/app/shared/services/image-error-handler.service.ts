import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImeageErrorHandelrService {

  public handleAvatarImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'avatar-default.png';
  }
  
  public handleCourseImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'default-course.png';
  }
}
