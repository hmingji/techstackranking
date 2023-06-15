import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { JobService } from '../job.service';
import { Subscription, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements AfterViewInit, OnDestroy {
  constructor(
    private jobService: JobService,
    private renderer: Renderer2,
    private router: Router
  ) {}
  faXmark = faXmark;
  faChevronLeft = faChevronLeft;
  @Input() fullWidthMode!: Boolean;
  @ViewChild('detail', { static: false }) detail!: ElementRef<HTMLElement>;
  detailHeightSub!: Subscription;
  ngAfterViewInit(): void {
    this.detailHeightSub = this.jobService.detailHeightAction$.subscribe(
      (h) => {
        if (this.detail)
          this.renderer.setStyle(this.detail.nativeElement, 'height', `${h}px`);
      }
    );
  }

  ngOnDestroy(): void {
    this.detailHeightSub.unsubscribe();
  }
  detail$ = this.jobService.jobDetail$;

  closeDetail() {
    this.router.navigate([], {
      queryParams: {
        jd: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  closeDetailFullWidthMode() {
    this.router.navigate([], {
      queryParams: {
        jd: null,
      },
      queryParamsHandling: 'merge',
    });
    this.jobService.changeShowList(true);
  }
}
