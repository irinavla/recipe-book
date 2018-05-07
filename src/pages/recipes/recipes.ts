import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, PopoverController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipePage } from '../recipe/recipe';
import { Recipe } from '../../models/recipe.interface';
import { RecipesService } from '../../services/recipes';

import { SlOptionsPage } from '../sl-options/sl-options';
import { AuthService } from '../../services/authentication';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[];

  constructor(
    public navParams: NavParams, 
    public navCtrl: NavController,
    public authService: AuthService,
    public rService: RecipesService,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController ) {
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  ionViewWillEnter() {
    this.recipes = this.rService.getRecipes();
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }


  onShowOptions(event: UIEvent) {
    let popover = this.popoverCtrl.create(SlOptionsPage);
    popover.present({ ev: event });

    let loader = this.loadingCtrl.create({
      content: "Fetching your shopping list...",
      duration: 3000
    });

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
              this.rService.fetchList(token).subscribe(
                (list: Recipe[]) => {
                  loader.dismiss();
                  if (list) {
                    this.recipes = list;
                  } else {               
                    this.recipes = [];
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
                this.rService.storeList(token).subscribe(
                  () => loader.dismiss(),
                  error => {
                    loader.dismiss();
                    this.errorHandler(error.message);
                  }
                )
              }
            );
        } 
      }

    );
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
