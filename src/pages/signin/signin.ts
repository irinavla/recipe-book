import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/authentication';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    public authService: AuthService, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  onSignIn(form: NgForm) {
    let loader = this.loadingCtrl.create({
      content: "Signing you in...",
      duration: 3000
    });
    loader.present();
    this.authService.signIn(form.value.email, form.value.password)
    .then(data => {
      loader.dismiss();
    })
    .catch(error => {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Signin Failed',
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
    form.reset();
  }

}
