import { Component, OnInit } from '@angular/core';
import { Blog } from '../Model/blog.model';
import { BlogService } from '../Service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit{
  blogs: Blog[] = [];

  constructor(private blogService: BlogService){}

  ngOnInit(): void {
    this.blogService.getAll().subscribe((data: Blog[]) => {
      this.blogs = data;
    })
  }


  // click1(){
  //   this.courseService.getByCatName(this.c1).subscribe((data) => {
  //     this.courses = data
  //   })
  // }
  // click2(){
  //   this.courseService.getByCatName(this.c2).subscribe((data) => {
  //     this.courses = data
  //   })
  // }
  // click3(){
  //   this.courseService.getByCatName(this.c3).subscribe((data) => {
  //     this.courses = data
  //   })
  // }
  // click4(){
  //   this.courseService.getByCatName(this.c4).subscribe((data) => {
  //     this.courses = data
  //   })
  // }
}
