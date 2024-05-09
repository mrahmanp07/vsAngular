import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../Model/blog.model';
import { BlogService } from '../Service/blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit{
  blog_id!: number;
  blog!: Blog;
  blogs: Blog[] = [];

  constructor(private blogService: BlogService,
    public route: ActivatedRoute){}
  ngOnInit(): void {
    this.blog_id = this.route.snapshot.params['blogId'];
    this.blogService.getById(this.blog_id).subscribe((data: Blog)=>{
      this.blog = data;
    });

    this.blogService.getAll().subscribe((data: Blog[]) => {
      this.blogs = data;
    })
  }

}
