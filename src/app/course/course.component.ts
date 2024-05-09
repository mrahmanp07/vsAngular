import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Course } from '../Model/course.model';

import { CartService } from '../Service/cart.service';
import { CourseService } from '../Service/course.service';
import { InstructorService } from '../Service/instructor.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit{

  courses: Course[] = [];
  form!: FormGroup;

  c1: string = "Graphics Design";
  c2: string = "Web Development";
  c3: string = "Web Design";
  c4: string = "Office Application";

  constructor(public courseService: CourseService,
    public cartService: CartService,
    public instructorService: InstructorService){}

  ngOnInit(): void {
    this.courseService.getAll().subscribe((data: Course[]) => {
      this.courses = data;
    })
  }

  click1(){
    this.courseService.getByCatName(this.c1).subscribe((data) => {
      this.courses = data
    })
  }
  click2(){
    this.courseService.getByCatName(this.c2).subscribe((data) => {
      this.courses = data
    })
  }
  click3(){
    this.courseService.getByCatName(this.c3).subscribe((data) => {
      this.courses = data
    })
  }
  click4(){
    this.courseService.getByCatName(this.c4).subscribe((data) => {
      this.courses = data
    })
  }

}
