import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstructorFormService } from '../Service/instructor-form.service';

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.css']
})
export class InstructorFormComponent implements OnInit{

  form!: FormGroup;

  constructor(private instructorFormService: InstructorFormService, private router: Router,){}

  ngOnInit(): void {
    this.form = new FormGroup({
      applicantName: new FormControl('', Validators.required),
      applicantUsername: new FormControl('', Validators.required),
      applicantPassword: new FormControl('', Validators.required),
      applicantEmail: new FormControl('', Validators.required),
      applicantPhone: new FormControl('', Validators.required),
      applicantNid: new FormControl('', Validators.required),
      applicantDesignation: new FormControl('', Validators.required),
      applicantWorkplace: new FormControl('', Validators.required)
    })
  }

  submit(){
    this.instructorFormService.create(this.form.value).subscribe((res:any) => {
      this.router.navigateByUrl('adashboard/instructorform');
    })
  }

}
