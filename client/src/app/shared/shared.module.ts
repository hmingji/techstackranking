import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [DropdownComponent, ClickOutsideDirective],
  imports: [CommonModule, FontAwesomeModule],
  exports: [DropdownComponent, ClickOutsideDirective],
})
export class SharedModule {}
