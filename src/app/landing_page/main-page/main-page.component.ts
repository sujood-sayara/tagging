import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { deleteImageAction, LoadImageAction } from 'src/actions/image.action';
import { imageState } from 'src/app/reducers/image.reducer';
import { tagState } from 'src/app/reducers/tag.reducer';
import { ImagesService } from 'src/app/services/images.service';
import 'lodash';
import * as _ from 'lodash';
import { AddImageDialog } from './addImageDialog';
import { Tag } from 'src/models/tag';
import { LoadTagAction } from 'src/actions/tag.action';
import { UpdateTagDialog } from './updateImageDialog';
import { Image } from 'src/models/image';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialog } from 'src/app/shared/header/confirmation-dialog.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  datasource: Image[];
  originalDate: [];
  numberOfPages;
  tagsDetailes: any;
  tags: Tag[];
  page = 0;
  constructor(
    public dialog: MatDialog,
    private imageStore: Store<imageState>,
    private tagStore: Store<tagState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tagStore
      .select((store: any) => store.tag.loaded)
      .subscribe((data) => {
        if (!data) {
          this.tagStore.dispatch(new LoadTagAction());
        }
      });
    const loadImage = this.imageStore.select(
      (store: any) => store.image.loaded
    );
    loadImage.subscribe((data) => {
      if (!data) {
        this.imageStore.dispatch(new LoadImageAction());
      }
    });

    this.imageStore
      .select((store: any) => store.image.images)
      .subscribe((data) => {
        this.datasource = data;
        this.originalDate = data;
        if (this.originalDate !== undefined) {
          this.numberOfPages = Math.ceil(this.datasource.length / 6);
          this.slide(0);
        }
      });

    this.tagStore
      .select((store: any) => store.tag.tags)
      .subscribe((data) => {
        this.tags = data;
      });
  }

  openAddDialog() {
    this.dialog.open(AddImageDialog);
  }

  getImageTags(image) {
    const imageTags = [];
    if (image.tagIds !== null) {
      image.tagIds.forEach((element) => {
        imageTags.unshift(this.tags.filter((input) => input._id === element));
      });
    }
    return imageTags;
  }
  updateImageDialog(image: Image) {
    this.dialog.open(UpdateTagDialog, {
      data: {
        image,
      },
    });
  }
  deleteImage(image) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Are you sure want to delete?',
        calledBy: 'image.component',
        elementId: image.id,
        buttonText: {
          ok: 'Save',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.snackBar.open('Delete done Successfully', 'x', {
          duration: 2000,
        });
      }
    });
  }
  slide(index) {
    this.datasource = this.originalDate.slice(index * 6, index * 6 + 6);
  }
  nextPage() {
    if (this.page < this.numberOfPages - 1) this.page++;
    else this.page = 0;
    this.slide(this.page);
  }
  prePage() {
    if (this.page > 0) this.page--;
    else this.page = this.numberOfPages - 1;
    this.slide(this.page);
  }
}
