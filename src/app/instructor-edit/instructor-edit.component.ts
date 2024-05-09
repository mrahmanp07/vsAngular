import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Applicant } from '../Model/applicant.model';
import { Instructor } from '../Model/instructor.model';
import { InstructorFormService } from '../Service/instructor-form.service';
import { InstructorService } from '../Service/instructor.service';

@Component({
  selector: 'app-instructor-edit',
  templateUrl: './instructor-edit.component.html',
  styleUrls: ['./instructor-edit.component.css']
})
export class InstructorEditComponent implements OnInit{

  instructor_id!: number;
  applicant_id!:number;
  applicant!: Applicant;
  instructor!: Instructor;
  instructors: Instructor[] = [];
  form!: FormGroup;
  form1!: FormGroup;

  constructor(public instructorService: InstructorService,
    public instructorFormService: InstructorFormService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.applicant_id = this.route.snapshot.params['applicantId'];
    this.instructorFormService.getById(this.applicant_id).subscribe((data: Applicant)=>{
      this.applicant = data;
    });

    this.instructor_id = this.route.snapshot.params['instructorId'];
    this.instructorService.getById(this.instructor_id).subscribe((data: Instructor)=>{
      this.instructor = data;
    });

    this.form = new FormGroup({
      instructorName: new FormControl('', [Validators.required]),
      instructorUsername: new FormControl('', [Validators.required]),
      instructorPassword: new FormControl('', [Validators.required]),
      instructorEmail: new FormControl('', [Validators.required]),
      instructorPhone: new FormControl('', [Validators.required]),
      instructorNid: new FormControl('', [Validators.required]),
      instructorDesignation: new FormControl('', [Validators.required]),
      instructorWorkplace: new FormControl('', [Validators.required]),
      instructorPic: new FormControl('', [Validators.required])
    });
  }

  submit(){
    this.instructorService.create(this.form.value).subscribe((res:any) => {
      this.router.navigateByUrl('adashboard/instructor');
    })   
  };

  submit1(){
    this.instructorService.update(this.instructor_id, this.form1.value).subscribe((res:any) => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('adashboard/instructor');
    })
  }

}
