import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/Placeholder/placeholder.directive';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private subscription : Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    // private componentResolverFactory: ComponentFactoryResolver,
    // private dataStorageService: DataStorageService
  ) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      //this.dataStorageService.fetchRecipes().subscribe();
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        // this.showErrorAlert(errorMessage)
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  // private showErrorAlert(message: string) {
  //   const alertFactory = this.componentResolverFactory.resolveComponentFactory(AlertComponent);
  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();

  //   const componentRef = hostViewContainerRef.createComponent(alertFactory);
    
  //   componentRef.instance.message = message;
  //   this.subscription = componentRef.instance.close.subscribe(() =>{
  //         this.subscription.unsubscribe();
  //         hostViewContainerRef.clear();
  //   }) 

  // }
}
