export interface CreateLessonRequest {
  name: string;
  description: string;
  price: number;
  startTime: Date;
  durationMinutes: number;
  paymentStatus: boolean;
  status: string;
}

export interface UpdateLessonRequest extends Partial<CreateLessonRequest> {}