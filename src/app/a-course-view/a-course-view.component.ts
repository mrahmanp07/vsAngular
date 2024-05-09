import { Component, OnInit } from '@angular/core';
import { CourseCategory } from '../Model/coursecategory.model';
import { CourseCategoryService } from '../Service/course-category.service';
import Swal from 'sweetalert2';
import { Course } from '../Model/course.model';
import { CourseService } from '../Service/course.service';


@Component({
  selector: 'app-a-course-view',
  templateUrl: './a-course-view.component.html',
  styleUrls: ['./a-course-view.component.css']
})
export class ACourseViewComponent implements OnInit{

  categories: CourseCategory[] = [];
  courses: Course[] = [];

  constructor(public courseCategoryService: CourseCategoryService,
    public courseService: CourseService) { }
  
  ngOnInit(): void {
    this.courseCategoryService.getAll().subscribe((data: CourseCategory[]) => {
      this.categories = data;
    })

    this.courseService.getAll().subscribe((data: Course[]) => {
      this.courses = data;
    })
  }

  // delete(id:number){
  //   this.courseCategoryService.delete(id).subscribe(res => {
  //        this.categories = this.categories.filter(item => item.course_cat_id !== id);
  //   })
  // };

  delete2(id:number){
    this.courseService.delete(id).subscribe(res => {
         this.courses = this.courses.filter(item => item.course_id !== id);
    })
  };

  delete(id: number){
    this.courseCategoryService.delete(id).subscribe(res => {
          this.categories = this.categories.filter(item => item.course_cat_id !== id);
    })
  }

}
