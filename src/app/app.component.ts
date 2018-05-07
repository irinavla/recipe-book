import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import firebase from 'firebase';
import { AuthService } from '../services/authentication';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  tabsPage:any = TabsPage;
  signinPage: any = SigninPage;
  signupPage: any = SignupPage;
  isAuthenticated: boolean = false;


  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    public menuCtrL: MenuController, 
    public authService: AuthService ) {
    firebase.initializeApp({
      apiKey: "AIzaSyCpVK942cGnu7nAIFvV3UqLOtROsFwFRRc",
      authDomain: "ionic-recipe-book-acbc0.firebaseapp.com"
    });


    firebase.auth().onAuthStateChanged( user => {
      if (user) { // if user is authenticated
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
        // this.nav.setRoot(this.tabsPage);
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
        // this.nav.setRoot(this.signinPage);
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrL.close();
  }

  onLogout() {
    this.authService.logOut();
    this.menuCtrL.close();
  }
}

