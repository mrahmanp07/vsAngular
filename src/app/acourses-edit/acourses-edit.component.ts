import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../Model/course.model';
import { CourseService } from '../Service/course.service';

@Component({
  selector: 'app-acourses-edit',
  templateUrl: './acourses-edit.component.html',
  styleUrls: ['./acourses-edit.component.css']
})
export class AcoursesEditComponent implements OnInit{

  course_id!: number;
  course!: Course;
  form!: FormGroup;

  constructor(public courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.course_id = this.route.snapshot.params['courseId'];
    this.courseService.getById(this.course_id).subscribe((data: Course)=>{
      this.course = data;
    });

    this.form = new FormGroup({
      courseName: new FormControl('', [Validators.required]),
      courseUploadDate: new FormControl('', [Validators.required]),
      courseArticle: new FormControl('', [Validators.required]),
      courseDuration: new FormControl('', [Validators.required]),
      courseResource: new FormControl('', [Validators.required]),
      courseAccess: new FormControl('', [Validators.required]),
      coursePrice: new FormControl('', [Validators.required]),
      courseDiscount: new FormControl('', [Validators.required]),
      coursePic: new FormControl('', [Validators.required])
    });
  }

  update(){
    this.courseService.update(this.course_id, this.form.value).subscribe((res:any) => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('adashboard/acourseview');
    })
  };

}
