import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrapComponent } from './scrap.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ToastComponent } from './toast/toast.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { JsonParsePipe } from './json-parse.pipe';
import { AceModule } from 'ngx-ace-wrapper';

@NgModule({
  declarations: [
    ScrapComponent,
    ListComponent,
    FormComponent,
    ToastComponent,
    JsonParsePipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ScrapComponent }]),
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,
    AceModule,
  ],
})
export class ScrapModule {}
