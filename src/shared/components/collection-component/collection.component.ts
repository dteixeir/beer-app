import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICollectionService } from '../../interfaces/collection-service.interface';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: [ './collection.component.scss' ]
})
export class CollectionComponent<T> implements OnInit {
  @Input() items$: Observable<T[]>;
  @Input() service: ICollectionService;
  @Input() collectionName: string;
  @Input() route: string;

  _filter: Subject<string> = new Subject();
  filter$: Observable<string> = this._filter;
  filterValue: string = '';
  isLoaded: boolean = false;

  ngOnInit(): void {
    this.filter$.subscribe((value) => {
      this.service.filter(value);
    });

    const filterValue = this.service.getFilterValue();
    if (filterValue) {
      this.filterValue = filterValue;
      this._filter.next(filterValue);
    }
  }

  nextPage() {
    this.service.pageNext();
  }

  previousPage() {
    this.service.pagePrevious();
  }

  hasPreviousPage() {
    return this.service.hasPreviousPage();
  }

  select(item: T) {
    this.service.setSelected(item, this.route);
  }
}
