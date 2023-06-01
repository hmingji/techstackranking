import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, first, map, take } from 'rxjs';
import { TechStackNameAndId } from '../job';

@Component({
  selector: 'app-active-filter-list',
  templateUrl: './active-filter-list.component.html',
  styleUrls: ['./active-filter-list.component.scss'],
})
export class ActiveFilterListComponent {
  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  entry$ = this.route.queryParamMap.pipe(
    map((paramMap) => {
      if (!paramMap.has('entry')) return null;
      const param = paramMap.get('entry')!;
      if (!['true', 'false'].includes(param.toLowerCase())) return null;
      if (param.toLowerCase() === 'true') {
        return 'Entry Level';
      } else {
        return 'Non-entry Level';
      }
    })
  );

  created$ = this.route.queryParamMap.pipe(
    map((paramMap) => {
      if (!paramMap.has('created')) return null;
      const param = paramMap.get('created')!.split(',');
      if (
        param.length < 2 ||
        !['lte', 'gte'].includes(param[0].toLowerCase()) ||
        !this.isIsoDate(param[1])
      )
        return null;
      let prefix: string =
        param[0].toLowerCase() === 'lte' ? 'before' : 'after';
      let dt: string = new Date(param[1]).toLocaleDateString('en-US', {
        dateStyle: 'short',
      });
      return prefix + ' ' + dt;
    })
  );

  company$ = this.route.queryParamMap.pipe(
    map((paramMap) => {
      if (!paramMap.has('company')) return null;
      return paramMap.get('company')!;
    })
  );

  techstack$ = combineLatest([
    this.route.queryParamMap,
    this.jobService.techstacks$,
  ]).pipe(
    map(([paramMap, techstacks]) => {
      if (!paramMap.has('techstacks')) return null;
      let res: TechStackNameAndId[] = [];
      paramMap
        .get('techstacks')!
        .split(',')
        .forEach((i) => {
          if (isNaN(parseInt(i))) return;
          const t = techstacks.rows.find((p) => p.id === parseInt(i));
          if (!t) return;
          res.push(t);
        });
      return res.length > 0 ? res : null;
    })
  );

  private isIsoDate(str: string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === str; // valid date
  }

  removeEntry() {
    this.router.navigate([], {
      queryParams: {
        entry: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  removeCreated() {
    this.router.navigate([], {
      queryParams: {
        created: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  removeCompany() {
    this.router.navigate([], {
      queryParams: {
        company: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  removeTechStack(techstack: TechStackNameAndId) {
    this.techstack$.pipe(take(1)).subscribe((t) => {
      if (!t) return;
      const res = t.filter((i) => i.id !== techstack.id).map((i) => i.id);
      console.log(res);
      this.router.navigate([], {
        queryParams: {
          techstacks: res.length === 0 ? null : res.join(','),
        },
        queryParamsHandling: 'merge',
      });
    });
  }
}
