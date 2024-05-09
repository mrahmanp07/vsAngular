import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogpostService } from '../Service/blogpost.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit{
  form!: FormGroup;
  
  constructor(private blogPostService: BlogpostService,
    public router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      blogPostCategory: new FormControl('', [Validators.required]),
      blogPostName: new FormControl('', [Validators.required]),
      blogPostPublisherName: new FormControl('', [Validators.required]),
      blogPostPublisherUsername: new FormControl('', [Validators.required]),
      blogPostPublishDate: new FormControl('', [Validators.required]),
      blogPostPhoto: new FormControl('', [Validators.required]),
      blogPostIntroduction: new FormControl('', [Validators.required]),
      blogPostDescription: new FormControl('', [Validators.required])
    })
  }

  submit(){
    console.log(this.form.value);
    this.blogPostService.create(this.form.value).subscribe((res:any) => {
      this.router.navigateByUrl('/blog');
  })
  console.log(this.form.value);
  }

}
