import { Component, Input } from '@angular/core';
import { CommentResponse } from '../../interfaces/comments/responses/comment-response';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [NgIf],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!: CommentResponse;
}
