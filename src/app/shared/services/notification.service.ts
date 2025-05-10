import { Injectable } from '@angular/core';
import { Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private static toastInstance: Toast | null = null;

  constructor() {
    NotificationService.initialize();
  }

  private static initialize(): void {
    const toastElement = document.getElementById('bootstrapToast');
    if (toastElement) {
      NotificationService.toastInstance = new Toast(toastElement);
    }
  }

  public static show(
    message: string,
    options: {
      header?: string;
      delay?: number;
      type?: 'success' | 'error' | 'info' | 'warning';
    } = {}
  ): void {
    if (!NotificationService.toastInstance) {
      console.error('Toast not initialized');
      return;
    }

    const toastElement = document.getElementById('bootstrapToast');
    if (!toastElement) return;

    // Установка текста
    const toastBody = toastElement.querySelector('.toast-body');
    if (toastBody) toastBody.textContent = message;

    // Установка заголовка
    const toastHeader = toastElement.querySelector('.toast-header strong');
    if (toastHeader && options.header) {
      toastHeader.textContent = options.header;
    }

    // Установка цвета
    toastElement.classList.remove(
      'bg-success',
      'bg-danger',
      'bg-info',
      'bg-warning'
    );
    if (options.type) {
      toastElement.classList.add(`bg-${options.type}`);
    }

    // Установка времени показа
    toastElement.setAttribute(
      'data-bs-delay',
      options.delay?.toString() || '5000'
    );

    // Показ toast
    NotificationService.toastInstance.show();
  }

  public static success(message: string, header?: string): void {
    NotificationService.show(message, { header, type: 'success' });
  }

  public static error(message: string, header?: string): void {
    NotificationService.show(message, { header, type: 'error' });
  }

  public static info(message: string, header?: string): void {
    NotificationService.show(message, { header, type: 'info' });
  }

  public static warning(message: string, header?: string): void {
    NotificationService.show(message, { header, type: 'warning' });
  }
}
