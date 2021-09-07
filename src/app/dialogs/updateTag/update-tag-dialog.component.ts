import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { updateTagAction } from 'src/actions/tag.action';
import { tagState } from 'src/app/reducers/tag.reducer';

@Component({
  selector: 'dialog-update',
  templateUrl: 'update-tag-dialog.component.html',
  styleUrls: ['./update-tag-dialog.component.css'],
})
export class updateDialog {
  updatedTag = this.fb.group({
    tagName: this.taginfo.tag.tagName,
    tagColor: this.taginfo.tag.tagColor,
  });

  constructor(
    public dialogRef: MatDialogRef<updateDialog>,
    private tagStore: Store<tagState>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public taginfo: any
  ) {}

  updateTag() {
    const tag = {
      tagName: this.updatedTag.controls.tagName.value,
      _id: this.taginfo.tag._id,
      tagColor: this.updatedTag.controls.tagColor.value,
      date: this.taginfo.tag.date,
    };
    this.tagStore.dispatch(new updateTagAction(tag));
    this.dialogRef.close();
  }
}
