import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TechStackFilter, TechStackNameAndId } from '../job';
import { combineLatest, debounceTime, map, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tech-stack-modal',
  templateUrl: './tech-stack-modal.component.html',
  styleUrls: ['./tech-stack-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackModalComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  @Input() techstacks!: TechStackNameAndId[]; //list of all available tech stack
  //techstackFilters!: TechStackFilter[];
  //filtered: TechStackFilter[] = [];
  placeholderText = 'Search tech stack';
  filterControl = new FormControl('');

  // ngOnInit(): void {
  //   // this.route.queryParamMap.subscribe((paramMap) => {
  //   //   if (paramMap.has('techstacks')) {
  //   //     const ids = paramMap
  //   //       .get('techstacks')!
  //   //       .split(',')
  //   //       .map((i) => parseInt(i));
  //   //     this.techstackFilters = this.techstacks.map((t) => {
  //   //       return {
  //   //         ...t,
  //   //         selection: ids.includes(t.id) ? true : false,
  //   //       } as TechStackFilter;
  //   //     });
  //   //   } else {
  //   //     this.techstackFilters = this.techstacks.map((t) => {
  //   //       return { ...t, selection: false } as TechStackFilter;
  //   //     });
  //   //   }
  //   // });
  //   //set value for search input
  // }

  //vm stream and filtered stream
  all$ = this.route.queryParamMap.pipe(
    map((paramMap) => {
      if (paramMap.has('techstacks')) {
        const ids = paramMap
          .get('techstacks')!
          .split(',')
          .map((i) => parseInt(i));
        return this.techstacks.map((t) => {
          return {
            ...t,
            selection: ids.includes(t.id) ? true : false,
          } as TechStackFilter;
        });
      } else {
        return this.techstacks.map((t) => {
          return { ...t, selection: false } as TechStackFilter;
        });
      }
    })
  );

  filtered$ = combineLatest([
    this.all$,
    this.filterControl.valueChanges.pipe(debounceTime(1000)),
  ]).pipe(
    map(([all, filterBy]) => {
      // if (!filterBy) return [] as TechStackFilter[];
      if (!filterBy) return null;
      return all.filter(
        (i) => i.name.toLocaleLowerCase().indexOf(filterBy) !== -1
      );
    })
  );

  // onSearchValueChange(val: string) {
  //   this.filtered = this.techstackFilters.filter(
  //     (i) => i.name.toLocaleLowerCase().indexOf(val) !== -1
  //   );
  // }

  onChange(event: Event) {
    this.route.queryParamMap.subscribe((paramMap) => {
      let param = paramMap.get('techstacks')
        ? paramMap
            .get('techstacks')!
            .split(',')
            .map((i) => parseInt(i))
        : [];
      const target = parseInt((event.target as HTMLInputElement).id);
      const checked = (event.target as HTMLInputElement).checked;

      if (checked && !param.includes(target)) {
        param.push(target);
      }
      if (!checked) {
        param = param.filter((i) => i !== target);
      }
      // const idx = this.techstackFilters.findIndex((i) => i.id === target);
      // this.techstackFilters[idx].selection = checked;
      this.router.navigate([], {
        queryParams: {
          techstacks: param.length === 0 ? null : param.join(','),
        },
        queryParamsHandling: 'merge',
      });
    });
  }
}
