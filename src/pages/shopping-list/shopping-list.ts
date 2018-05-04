import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient.interface';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[];

  constructor( private slService: ShoppingListService ) {}

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  } 

  onRemoveItem(index: number ) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  loadItems() {
    this.listItems = this.slService.getItems();
  }
 }
