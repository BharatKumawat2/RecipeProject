import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private loggingService: LoggingService, private router: Router) { }
  // name = 'Get Current Url Route Demo';
  // currentRoute: string;
  ngOnInit() {
    this.authService.autoLogin();
    this.loggingService.printLog("Hello form AppComponent ngOnInt!");


    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd))
    //   .subscribe(event => {
    //     this.currentRoute = event.url;
    //     console.log(event);
    //   });
    // this.router.events.subscribe(a => {

    //   console.log(a)
    // })

  }
}
