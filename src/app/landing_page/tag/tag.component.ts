import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TagsService } from 'src/app/services/tags.service';
import { Tag } from 'src/models/tag';
import { Store } from '@ngrx/store';
import { tagState } from 'src/app/reducers/tag.reducer';
import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { addTagAction, LoadTagAction } from 'src/actions/tag.action';
import { updateDialog } from '../../dialogs/updateTag/update-tag-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialog } from 'src/app/shared/header/confirmation-dialog.component';
import { AddDialog } from 'src/app/dialogs/addTag/add-tag-dialog.component';
@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['tagName', 'tagColor', 'delete', 'edit'];
  dataSource = new MatTableDataSource<Tag>([]);
  tagSubcription: any;
  tagStore;
  constructor(public dialog: MatDialog, private store: Store<tagState>) {}

  ngOnInit(): void {
    this.tagStore = this.store.select((store: any) => store.tag.loaded);
    this.tagSubcription = this.tagStore.subscribe((data) => {
      if (!data) {
        this.store.dispatch(new LoadTagAction());
      }
    });

    this.store
      .select((store: any) => store.tag.tags)
      .subscribe((data) => {
        if (data !== undefined) {
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.tagSubcription.unsubscribe();
  }

  openDialog() {
    this.dialog.open(AddDialog);
  }

  onDelete(id) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Are you sure want to delete?',
        calledBy: 'tag.component',
        elementId: id,
        buttonText: {
          ok: 'Save',
          cancel: 'No',
        },
      },
    });
  }

  onUpdate(tag) {
    this.dialog.open(updateDialog, {
      data: {
        tag,
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
