import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../Model/cart-item.model';
import { Cart } from '../Model/cart.model';
import { CartService } from '../Service/cart.service';
import { StorageService } from '../Service/storage.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart!: Cart
  totalPrice: number = 0;
  isLoggedIn = false;
  roles: string[] = [];

  constructor(public cartService: CartService,
    private storageService: StorageService,
    public router: Router){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
    cartService.getCartObservable().subscribe((newcart)=>{
      this.totalPrice = newcart.totalPrice;
    })
  }
  
  ngOnInit(): void {
    // this.cartService.getCartObservable().subscribe((cart) => {
    //   this.cart = cart;
    // })
  }

  toPayment(){
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      // this.router.navigateByUrl('/paymentmethod');
      this.router.navigateByUrl('/paymentmethod/'+ this.cart.items[0].courseCid);
    } else{
      this.router.navigateByUrl('/loginforpay/' + this.cart.items[0].courseCid);
    }
  }

  removeCart(cartItem: CartItem){
    this.cartService.removeFromCart(cartItem.course.course_id);
  }

}

