import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { deleteImageAction } from 'src/actions/image.action';
import { deleteTagAction } from 'src/actions/tag.action';
import { tagState } from 'src/app/reducers/tag.reducer';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialog {
  message: string = 'Are you sure?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialog>,
    private tagStore: Store<tagState>
  ) {
    if (this.data) {
      this.message = this.data.message || this.message;
      if (this.data.buttonText) {
        this.confirmButtonText =
          this.data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText =
          this.data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    if (this.data.calledBy === 'tag.component') // use curly brackets for if statements
      this.tagStore.dispatch(new deleteTagAction(this.data.elementId));
    else if (this.data.calledBy === 'image.component')
      this.tagStore.dispatch(new deleteImageAction(this.data.elementId));
    this.dialogRef.close(true);
  }
}
