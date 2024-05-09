import { Component, OnInit } from '@angular/core';
import { Course } from '../Model/course.model';
import { CourseService } from '../Service/course.service';
import { PurchaseCourseService } from '../Service/purchase-course.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{

  courses: Course[] = [];
  countData!: number;
  priceData!: number;

  constructor(private courseService: CourseService,
    private purchaseCourseService: PurchaseCourseService){}

  ngOnInit(): void {
    this.courseService.getAll().subscribe((data: Course[]) => {
      this.courses = data;
    })

    console.log(this.countData);
    console.log(this.priceData);
  }

  clickOn(id: number){
    this.purchaseCourseService.countAll(id).subscribe((data) => {
      this.countData = data
    console.log('countAll',this.countData)
  })
    this.purchaseCourseService.totalPrice(id).subscribe((res) => {
      this.priceData = res
      console.log('totalPrice',this.priceData)
    })
  }

}
