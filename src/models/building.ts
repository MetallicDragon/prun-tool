import { Recipe } from './recipe';
import type { IRecipe } from './recipe';
import type { IMaterial } from './material';
import type { ITickerPriceMap } from './misc';

export interface IBuilding {
    BuildingCosts: Array<IMaterial>;
    Recipes: Array<IRecipe>;
    BuildingId: string;
    Name: string;
    Ticker: string;
    Expertise: string;
    Pioneers: number;
    Settlers: number;
    Technicians: number;
    Engineers: number;
    Scientists: number;
    AreaCost: number;
    UserNameSubmitted: string;
    Timestamp: string;
}

export interface Building extends IBuilding {}
export class Building {
    Recipes: Array<Recipe>;
    InputCosts: ITickerPriceMap;
    InputCostTotal: number;

    constructor(params: IBuilding) {
        this.BuildingCosts = params.BuildingCosts;
        this.Recipes = []
        for (const recipeParams of params.Recipes) {
            this.Recipes.push(new Recipe(recipeParams));
        }
        this.BuildingId = params.BuildingId;
        this.Name = params.Name;
        this.Ticker = params.Ticker;
        this.Expertise = params.Expertise;
        this.Pioneers = params.Pioneers;
        this.Settlers = params.Settlers;
        this.Technicians = params.Technicians;
        this.Engineers = params.Engineers;
        this.Scientists = params.Scientists;
        this.AreaCost = params.AreaCost;
        this.UserNameSubmitted = params.UserNameSubmitted;
        this.Timestamp = params.Timestamp;
        this.InputCosts = {};
        this.InputCostTotal = 0;
    }

    updateInputCosts(newCosts: ITickerPriceMap) {
        for (const [ticker, price] of Object.entries(newCosts)) {
            this.InputCosts[ticker] = price;
        }
        
        this.InputCostTotal = 0;
        for (const input of this.BuildingCosts) {
            this.InputCostTotal += this.InputCosts[input.CommodityTicker] * (input.Amount || 0);
        }
    }
}