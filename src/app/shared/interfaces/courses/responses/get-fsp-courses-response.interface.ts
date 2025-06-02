import { CoursePreviewResponse } from "./course-preview-response.interface";

export interface GetFSPCoursesResponse {
    courses: CoursePreviewResponse[];
    totalCount: number;
}