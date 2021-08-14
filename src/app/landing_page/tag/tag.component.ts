import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TagsService } from 'src/app/services/tags.service';
import { tag } from 'src/models/tag';
import { Store } from '@ngrx/store';
import { tagState } from 'src/app/reducers/tag.reducer';
import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  addTagAction,
  deleteTagAction,
  LoadTagAction,
} from 'src/actions/tag.action';
@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent implements OnInit, OnDestroy,AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['tagname', 'tagcolor', 'delete'];
  dataSource =new MatTableDataSource<tag>([])
  tagSubcription: any;
  
  constructor(
    private tagservice: TagsService,
    public dialog: MatDialog,
    private store: Store<tagState>
  ) {}
  tagstore;
  ngOnDestroy(): void {
    this.tagSubcription.unsubscribe();
  }

  ngOnInit(): void {
    this.tagstore = this.store.select((store: any) => store.tag.loaded);
    this.tagSubcription = this.tagstore.subscribe((data) => {
      if (!data) {
        this.store.dispatch(new LoadTagAction());
      }
    });

    this.store
      .select((store: any) => store.tag.tags)
      .subscribe((data) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  openDialog() {
    this.dialog.open(AddDialog);
  }
  onDelete(id) {
    this.store.dispatch(new deleteTagAction(id));
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

@Component({
  selector: 'dialog-add',
  templateUrl: 'dialog-add.html',
  styleUrls: ['./dialog.add.css'],
})
export class AddDialog {
  newTag = new FormGroup({
    tagName: new FormControl(''),
    tagColor: new FormControl(''),
  });
  data: tag;
  constructor(
    private tagservice: TagsService,
    private store: Store<tagState>
  ) {}

  addTag() {
    this.store.dispatch(new addTagAction(this.newTag.value));
  }
}
