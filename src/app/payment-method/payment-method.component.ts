import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../Model/course.model';
import { CourseService } from '../Service/course.service';
import { PurchaseCourseService } from '../Service/purchase-course.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit{

  constructor(private purchaseCourseService: PurchaseCourseService,
     private courseService: CourseService,
      public route: ActivatedRoute,
       public router: Router){
    
  }

  myDate = new Date();
  btn1:boolean = false;
  btn2:boolean = true;
  course!:Course;
  course_id!: number; 
  form!: FormGroup

  ngOnInit(): void {
    this.course_id = this.route.snapshot.params['purchaseCourseId'];
    console.log("ID --- -purchaseCourseId",  this.course_id)
    this.courseService.getById(this.course_id).subscribe((data: Course)=>{
      this.course = data;
      console.log("Course--",  this.course)
      console.log(this.course.courseName + "************payment-method**********");
    })

    this.form = new FormGroup({
      pCourseId: new FormControl('', [Validators.required]),
      purchaseCourseName: new FormControl('', [Validators.required]),
      purchaseCoursePrice: new FormControl('', [Validators.required]),

      purchaseCourseCountry: new FormControl('', [Validators.required]),
      purchaseCourseAccountType: new FormControl('', [Validators.required]),
      purchaseCourseUserName: new FormControl('', [Validators.required]),
      purchaseCourseUserAccount: new FormControl('', [Validators.required]),
      purchaseCoursePayment: new FormControl('', [Validators.required]),
      purchaseCourseTime: new FormControl('', [Validators.required])
    })

  }

  submit(){
    const price = this.form.get('purchaseCoursePrice')?.value;
  const pay = this.form.get('purchaseCoursePayment')?.value;

    if(price == pay){
      this.purchaseCourseService.create(this.form.value).subscribe((res:any) => {
        alert("Purchase Complete!")
      })
    }else{
      alert("Wrong payment!");
    }
  }

  btn1Function(){
    this.btn1 = true;
    this.btn2 = false;
  }

  btn2Function(){
    this.btn1 = false;
    this.btn2 = true;
  }
}
