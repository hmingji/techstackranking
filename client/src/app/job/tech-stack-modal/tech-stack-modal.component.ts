import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TechStackFilter, TechStackNameAndId } from '../job';

@Component({
  selector: 'app-tech-stack-modal',
  templateUrl: './tech-stack-modal.component.html',
  styleUrls: ['./tech-stack-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackModalComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  @Input() techstacks!: TechStackNameAndId[];
  techstackFilter!: TechStackFilter[];
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((paramMap) => {
      if (paramMap.has('techstacks')) {
        const ids = paramMap
          .get('techstacks')!
          .split(',')
          .map((i) => parseInt(i));
        this.techstackFilter = this.techstacks.map((t) => {
          return {
            ...t,
            selection: ids.includes(t.id) ? true : false,
          } as TechStackFilter;
        });
      } else {
        this.techstackFilter = this.techstacks.map((t) => {
          return { ...t, selection: false } as TechStackFilter;
        });
      }
    });
  }

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

      this.router.navigate([], {
        queryParams: {
          techstacks: param.length === 0 ? null : param.join(','),
        },
        queryParamsHandling: 'merge',
      });
    });
  }
}
