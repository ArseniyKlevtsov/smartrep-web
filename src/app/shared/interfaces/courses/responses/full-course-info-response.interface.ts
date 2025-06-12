import { ShortcutUserProfileResponse } from "../../user/responses/shortcut-user-profile-response.interface";

export interface FullCourseResponse {
  courseId: string;
  courseName: string;
  courseDescription: string;
  courseAvatarUrl: string;
  price: number;
  teacherName: string;
  teacherId: string;
  teacherAvatarUrl: string;
  students: ShortcutUserProfileResponse[];
}