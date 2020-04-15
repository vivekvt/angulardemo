import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ]
})

export class ContactComponent implements OnInit {
@ViewChild('fform') feedbackFormDirective;

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  feedbackCopy: Feedback;
  spinnerVisibility: boolean = false;

  constructor(private feedbackService: FeedbackService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      telnum: ['', Validators.required ],
      email: ['', Validators.required ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit() {
    this.spinnerVisibility = true;
    this.feedbackCopy = this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedbackCopy)
      .subscribe(feedback => 
        { setTimeout(() => 
          {
            this.feedback = feedback; this.spinnerVisibility = false; console.log(this.feedback); 
            setTimeout(() => this.feedback = null, 5000);
          }
          , 2000);
        }, error =>{ console.log(error);}
      );

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
    }
}