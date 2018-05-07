import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/authentication';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public authService: AuthService, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }


  onSignUp(form: NgForm) {
    let loader = this.loadingCtrl.create({
      content: "Signing you up...",
      duration: 3000
    });
    loader.present();

    this.authService.signUp(form.value.email, form.value.password)
    .then(data => {
      loader.dismiss();
    })
    .catch(error => {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Signup Failed',
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
    form.reset();
  }
}
