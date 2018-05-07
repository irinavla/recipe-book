import { Recipe } from '../models/recipe.interface';
import { Ingredient } from '../models/ingredient.interface';

export class RecipesService {
    private recipe: Recipe[] = [];

    addRecipe(
        title: string, 
        description: string, 
        difficulty: string, 
        ingredients: Ingredient[]) 
        {
        this.recipe.push( new Recipe(title, description, difficulty, ingredients) );
        console.log(this.recipe);
    }

    getRecipes() {
        return this.recipe.slice();
    }

    updateRecipe(
        index: number,
        title: string, 
        description: string, 
        difficulty: string, 
        ingredients: Ingredient[]) 
    {
          this.recipe[index] = new Recipe(title, description, difficulty, ingredients);
    }

    removeRecipe(index: number) {
        this.recipe.splice(index, 1);
    }
}