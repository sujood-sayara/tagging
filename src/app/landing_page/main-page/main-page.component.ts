import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  deleteImageAction,
  LoadImageAction,
  updateImageAction,
} from 'src/actions/image.action';
import { imageState } from 'src/app/reducers/image.reducer';
import { tagState } from 'src/app/reducers/tag.reducer';
import 'lodash';
import * as _ from 'lodash';
import { AddImageDialog } from '../../dialogs/addImage/add-image-dialog.component';
import { Tag } from 'src/models/tag';
import { LoadTagAction } from 'src/actions/tag.action';
import { UpdateImageDialog } from '../../dialogs/updateImage/update-image-dialog.component';
import { Image } from 'src/models/image';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialog } from 'src/app/shared/header/confirmation-dialog.component';
import { map, mergeMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { observable, of } from 'rxjs';
import { combineLatest } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';
import { CommentDialogComponent } from 'src/app/dialogs/comment-dialog/comment-dialog.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, OnDestroy {

  dataSource: any[];
  originalData: any[];
  numberOfPages;
  page = 0;
  tags$;
  imageTags = [];
  selectdTagValue;
  originalTags;
  originalImages: any;
  cardSubcription: any;
  constructor(
    public dialog: MatDialog,
    private imageStore: Store<imageState>,
    private tagStore: Store<tagState>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.cardSubcription = combineLatest([
      this.imageStore.select((store: any) => store.image.images),
      this.tagStore.select((store: any) => store.tag.tags),
    ])
      .pipe(
        mergeMap(([images, tags]) => {
          if (tags === undefined) {
            this.tagStore.dispatch(new LoadTagAction());
          }
          if (images === undefined) {
            this.imageStore.dispatch(new LoadImageAction());
          }
          else if (images !== undefined && tags !== undefined) {
            this.originalTags = tags;
            this.originalImages = images;

            this.imageTags = images?.map((image: Image) => ({
              id: image.id,
              name: image.name,
              imageUrl: image.imageUrl,
              tags: tags?.filter((tag: Tag) =>
                image?.tagIds?.find((id) => id === tag._id)
              ),
            }));
          }
          return of(this.imageTags);
        })
      )
      .subscribe((data: any[]) => {

        if (data !== undefined) {
          this.dataSource = data;
          this.originalData = data;
          this.numberOfPages = Math.ceil(this.dataSource.length / 6);
          this.slide(0);
        }
      });



  }

  openAddDialog() {
    this.dialog.open(AddImageDialog, {
      data: {
        tags: this.originalTags,
      }
    });
  }
  ngOnDestroy(): void {
    this.cardSubcription.unsubscribe();
  }


  updateImageDialog(image: Image) {
    this.dialog.open(UpdateImageDialog, {
      data: {
        image,
      },
    });
  }
  deleteImage(image) {
    this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Are you sure want to delete image?',
        calledBy: 'image.component',
        elementId: image.id,
        buttonText: {
          ok: 'Save',
          cancel: 'No',
        },
      },
    });
  }
  slide(index) {
    this.dataSource = this.originalData.slice(index * 6, index * 6 + 6);
  }
  nextPage() {
    if (this.page < this.numberOfPages - 1) this.page++;
    else this.page = 0;
    this.slide(this.page);
  }
  prevPage() {
    if (this.page > 0) this.page--;
    else this.page = this.numberOfPages - 1;
    this.slide(this.page);
  }
  selectedTag(event) {
    this.selectdTagValue = event;
  }
  addTag(imageIndex) {
    if (
      this.selectdTagValue !== undefined &&
      !this.originalData[imageIndex].tags.find(
        (tag) => tag._id === this.selectdTagValue._id
      )
    ) {
      const updatedTagIds: string[] = Object.values(
        this.originalImages[imageIndex].tagIds
      );
      updatedTagIds.unshift(this.selectdTagValue._id);
      const updatedimage: Image = {
        name: this.originalData[imageIndex].name,
        id: this.originalData[imageIndex].id,
        tagIds: updatedTagIds,
        imageUrl: this.originalData[imageIndex].imageUrl,
      };
      this.imageStore.dispatch(new updateImageAction(updatedimage));
      this.snackBar.open('Tag added successfully', 'x', {
        duration: 2000,
      });
    }
    if (
      this.selectdTagValue !== undefined &&
      this.originalData[imageIndex].tags.find(
        (tag) => tag._id === this.selectdTagValue._id
      )
    ) {
      this.snackBar.open('Tag already exists', 'x', {
        duration: 2000,
      });
    }
  }
  openComments(image) {
    this.dialog.open(CommentDialogComponent, {
      data: {
        image,
      },
    });
  }
}
