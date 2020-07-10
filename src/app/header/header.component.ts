import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAUthenticated = false;
  private authListenserSubs: Subscription;
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.userIsAUthenticated = this.authservice.getIsAuth();
    this.authListenserSubs = this.authservice.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAUthenticated = isAuthenticated;
    });
  }
  onLogout() {
    this.authservice.logout();
  }
  ngOnDestroy() {
    this.authListenserSubs.unsubscribe();
  }

}
