import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Tag } from 'src/models/tag';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, OnChanges {
  @Input() tags$;
  @Output() selectedTag = new EventEmitter();
  originalTags: Tag[] = [];
  numberOfPages;
  page = 0;
  selectedTagName: any;
  isSelected = false;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.tags$.subscribe((data) => {
      this.originalTags = data;
      if (this.originalTags !== undefined) {
        this.numberOfPages = Math.ceil(this.originalTags.length / 5);
        this.slide(0);
      }
    });
    this.selectedTagName = null;
  }

  ngOnInit(): void {}
  selectdTagValue(tag) {
    this.selectedTagName = tag.tagName;
    this.selectedTag.emit(tag);
  }
  clear() {
    this.selectedTagName = null;
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
  calculateClasses(tag) {
    if (tag.tagName === this.selectedTagName) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }

    return {
      selectedSpan: this.isSelected,
    };
  }
}
