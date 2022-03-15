import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Tag } from 'src/models/tag';
import { Store } from '@ngrx/store';
import { tagState } from 'src/app/reducers/tag.reducer';
import { FormControl } from '@angular/forms';
import { LoadTagAction } from 'src/actions/tag.action';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {

  @Output() selectedTag = new EventEmitter();
  filterInput = new FormControl('');
  dataSource = []
  originalTags: Tag[] = [];
  numberOfPages = 0;
  page = 0;
  selectedTagName: any;
  isSelected = false;
  constructor(private tagStore: Store<tagState>,) { }
  ngOnInit(): void {
    this.tagStore
      .select((store: any) => store.tag.tags)
      .subscribe((data) => {
        if (data === undefined) {
          this.tagStore.dispatch(new LoadTagAction());
        }
        else {
          this.originalTags = data;
          this.numberOfPages = Math.ceil(this.originalTags.length / 5);
          this.slide(0, this.originalTags);
        }
      });

    this.filterInput.valueChanges.subscribe((value) => {
      this.applyFilter(value);
    });
  }
  selectdTagValue(tag) {
    this.selectedTagName = tag.tagName;
    this.selectedTag.emit(tag);
  }
  clear() {
    this.selectedTagName = null;
    this.selectedTag.emit(undefined);
  }
  slide(index, originalTags) {
    this.dataSource = originalTags.slice(index * 5, index * 5 + 5)
  }
  nextPage() {
    if (this.page < this.numberOfPages - 1) this.page++;
    else this.page = 0;
    this.slide(this.page, this.originalTags);
  }
  prevPage() {
    if (this.page > 0) this.page--;
    else this.page = this.numberOfPages - 1;
    this.slide(this.page, this.originalTags);
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
  applyFilter(filterValue: string) {
    this.dataSource = this.originalTags.filter((tag) =>
      tag.tagName.toLowerCase().includes(filterValue.toLowerCase())
    )
    this.numberOfPages = Math.ceil(this.dataSource.length / 5);
    this.slide(0, this.dataSource)

  }
}
