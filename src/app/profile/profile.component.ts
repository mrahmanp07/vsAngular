import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseCourse } from '../Model/purchase-course.model';
import { PurchaseCourseService } from '../Service/purchase-course.service';
import { StorageService } from '../Service/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  currentUser: any;
  purchaseCourses: PurchaseCourse[] = [];
  btn:boolean = false;

  constructor(private purchaseCourseService: PurchaseCourseService,
    private storageService: StorageService,
    public route: ActivatedRoute){}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    console.log(this.currentUser);

  }

  history(purchaseCourseUserName: string){
    this.purchaseCourseService.getByUsername(purchaseCourseUserName).subscribe((data: PurchaseCourse[])=>{
      this.purchaseCourses = data;
      console.log("print...." + this.purchaseCourses);
    });
  }

  bton(){
    this.btn = true;
  }

}
