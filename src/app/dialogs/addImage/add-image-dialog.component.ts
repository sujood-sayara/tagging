import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AddImageAction, deleteImageAction } from 'src/actions/image.action';
import { imageState } from 'src/app/reducers/image.reducer';
import { tagState } from 'src/app/reducers/tag.reducer';
import { Tag } from 'src/models/tag';

@Component({
  selector: 'dialog-image',
  templateUrl: 'add-image-dialog.component.html',
  styleUrls: ['./add-image-dialog.component.css'],
})
export class AddImageDialog {
  tags = this.tagsValues.tags;
  addForm = this.fb.group({
    name: '',
    tagIds: [],
    image: [null],
  });
  constructor(
    public dialogRef: MatDialogRef<AddImageDialog>,
    public fb: FormBuilder,
    private imagestore: Store<imageState>,
    @Inject(MAT_DIALOG_DATA) public tagsValues: any
  ) { }


  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addForm.patchValue({
      image: file,
    });
    this.addForm.get('image').updateValueAndValidity();
  }

  submitForm() {
    if (this.addForm.controls.tagIds.value === null) {
      this.addForm.controls.tagIds.setValue('[]');
    }
    this.imagestore.dispatch(new AddImageAction(this.addForm.value));
    this.dialogRef.close();
  }
}
