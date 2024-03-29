import {
  FormStyle,
  TranslationWidth,
  getLocaleDayNames,
} from '@angular/common';
import { Component, Inject, Input, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-days-of-week',
  templateUrl: './days-of-week.component.html',
  styleUrls: ['./days-of-week.component.scss'],
})
export class DaysOfWeekComponent {
  daysOfWeek!: readonly string[];
  narrowDaysOfWeek!: readonly string[];

  private _locale?: string;

  @Input()
  get locale() {
    return this._locale;
  }

  set locale(locale: string | undefined) {
    this._locale = locale || this.localeId;
    this.daysOfWeek = this.getDaysOfWeek();
    this.narrowDaysOfWeek = this.getNarrowDaysOfWeek();
  }

  constructor(@Inject(LOCALE_ID) private localeId: string) {}

  ngOnInit(): void {
    if (!this.locale) {
      this.locale = this.localeId;
    }
  }

  private getDaysOfWeek() {
    return getLocaleDayNames(
      this.locale!,
      FormStyle.Format,
      TranslationWidth.Wide
    );
  }

  private getNarrowDaysOfWeek() {
    return getLocaleDayNames(
      this.locale!,
      FormStyle.Format,
      TranslationWidth.Narrow
    );
  }
}
