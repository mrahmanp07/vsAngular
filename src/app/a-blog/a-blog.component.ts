import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../Model/blog-post.model';
import { Blog } from '../Model/blog.model';
import { BlogService } from '../Service/blog.service';
import { BlogpostService } from '../Service/blogpost.service';

@Component({
  selector: 'app-a-blog',
  templateUrl: './a-blog.component.html',
  styleUrls: ['./a-blog.component.css']
})
export class ABlogComponent implements OnInit{
  blogposts: BlogPost[] = [];
  blogs: Blog[] = [];

  constructor(private blogPostService: BlogpostService,
    private blogService: BlogService){}

  ngOnInit(): void {
    this.blogPostService.getAll().subscribe((data: BlogPost[]) => {
      this.blogposts = data;
    })

    this.blogService.getAll().subscribe((data: Blog[]) => {
      this.blogs = data;
    })
  }

  delete(id:number){
    this.blogPostService.delete(id).subscribe(res => {
         this.blogposts = this.blogposts.filter(item => item.blog_post_id !== id);
    })
  }

}
