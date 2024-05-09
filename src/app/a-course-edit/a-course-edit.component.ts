import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCategory } from '../Model/coursecategory.model';
import { CourseCategoryService } from '../Service/course-category.service';

@Component({
  selector: 'app-a-course-edit',
  templateUrl: './a-course-edit.component.html',
  styleUrls: ['./a-course-edit.component.css']
})
export class ACourseEditComponent implements OnInit{
  course_cat_id!: number;
  courseCategory!: CourseCategory;
  form!: FormGroup;

  constructor(public courseCategoryService: CourseCategoryService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.course_cat_id = this.route.snapshot.params['courseCatId'];
    this.courseCategoryService.getById(this.course_cat_id).subscribe((data: CourseCategory)=>{
      this.courseCategory = data;
    });

    this.form = new FormGroup({
      courseCatName: new FormControl('', [Validators.required])
    });
  }

  catUpdate(){
    this.courseCategoryService.update(this.course_cat_id, this.form.value).subscribe((res:any) => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('adashboard/acourseview');
    })
  };
}
