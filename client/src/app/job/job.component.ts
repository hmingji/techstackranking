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
  combineLatest,
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
    private elementRef: ElementRef<HTMLDivElement>,
    private jobService: JobService
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
    //add in the smallscreen subject
    this.resizeSub = combineLatest([
      fromEvent(window, 'resize'),
      this.showList$,
    ])
      .pipe(
        filter(([w, showList]) => {
          const transitionToSmallScreen =
            window.innerWidth < 900 &&
            this.route.snapshot.queryParamMap.has('jd') &&
            showList === true;
          const transitionToBigScreen =
            window.innerWidth > 900 && showList === false;
          return transitionToSmallScreen || transitionToBigScreen;
        })
      )
      .subscribe(() => {
        if (
          window.innerWidth < 900 &&
          this.route.snapshot.queryParamMap.has('jd')
        ) {
          //this.showList = false;
          this.jobService.changeShowList(false);
        } else {
          //this.showList = true;
          this.jobService.changeShowList(true);
          this.setDetailHeight();
        }
      });
  }
  showList: Boolean = true;
  showList$ = this.jobService.showListAction$;
  hasJobDetail$ = this.route.queryParamMap.pipe(map((p) => p.has('jd')));
  resizeDetailSub!: Subscription;
  showListSub!: Subscription;
  resizeSub!: Subscription;

  ngAfterViewInit(): void {
    this.setInitDetailHeight();
    if (
      window.innerWidth < 900 &&
      this.route.snapshot.queryParamMap.has('jd')
    ) {
      //this.showList = false;
      this.jobService.changeShowList(false);
    } else {
      //this.showList = true;
      this.jobService.changeShowList(true);
    }
    this.showListSub = this.showList$.subscribe((s) => {
      this.showList = s;
    });
  }

  ngOnDestroy(): void {
    this.resizeDetailSub.unsubscribe();
    this.showListSub.unsubscribe();
    this.resizeSub.unsubscribe();
  }

  private setInitDetailHeight() {
    const wh = window.innerHeight;
    this.jobService.changeDetailHeight(wh - 191);
  }

  private setDetailHeight() {
    const r = this.elementRef.nativeElement.getBoundingClientRect();
    const wh = window.innerHeight;
    let res =
      r.bottom - 100 < wh
        ? r.bottom - 100 - 16 - (r.top > 0 ? r.top : 0)
        : wh - (r.top > 0 ? r.top : 0) - 32;
    console.log(res, r.bottom, wh, r.top, r);
    this.jobService.changeDetailHeight(res);
  }
}
