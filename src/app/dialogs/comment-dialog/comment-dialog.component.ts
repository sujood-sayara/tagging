import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { flatMap, map, mergeMap } from 'rxjs/operators';
import {
  addCommentAction,
  deleteCommentSuccessAction,
  LoadCommentAction,
  updateCommentSuccessAction,
} from 'src/actions/comment.action';
import { LoadCommentSuccessAction } from 'src/actions/image.action';
import { commentState } from 'src/app/reducers/comment.reducer';
import { imageState } from 'src/app/reducers/image.reducer';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/models/comment';
import { Image } from 'src/models/image';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css'],
})
export class CommentDialogComponent implements OnInit, OnDestroy {
  comment = new FormControl('');
  comments: { key: string; value: Comment[] };
  sub: Subscription;
  selectedCommentId: any;
  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    private commentStore: Store<commentState>,
    private commentservice: CommentsService,
    @Inject(MAT_DIALOG_DATA) public imageinfo: any
  ) { }
  ngOnInit(): void {
    this.sub = new Subscription();
    this.sub.add(
      this.commentStore
        .select((store: any) => store.comment.imageComments)
        .subscribe((comments) => {
          if (!comments?.find((comment) => comment.key === this.imageinfo.image.id)) {
            this.commentStore.dispatch(new LoadCommentAction(this.imageinfo.image.id));
          }
          this.comments = comments?.find((comment) => comment.key === this.imageinfo.image.id);
        })
    );

  }

  addComment() {
    if (this.comment.value) {
      let newComment = {
        imageId: this.imageinfo.image.id,
        userName: 'sujood',
        text: this.comment.value,
      };

      this.commentStore.dispatch(new addCommentAction(newComment));
    }
  }
  deleteComment(commentId: string) {
    this.commentservice.deleteComment(commentId).subscribe(() => {
      this.commentStore.dispatch(
        new deleteCommentSuccessAction(this.imageinfo.image.id, commentId)
      );
    });
  }
  updateComment(commentId: string, index) {
    document.getElementById(`edit-${index}`).contentEditable = 'false';
    const comment = {
      _id: commentId,
      userName: 'sujood',
      imageId: this.imageinfo.image.id,
      text: document.getElementById(`edit-${index}`).innerText,
    };
    this.commentservice.updateComment(comment).subscribe((response) => {
      this.commentStore.dispatch(
        new updateCommentSuccessAction(
          this.imageinfo.image.id,
          commentId,
          response.payload
        )
      );
    });
  }
  selectdComment(comment, index) {
    document.getElementById(`edit-${index}`).contentEditable = 'true';
    this.selectedCommentId = comment._id;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
