import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent {
  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  hasJobDetail$ = this.route.queryParamMap.pipe(
    //tap((p) => console.log(p.keys)),
    map((p) => p.has('jd'))
  );

  jobs$ = this.jobService.joblist$;
}
