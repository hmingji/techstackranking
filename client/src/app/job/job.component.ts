import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subscription,
  debounceTime,
  filter,
  fromEvent,
  map,
  switchMap,
  tap,
  throttleTime,
} from 'rxjs';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnDestroy, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLDivElement>
  ) {
    this.resizeDetailSub = fromEvent(window, 'scroll')
      //.pipe(throttleTime(100))
      .pipe(
        filter(() => {
          return window.innerWidth > 900;
        })
      )
      .subscribe(() => {
        console.log('resizing height');
        this.setDetailHeight();
      });
    this.showListSub = fromEvent(window, 'resize')
      .pipe(
        filter(() => {
          const transitionToSmallScreen =
            window.innerWidth < 900 &&
            this.route.snapshot.queryParamMap.has('jd') &&
            this.showList === true;
          const transitionToBigScreen =
            window.innerWidth > 900 && this.showList === false;
          return transitionToSmallScreen || transitionToBigScreen;
        })
      )
      .subscribe(() => {
        if (
          window.innerWidth < 900 &&
          this.route.snapshot.queryParamMap.has('jd')
        ) {
          this.showList = false;
        } else {
          this.showList = true;
          this.setDetailHeight();
        }
      });
  }
  @ViewChild('detail', { static: false }) detail!: ElementRef<HTMLElement>;
  showList = true;
  hasJobDetail$ = this.route.queryParamMap.pipe(map((p) => p.has('jd')));
  resizeDetailSub!: Subscription;
  showListSub!: Subscription;

  ngAfterViewInit(): void {
    this.setDetailHeight();
  }

  ngOnDestroy(): void {
    this.resizeDetailSub.unsubscribe();
    this.showListSub.unsubscribe();
  }

  private setDetailHeight() {
    const r = this.elementRef.nativeElement.getBoundingClientRect();
    const wh = window.innerHeight;
    let res =
      r.bottom - 100 < wh
        ? `${r.bottom - 100 - 16 - (r.top > 0 ? r.top : 0)}px`
        : `${wh - (r.top > 0 ? r.top : 0) - 32}px`;
    console.log(res, r.bottom, wh, r.top);
    this.renderer.setStyle(this.detail.nativeElement, 'height', res);
  }
}
