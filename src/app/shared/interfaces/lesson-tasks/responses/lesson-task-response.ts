export interface LessonTaskResponse {
    id: string;
    name: string;
    description: string;
    fileUrl: string;
    isSolved: boolean;
    grade: number;
}