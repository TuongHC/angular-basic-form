import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './components/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAnswersComponent } from './components/form-answers/form-answers.component';

@NgModule({
  declarations: [FormBuilderComponent, FormComponent, FormAnswersComponent],
  imports: [CommonModule, FormRoutingModule, FormsModule, AsyncPipe, ReactiveFormsModule],
})
export class FormModule {}
