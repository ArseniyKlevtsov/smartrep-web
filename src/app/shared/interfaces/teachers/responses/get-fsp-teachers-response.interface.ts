import { TeacherPreviewResponse } from "./teacher-preview-response.interface";

export interface GetFSPTeachersResponse {
    teachers: TeacherPreviewResponse[]; 
    totalCount: number; 
}