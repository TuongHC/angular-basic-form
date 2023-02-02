import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAnswersComponent } from './components/form-answers/form-answers.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormComponent } from './components/form.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    children: [
        {
            path: 'builder',
            component: FormBuilderComponent,
        },
        {
            path: 'answers',
            component: FormAnswersComponent,
        },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
