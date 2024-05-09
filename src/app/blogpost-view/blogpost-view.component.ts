import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../Model/blog-post.model';
import { BlogService } from '../Service/blog.service';
import { BlogpostService } from '../Service/blogpost.service';

@Component({
  selector: 'app-blogpost-view',
  templateUrl: './blogpost-view.component.html',
  styleUrls: ['./blogpost-view.component.css']
})
export class BlogpostViewComponent implements OnInit{

  blog_post_id!: number;
  blogPost!: BlogPost;
  form!: FormGroup;

  constructor(private blogPostService: BlogpostService,
    private blogService: BlogService,
    private route: ActivatedRoute,
    public router: Router){}

  ngOnInit(): void {
    this.blog_post_id = this.route.snapshot.params['blogpostId'];
    this.blogPostService.getById(this.blog_post_id).subscribe((data: BlogPost)=>{
      this.blogPost = data;
      console.log("blog" + this.blogPost.blogPostCategory);
    });

    this.form = new FormGroup({
      blogCategory: new FormControl('', [Validators.required]),
      blogName: new FormControl('', [Validators.required]),
      blogPublisherName: new FormControl('', [Validators.required]),
      blogPublisherUsername: new FormControl('', [Validators.required]),
      blogPublishDate: new FormControl('', [Validators.required]),
      blogPhoto: new FormControl('', [Validators.required]),
      blogIntroduction: new FormControl('', [Validators.required]),
      blogDescription: new FormControl('', [Validators.required])
    });
  }

  submit(){
    this.blogService.create(this.form.value).subscribe((res:any) => {
      this.router.navigateByUrl('adashboard/ablog');
    }) 
  }
}
