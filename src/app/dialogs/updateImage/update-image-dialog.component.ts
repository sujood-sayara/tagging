import { Component, Inject, OnInit } from '@angular/core';
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
  templateUrl: 'update-image-dialog.component.html',
  styleUrls: ['./update-image-dialog.component.css'],
})
export class UpdateImageDialog implements OnInit {
  imageTags = new FormControl();
  imageName = new FormControl();
  tags: Tag[];

  constructor(
    public dialogRef: MatDialogRef<UpdateImageDialog>,
    private store: Store<tagState>,
    private imageStore: Store<imageState>,
    @Inject(MAT_DIALOG_DATA) public imageinfo: any
  ) {}
  ngOnInit(): void {
    this.store
      .select((store: any) => store.tag.tags)
      .subscribe((data) => (this.tags = data));
  }

  UpdateImage(id, imageurl) {
    let tagsIDs;
    if (this.imageTags.value === null) 
    tagsIDs = [];
    else tagsIDs = this.imageTags.value;
    const image: Image = {
      name: this.imageName.value ,
      id: id,
      tagIds: tagsIDs,
      imageUrl: imageurl,
    };
    this.imageStore.dispatch(new updateImageAction(image));
    this.dialogRef.close();
  }
}
