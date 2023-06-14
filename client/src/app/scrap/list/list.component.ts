import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScrapService } from '../scrap.service';
import { Command } from '../command';
import { first } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private scrapService: ScrapService) {}
  @Output() editCommand = new EventEmitter<Command>();
  showCommand = false;
  buttonText = this.showCommand ? 'Hide' : 'Show';

  ngOnInit(): void {
    this.scrapService.loadCommand();
    console.log('init');
  }

  commands$ = this.scrapService.commands$;

  deleteCommand(command: Command) {
    this.scrapService
      .deleteCommand(command)
      .pipe(first())
      .subscribe({
        next: () => {
          this.scrapService.pushToastNotification(
            'Successfully deleted command.'
          );
          this.scrapService.loadCommand();
        },
        error: (msg) => {
          this.scrapService.pushToastNotification(msg);
        },
      });
  }

  onEditClicked(command: Command) {
    this.editCommand.emit(command);
  }

  invokeCommand(id: string) {
    this.scrapService
      .startScrap(id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.scrapService.pushToastNotification(
            'Successfully invoked command.'
          );
        },
        error: (msg) => {
          this.scrapService.pushToastNotification(msg);
        },
      });
  }

  toggleShowCommand() {
    this.showCommand = !this.showCommand;
    this.buttonText = this.showCommand ? 'Hide' : 'Show';
  }
}
