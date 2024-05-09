import { Course } from "./course.model";

export class CartItem{
    constructor(public course:Course){}
    courseCid: number = this.course.course_id;
    courseCname: string = this.course.courseName;
    courseCduration: string = this.course.courseDuration;
    courseCarticle: string = this.course.courseArticle;
    courseCresource: string = this.course.courseResource;
    courseCaccess: string = this.course.courseAccess;
    courseCinstructorName: string = this.course.instructorName2;
    courseCprice: number = this.course.coursePrice;
}