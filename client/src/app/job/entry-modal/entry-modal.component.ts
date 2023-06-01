import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';

@Component({
  selector: 'app-entry-modal',
  templateUrl: './entry-modal.component.html',
  styleUrls: ['./entry-modal.component.scss'],
})
export class EntryModalComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  @Output() closeModal = new EventEmitter();

  options = [
    { id: 1, label: 'Entry Level' },
    { id: 2, label: 'Non-entry Level' },
  ];
  faCheck = faCheck;
  vm$ = this.route.queryParamMap.pipe(
    map((paramMap) => {
      if (!paramMap.get('entry'))
        return this.options.map((i) => ({ ...i, selected: false }));

      if (paramMap.get('entry')!.toLowerCase() === 'true') {
        return this.options.map((i) => ({
          ...i,
          selected: i.id === 1 ? true : false,
        }));
      } else {
        return this.options.map((i) => ({
          ...i,
          selected: i.id === 2 ? true : false,
        }));
      }
    })
  );

  select(id: number) {
    this.router.navigate([], {
      queryParams: {
        entry: id === 1 ? 'true' : 'false',
      },
      queryParamsHandling: 'merge',
    });
  }

  setModalClose(event: any) {
    this.closeModal.emit(event);
  }
}
