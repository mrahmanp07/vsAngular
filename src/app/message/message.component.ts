import { Component, OnInit } from '@angular/core';
import { PurchaseCourse } from '../Model/purchase-course.model';
import { PurchaseCourseService } from '../Service/purchase-course.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{
  purchaseCourses: PurchaseCourse[] = [];

  constructor(private purchaseCourseService: PurchaseCourseService){}

  ngOnInit(): void {
    this.purchaseCourseService.getAll().subscribe((data: PurchaseCourse[]) => {
      this.purchaseCourses = data;
    })
  }
}
