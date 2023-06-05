import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest, filter, fromEvent, map } from 'rxjs';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnDestroy, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
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

    this.screenSizeSub = combineLatest([
      fromEvent(window, 'resize'),
      this.jobService.smallScreenAction$,
    ])
      .pipe(
        filter(([w, smallScreen]) => {
          return (
            (window.innerWidth <= 900 && !smallScreen) ||
            (window.innerWidth > 900 && smallScreen)
          );
        })
      )
      .subscribe(() => {
        this.jobService.changeSmallScreen(window.innerWidth <= 900);
      });

    this.listDisplaySub = this.jobService.smallScreenAction$.subscribe(
      (smallScreen) => {
        if (smallScreen && this.route.snapshot.queryParamMap.has('jd')) {
          this.jobService.changeShowList(false);
        } else {
          this.jobService.changeShowList(true);
          this.setDetailHeight();
        }
      }
    );
  }

  hasJobDetail$ = this.route.queryParamMap.pipe(map((p) => p.has('jd')));
  resizeDetailSub!: Subscription;
  screenSizeSub!: Subscription;
  listDisplaySub!: Subscription;

  vm$ = combineLatest([
    this.jobService.showListAction$,
    this.jobService.smallScreenAction$,
    this.hasJobDetail$,
  ]).pipe(
    map(([showList, smallScreen, hasJd]) => {
      return { showList, hasJd, jdLayout: !(smallScreen && !hasJd) };
    })
  );

  ngAfterViewInit(): void {
    this.setInitDetailHeight();
    const smallSceen = window.innerWidth <= 900;
    const hasJd = this.route.snapshot.queryParamMap.has('jd');
    this.jobService.changeSmallScreen(smallSceen);
    this.jobService.changeShowList(!(smallSceen && hasJd));
  }

  ngOnDestroy(): void {
    this.resizeDetailSub.unsubscribe();
    this.screenSizeSub.unsubscribe();
    this.listDisplaySub.unsubscribe();
  }

  private setInitDetailHeight() {
    const wh = window.innerHeight;
    this.jobService.changeDetailHeight(wh - 191 - 85);
  }

  private setDetailHeight() {
    const r = this.elementRef.nativeElement.getBoundingClientRect();
    const wh = window.innerHeight;
    let res =
      r.bottom - 100 < wh
        ? r.bottom - 100 - 16 - (r.top > 0 ? r.top : 0)
        : wh - (r.top > 0 ? r.top + 45 : 0) - 32;
    console.log(res, r.bottom, wh, r.top, r);
    this.jobService.changeDetailHeight(res);
  }
}
