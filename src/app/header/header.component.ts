import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../Service/auth.service';
import { CartService } from '../Service/cart.service';
import { EventBusService } from '../Service/event-bus.service';
import { StorageService } from '../Service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  private roles: string[] = [];
  isLoggedIn = false;
  // showAdminBoard = false;
  // showModeratorBoard = false;
  username?: string;
  eventBusSub?: Subscription;

  cartQuantity = 0;

  constructor(
    private storageService: StorageService,
    private eventBusService: EventBusService
  ) {
    // cartService.getCartObservable().subscribe((newcart)=>{
    //   this.cartQuantity = newcart.totalCount;
    // })
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      console.log("USer---",user)
      this.roles = user.user.role;

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    // this.authService.logout().subscribe({
    //   next: res => {
    //     console.log(res);
    //     this.storageService.clean();

    //     window.location.reload();
    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // });

    this.storageService.clean();

    window.location.reload();
  }
}
