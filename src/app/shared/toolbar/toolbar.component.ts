import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Tag } from 'src/models/tag';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  @Input() tags$;
  @Output() selectedTag = new EventEmitter();
  originalTags: Tag[] = [];
  numberOfPages;
  page = 0;
  selectedName: any; //selectedTagName over selectedName
  constructor() {}

  ngOnInit(): void {
    this.tags$.subscribe((data) => {
      this.originalTags = data;
      if (this.originalTags !== undefined) {
        this.numberOfPages = Math.ceil(this.originalTags.length / 5);
        this.slide(0);
      }
    });
    this.selectedName = null; 
  }
  selectdTagValue(tag) {
    this.selectedName = tag.tagName;
    this.selectedTag.emit(tag);
  }
  clear() {
    this.selectedName = null;
    this.selectedTag.emit(undefined);
  }
  slide(index) {
    this.tags$ = this.tags$.pipe(
      map(() => this.originalTags.slice(index * 5, index * 5 + 5))
    );
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
