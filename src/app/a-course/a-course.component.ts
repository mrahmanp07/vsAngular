import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../Model/course.model';
import { CourseCategory } from '../Model/coursecategory.model';
import { Instructor } from '../Model/instructor.model';
import { CourseCategoryService } from '../Service/course-category.service';
import { CourseFileService } from '../Service/course-file-service.service';
import { CourseService } from '../Service/course.service';
import { InstructorService } from '../Service/instructor.service';

@Component({
  selector: 'app-a-course',
  templateUrl: './a-course.component.html',
  styleUrls: ['./a-course.component.css']
})
export class ACourseComponent implements OnInit{

  form!: FormGroup;

  categories: CourseCategory[] = [];
  instructors: Instructor[] = [];
  forms!: FormGroup;
  
  // courses: Course[] = [];
  // form2!: FormGroup;
  // selectedFiles?: FileList;
  // progressInfos: any[] = [];
  // message: string[] = [];
  // id: number = 55;
  // fileInfos?: Observable<any>;
  // selectFiles(event: any): void {
  //   this.message = [];
  //   this.progressInfos = [];
  //   this.selectedFiles = event.target.files;
  // }

  constructor(
    public courseCatService: CourseCategoryService,
    public courseService: CourseService,
    public instructorService: InstructorService,
    private router: Router,

    public courseFileService: CourseFileService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      courseCatName: new FormControl('', [Validators.required])
    })

    this.forms = new FormGroup({
      courseCatName2: new FormControl('', [Validators.required]),
      instructorName2: new FormControl('', [Validators.required]),

      courseName: new FormControl('', [Validators.required]),
      courseUploadDate: new FormControl('', [Validators.required]),
      courseDuration: new FormControl('', [Validators.required]),
      courseArticle: new FormControl('', [Validators.required]),
      courseResource: new FormControl('', [Validators.required]),
      courseAccess: new FormControl('', [Validators.required]),
      courseDescription: new FormControl('', [Validators.required]),
      courseCurriculum: new FormControl('', [Validators.required]),
      coursePrice: new FormControl('', [Validators.required]),
      courseDiscount: new FormControl('', [Validators.required]),
      coursePic: new FormControl('', [Validators.required])
    })

    this.courseCatService.getAll().subscribe((data: CourseCategory[]) => {
      this.categories = data;
    })

    this.instructorService.getAll().subscribe((data: Instructor[]) => {
      this.instructors = data;
    })

    // this.fileInfos = this.courseFileService.getFiles();
  }

  catSubmit(){
    this.courseCatService.create(this.form.value).subscribe((res:any) => {
      this.router.navigateByUrl('adashboard/acourse');
    })
  }

  submit(){
    console.log(this.forms.value);
    this.courseService.create(this.forms.value).subscribe((res:any) => {
      this.router.navigateByUrl('adashboard/acourse');
  })
  console.log(this.forms.value);
  }

  // upload(idx: number, file: File): void {
  //   this.progressInfos[idx] = { value: 0, fileName: file.name };

  //   if (file) {
  //     this.courseFileService.create(file, this.id).subscribe({
  //       next: (event: any) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
  //         } else if (event instanceof HttpResponse) {
  //           const msg = file.name + ": Successful!";
  //           this.message.push(msg);
  //           this.fileInfos = this.courseFileService.getFiles();
  //         }
  //       },
  //       error: (err: any) => {
  //         this.progressInfos[idx].value = 0;
  //         let msg = file.name + ": Failed!";

  //         if (err.error && err.error.message) {
  //           msg += " " + err.error.message;
  //         }

  //         this.message.push(msg);
  //         this.fileInfos = this.courseFileService.getFiles();
  //       }
  //     });
  //   }
  // }

  // uploadFiles(): void {
  //   this.message = [];

  //   if (this.selectedFiles) {
  //     for (let i = 0; i < this.selectedFiles.length; i++) {
  //       this.upload(i, this.selectedFiles[i]);
  //     }
  //   }
  // }

}
