import { Component, Input } from '@angular/core';
import { CommentResponse } from '../../interfaces/comments/responses/comment-response';
import { NgFor, NgIf } from '@angular/common';
import { CommentComponent } from "../comment/comment.component";

@Component({
  selector: 'app-comment-list',
  imports: [NgFor, NgIf, CommentComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent {
  @Input() comments: CommentResponse[] = [];
}
