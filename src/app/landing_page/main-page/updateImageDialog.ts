import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AddImageAction, updateImageAction } from 'src/actions/image.action';
import { imageState } from 'src/app/reducers/image.reducer';
import { tagState } from 'src/app/reducers/tag.reducer';
import { Image } from 'src/models/image';
import { Tag } from 'src/models/tag';

@Component({
  selector: 'dialog-update_image',
  templateUrl: 'update-image-dialog.html',
  styleUrls: ['./update.image.dialog.css'],
})
export class UpdateTagDialog {
  imageTags = new FormControl();
  imageName = new FormControl();
  tags: Tag[];

  tagStore = this.store
    .select((store: any) => store.tag.tags)
    .subscribe((data) => (this.tags = data));

  constructor(
    public dialogRef: MatDialogRef<UpdateTagDialog>,
    private store: Store<tagState>,
    private imageStore: Store<imageState>,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public imageinfo: any
  ) {}

  UpdateImage(id, imageurl) {
    const image: Image = {
      name: this.imageName.value,
      id: id,
      tagIds: this.imageTags.value,
      imageUrl: imageurl,
    };
    this.imageStore.dispatch(new updateImageAction(image));
    this.dialogRef.close();
  }
}
