import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClickOutsideDirective } from './click-outside.directive';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [DropdownComponent, ClickOutsideDirective, PaginatorComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [DropdownComponent, ClickOutsideDirective, PaginatorComponent],
})
export class SharedModule {}
