export interface GetLessonResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    startTime: Date;
    durationMinutes: number;
    paymentStatus: boolean;
    status: string;
}