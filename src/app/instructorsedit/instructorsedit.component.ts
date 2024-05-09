import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Instructor } from '../Model/instructor.model';
import { InstructorService } from '../Service/instructor.service';

@Component({
  selector: 'app-instructorsedit',
  templateUrl: './instructorsedit.component.html',
  styleUrls: ['./instructorsedit.component.css']
})
export class InstructorseditComponent implements OnInit{

  instructor_id!: number;
  instructor!: Instructor;
  form!: FormGroup;

  constructor(public instructorService: InstructorService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
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

  update(){
    this.instructorService.update(this.instructor_id, this.form.value).subscribe((res:any) => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('adashboard/instructor');
    })
  };

}
