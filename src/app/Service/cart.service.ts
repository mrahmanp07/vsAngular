import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { CartItem } from '../Model/cart-item.model';
import { Cart } from '../Model/cart.model';
import { Course } from '../Model/course.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart)
  private api = "http://localhost:8080/cart";
  private baseUrl ='http://localhost:3000/cart';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  addtoCart(course:Course): void{
    let cartItem = this.cart.items.find(item => item.course.course_id === course.course_id)
    if(cartItem)
    return;
    this.cart.items.push(new CartItem(course))
    this.setCartToLocalStorage();
  }

  removeFromCart(id:number): void{
    this.cart.items = this.cart.items.filter(item => item.course.course_id != id)
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) =>
    prevSum + currentItem.courseCprice, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => 
    prevSum + currentItem.courseCid, 0);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson?JSON.parse(cartJson): new Cart();
  }

  // create(cart:Cart): Observable<any>{
  //   return this.httpClient.post(this.api + '/post', JSON.stringify(cart), this.httpOptions)
  //   .pipe( 
  //     catchError(this.errorHandler)
  //   )
  // }

  // getAll(): Observable<any> {
  //   return this.httpClient.get(this.api + '/getall')
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  // getById(id:number): Observable<any> {
  //   return this.httpClient.get(this.api + '/get/' + id)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  // delete(id:number){
  //   return this.httpClient.delete(this.api + '/delete/' + id, this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  // createCart(cart : Cart){
  //   return this.httpClient.post<Cart>(this.baseUrl, cart);
  // }

  // getCart(): Observable<any>{
  //   return this.httpClient.get<Cart[]>(this.baseUrl);
  // }
  // deleteCart(id: number){
  //   return this.httpClient.delete<Cart>(this.baseUrl + "/" +id); 
  // }

  

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
