import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  private _totalPages = 1;
  private _currentPage = 1;
  interval = 5;
  lb = Math.max(1, this._currentPage - 2);
  ub = Math.min(this.lb + this.interval, this._totalPages + 1);
  pageNums = _.range(this.lb, Math.min(this.ub, this._totalPages + 1));
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  disabledPrev = false;
  disabledNext = false;

  @Input()
  get totalPages(): number {
    return this._totalPages;
  }
  set totalPages(totalPages: number) {
    this._totalPages = totalPages;
  }

  @Input()
  get currentPage(): number {
    return this._currentPage;
  }
  set currentPage(currentPage: number) {
    this._currentPage = currentPage;
    this.lb = Math.max(1, this.currentPage - 2);
    this.ub = Math.min(this.lb + this.interval, this._totalPages + 1);
    this.pageNums = _.range(this.lb, this.ub);
    this.disabledPrev = this._currentPage === 1 ? true : false;
    this.disabledNext = this._currentPage === this._totalPages ? true : false;
  }

  @Output() pageChange = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    this.lb = Math.max(1, this.currentPage - 2);
    this.ub = Math.min(this.lb + this.interval, this._totalPages + 1);
    this.pageNums = _.range(this.lb, this.ub);
    this.disabledPrev = this._currentPage === 1 ? true : false;
    this.disabledNext = this._currentPage === this._totalPages ? true : false;
  }

  incrementPage() {
    this.pageChange.emit(this._currentPage + 1);
  }

  decrementPage() {
    if (this._currentPage - 1 > 0) {
      this.pageChange.emit(this._currentPage - 1);
    }
  }

  setPage(pageNum: number) {
    this.pageChange.emit(pageNum);
  }
}
