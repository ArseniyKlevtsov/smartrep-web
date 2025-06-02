import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly apiUrl = 'https://localhost:7234'; // Базовый URL бэкенда

  getAvatarUrl(relativePath: string): string {
    if (!relativePath) return 'assets/default-avatar.png';
    
    // Убедимся, что путь начинается с /static-files
    const cleanPath = relativePath.startsWith('/static-files') 
      ? relativePath 
      : `/static-files/${relativePath}`;
      
    return `${this.apiUrl}${cleanPath}`;
  }
}