import { Component } from '@angular/core';
import { IonicPage, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient.interface';
import { SlOptionsPage } from '../sl-options/sl-options';
import { AuthService } from '../../services/authentication';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[];

  constructor( 
    private slService: ShoppingListService,
    public popoverCtrl: PopoverController,
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  } 

  onRemoveItem(index: number ) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event: UIEvent) {
    let loader = this.loadingCtrl.create({
      content: "Fetching your shopping list...",
      duration: 3000
    });

    let popover = this.popoverCtrl.create(SlOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        } 

        if (data.action == 'load') {
          loader.present();
          this.authService.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.slService.fetchList(token).subscribe(
                (list: Ingredient[]) => {
                  loader.dismiss();
                  if (list) {
                    this.listItems = list;
                  } else {               
                    this.listItems = [];
                  }
                },
                error => {
                  loader.dismiss();
                  this.errorHandler(error.message);
                }
              )
            }
          );
        } else if (data.action == 'store') {
          loader.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.slService.storeList(token).subscribe(
                  () => loader.dismiss(),
                  error => {
                    loader.dismiss();
                    this.errorHandler(error.message);
                  }
                )
              }
            );
        } else {
          // do nothing
        }
      }

    );
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  loadItems() {
    this.listItems = this.slService.getItems();
  }

  errorHandler( errorMessage: string) {
    let alert = this.alertCtrl.create({
      title: 'An error occured!',
      message: errorMessage,
      buttons: ['OK']
    });

    alert.present();
  }
 }
