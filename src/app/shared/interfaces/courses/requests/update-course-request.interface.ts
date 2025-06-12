export interface UpdateCourseRequest {
  userId: string;    
  courseId: string;   
  studentNames: string[];
  name: string;
  description: string;
  price: number;
}