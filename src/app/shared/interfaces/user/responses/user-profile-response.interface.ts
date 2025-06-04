export interface UserProfileResponse {
    userId: string; 
    userName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    avatarUrl: string;
    createdAt: string;
    studentDescription: string;
    teacherStatusConfirmed: boolean;
    teacherDescription: string;
}