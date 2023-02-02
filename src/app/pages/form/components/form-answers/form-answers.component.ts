import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAnswersComponent {
  public answersList: any = [];
  constructor(
    private formService: FormService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAnswers();
  }
  getAnswers() {
    this.formService.getAnswers().subscribe((answers) => {
      this.answersList = answers;
      this.cd.detectChanges();
    });
  }
}
