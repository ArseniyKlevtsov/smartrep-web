export interface LessonPreviewResponse { 
  lessonId: string;
  lessonName: string;
  price: number;
  durationMinutes: number;
  startTime: string; 
  paymentStatus: boolean;
  status?: string; 

  courseName: string;
  courseAvatar: string;
}