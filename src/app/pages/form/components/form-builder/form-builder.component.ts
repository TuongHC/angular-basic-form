import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent {
  form: FormGroup;
  formAddQuestion: FormGroup;
  isOpenAddNew = false;
  newQuestionType = 'paragraph';

  formData = [
    {
      id: 'paragraph1',
      type: 'paragraph',
      question: 'Please tell us about yourself*',
      answer: '',
      answers: [],
    },
    {
      id: 'checkboxList1',
      type: 'checkboxList',
      question: 'Please select the languages you know *',
      answers: [
        { id: 'answer1', title: 'Typescript', selected: false },
        { id: 'answer2', title: 'Python', selected: false },
        { id: 'answer3', title: 'C#', selected: false },
        { id: 'answer4', title: 'Other', selected: false },
      ],
    },
  ];

  formAddNewQuestion = {
    type: '',
    question: 'New question',
    answers: [{ title: 'new answer' }],
  };

  answerData: any = [];

  get formDataArray() {
    return this.form?.controls?.['formData'] as FormArray;
  }

  get formAnswersArray() {
    return this.formAddQuestion?.controls?.['answers'] as FormArray;
  }

  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private readonly router: Router
  ) {
    this.form = this.formBuilder.group({
      formData: new FormArray([]),
    });
    this.formAddQuestion = formBuilder.group({
      newQuestionType: [''],
      newQuestion: [],
      answers: new FormArray([]),
    });

    this.addFields();
  }

  ngOnInit() {}

  toggleAddNewQuestion() {
    this.isOpenAddNew = !this.isOpenAddNew;
    this.cd.detectChanges();
  }

  addNewQuestion() {
    const { answers, newQuestion } = this.formAddQuestion.value;
    const question = {
      id: this.generateQuickGuid(),
      type: this.newQuestionType,
      question: newQuestion,
      answer: '',
      answers: [],
    };
    if (answers.length) {
      const answerList: any = [];
      answers.forEach((el: any) => {
        console.log('answers.length', el);
        const answerItem = {
          id: this.generateQuickGuid(),
          title: el,
          selected: false,
        };
        answerList.push(answerItem);
      });
      question.answers = answerList;
    }

    this.formData.push(question);
    this.addFields();
    this.isOpenAddNew = false;
  }
  generateQuickGuid() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  handleQuestionTypeChange(event: any) {
    console.log(this.newQuestionType);
    if (this.newQuestionType) {
    }
  }

  private addFields() {
    this.formData.forEach((item) => {
      return this.formDataArray.push(new FormControl());
    });
  }

  submit() {
    this.answerData = [];
    this.addAnswer();
    this.formService.setAnswers(this.answerData);
    this.router.navigate(['form/answers']);
  }
  addAnswer() {
    const formValue = this.form.controls['formData'].value;
    formValue.forEach((el: any, i: number) => {
      const result = { ...this.formData[i], answer: el };
      this.answerData.push(result);
    });
  }
  checkboxChange(event: any, answer: any, index: any) {
    this.formData.forEach((item: any, i) => {
      if (i === index) {
        item.answers.forEach((answerItem: any) => {
          if (answerItem.id == answer.id) {
            answerItem.selected = event.target.checked;
          }
        });
      }
    });
  }

  addNewAnswer() {
    this.formAddNewQuestion.answers.forEach((item) => {
      return this.formAnswersArray.push(new FormControl(item.title));
    });
    this.cd.detectChanges();
  }
}
