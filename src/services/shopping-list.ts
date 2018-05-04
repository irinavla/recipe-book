import { Ingredient } from '../models/ingredient.interface';

export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    addItem (name: string, amount: string) {
        this.ingredients.push( new Ingredient(name, amount) );
        console.log(this.ingredients);
    }

    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);
    }

    getItems() {
        return this.ingredients.slice(); // return a copy of the array
    }

    removeItem(index: number) {
        this.ingredients.splice(index, 1);
    }
}