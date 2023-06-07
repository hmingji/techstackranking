import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrapComponent } from './scrap.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [
    ScrapComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ScrapModule { }
