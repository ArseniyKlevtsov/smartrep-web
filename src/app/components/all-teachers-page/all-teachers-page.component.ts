import { Component, OnInit } from '@angular/core';
import { GetFSPTeachersRequest } from '../../shared/interfaces/teachers/requests/get-fsp-teachers-request.interface';
import { TeacherService } from '../../shared/services/teacher.service';
import { TeacherPreviewResponse } from '../../shared/interfaces/teachers/responses/teacher-preview-response.interface';
import { TeacherCardComponent } from "../../shared/components/teacher-card/teacher-card.component";
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-all-teachers-page',
  imports: [TeacherCardComponent, NgFor, NgIf, FormsModule],
  templateUrl: './all-teachers-page.component.html',
  styleUrl: './all-teachers-page.component.css'
})
export class AllTeachersPageComponent implements OnInit {
searchText = '';
  teachers: TeacherPreviewResponse[] = [];
  isLoading = false;
  isLoadingMore = false;
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.isLoading = true;
    const request: GetFSPTeachersRequest = {
      textFilter: this.searchText,
      startIndex: 0,
      pageSize: this.pageSize
    };

    this.teacherService.getShortcutUserProfile(request).subscribe({
      next: (response) => {
        this.teachers = response.teachers;
        this.totalCount = response.totalCount;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  loadMore(): void {
    this.isLoadingMore = true;
    this.currentPage++;
    
    const request: GetFSPTeachersRequest = {
      textFilter: this.searchText,
      startIndex: this.currentPage * this.pageSize,
      pageSize: this.pageSize
    };

    this.teacherService.getShortcutUserProfile(request).subscribe({
      next: (response) => {
        this.teachers = [...this.teachers, ...response.teachers];
        this.isLoadingMore = false;
      },
      error: () => this.isLoadingMore = false
    });
  }

  onSearch(): void {
    this.currentPage = 0;
    this.loadTeachers();
  }

  canLoadMore(): boolean {
    return !this.isLoading && this.teachers.length < this.totalCount;
  }

  truncateText(text: string, maxLength: number): string {
    return text?.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}
