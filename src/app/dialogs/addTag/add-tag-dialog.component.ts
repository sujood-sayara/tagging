import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addTagAction } from 'src/actions/tag.action';
import { tagState } from 'src/app/reducers/tag.reducer';

@Component({
  selector: 'dialog-add',
  templateUrl: 'add-tag-dialog.component.html',
  styleUrls: ['./add-tag-dialog.component.css'],
})
export class AddDialog {
  newTag = this.fb.group({
    tagName: '',
    tagColor: '#000000',
  });
  constructor(
    public dialogRef: MatDialogRef<AddDialog>,
    private tagStore: Store<tagState>,
    public fb: FormBuilder
  ) {}

  addTag() {
    this.tagStore.dispatch(new addTagAction(this.newTag.value));
    this.dialogRef.close();
  }
}
