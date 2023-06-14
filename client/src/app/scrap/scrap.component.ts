import { Component } from '@angular/core';
import { ScrapService } from './scrap.service';
import { combineLatest, first, map } from 'rxjs';
import { Command } from './command';

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.scss'],
})
export class ScrapComponent {
  constructor(private scrapService: ScrapService) {}
  isDrawerOpen = false;
  //add form editmode control functionality
  editMode = false;
  initialNameValue: string | undefined = undefined;
  initialCommandValue: string | undefined = undefined;
  idOnEdit: string | undefined = undefined;

  toast$ = combineLatest([
    this.scrapService.toastMessage$,
    this.scrapService.showToast$,
  ]).pipe(map(([toastMessage, showToast]) => ({ toastMessage, showToast })));

  openEditModeForm(c: Command) {
    this.isDrawerOpen = true;
    this.editMode = true;
    this.initialNameValue = c.name;
    this.initialCommandValue = c.command;
    this.idOnEdit = c.id;
  }

  openForm() {
    this.isDrawerOpen = true;
  }

  closeForm() {
    this.isDrawerOpen = false;
    this.editMode = false;
    this.initialNameValue = undefined;
    this.initialCommandValue = undefined;
  }

  submitForm(c: Command) {
    if (this.editMode) {
      this.scrapService
        .updateCommand(c)
        .pipe(first())
        .subscribe({
          next: () => {
            this.scrapService.pushToastNotification(
              'Successfully edited command.'
            );
            this.scrapService.loadCommand();
          },
          error: (msg) => {
            this.scrapService.pushToastNotification(msg);
          },
        });
    } else {
      this.scrapService
        .addCommand(c)
        .pipe(first())
        .subscribe({
          next: () => {
            this.scrapService.pushToastNotification(
              'Successfully added command.'
            );
            this.scrapService.loadCommand();
          },
          error: (msg) => {
            this.scrapService.pushToastNotification(msg);
          },
        });
    }
    this.isDrawerOpen = false;
    this.editMode = false;
    this.initialCommandValue = undefined;
    this.initialNameValue = undefined;
  }

  closeToast() {
    this.scrapService.closeToastNotification();
  }
}
