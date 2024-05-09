import { Component, OnInit } from '@angular/core';
import { Applicant } from '../Model/applicant.model';
import { Instructor } from '../Model/instructor.model';
import { InstructorFormService } from '../Service/instructor-form.service';
import { InstructorService } from '../Service/instructor.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit{

  applicants: Applicant[] = [];
  instructors: Instructor[] = [];

  constructor(public instructorFormService: InstructorFormService,
    public instructorService: InstructorService) { }

  ngOnInit(): void {
    this.instructorFormService.getAll().subscribe((data: Applicant[]) => {
      this.applicants = data;
    })

    this.instructorService.getAll().subscribe((data: Instructor[]) => {
      this.instructors = data;
    })
  }

  delete(id:number){
    this.instructorFormService.delete(id).subscribe(res => {
         this.applicants = this.applicants.filter(item => item.applicant_id !== id);
    })
  }

  delete2(id:number){
    this.instructorService.delete(id).subscribe(res => {
         this.instructors = this.instructors.filter(item => item.instructor_id !== id);
    })
  }

}
