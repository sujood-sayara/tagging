import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AddImageAction, deleteImageAction } from 'src/actions/image.action';
import { imageState } from 'src/app/reducers/image.reducer';
import { tagState } from 'src/app/reducers/tag.reducer';
import { Tag } from 'src/models/tag';

@Component({
  selector: 'dialog-image',
  templateUrl: 'addImageDialog.html',
  styleUrls: ['./add.image.dialog.css'],
})
export class AddImageDialog {
  tags: Tag[];
  tagStore = this.store
    .select((store: any) => store.tag.tags)
    .subscribe((data) => (this.tags = data));
  constructor(
    public dialogRef: MatDialogRef<AddImageDialog>,
    public fb: FormBuilder,
    private store: Store<tagState>,
    private imagestore: Store<imageState>
  ) {}
  addForm = this.fb.group({
    name: '',
    tagIds: [],
    image: [null],
  });

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addForm.patchValue({
      image: file,
    });
    this.addForm.get('image').updateValueAndValidity();
  }

  submitForm() {
    if (this.addForm.controls.tagIds.value === null)
      this.addForm.controls.tagIds.setValue('[]');
    this.imagestore.dispatch(new AddImageAction(this.addForm.value));
    this.dialogRef.close();
  }
}
