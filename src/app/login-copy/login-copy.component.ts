import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../Model/course.model';
import { AuthService } from '../Service/auth.service';
import { CourseService } from '../Service/course.service';
import { StorageService } from '../Service/storage.service';

@Component({
  selector: 'app-login-copy',
  templateUrl: './login-copy.component.html',
  styleUrls: ['./login-copy.component.css']
})
export class LoginCopyComponent {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  course_id!:number;
  course!: Course;

  constructor(private authService: AuthService, private storageService: StorageService, public router: Router, private courseService: CourseService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }

    this.course_id = this.route.snapshot.params['courseId'];
    this.courseService.getById(this.course_id).subscribe((data: Course)=>{
      this.course = data;
      console.log(this.course.courseName + "************login-copy**********");
    });
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        alert("Successfully sign in!")
        // this.reloadPage();
        this.router.navigateByUrl('/paymentmethod/' + this.course.course_id);
        
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
