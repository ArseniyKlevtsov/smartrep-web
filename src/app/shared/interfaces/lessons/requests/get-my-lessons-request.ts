export interface GetMyLessonsRequest {
  userId: string; 
  startDate: string;
  endDate: string;
  asTeacher: boolean;
}