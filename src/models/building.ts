import { Recipe } from './recipe';
import type { IRecipe } from './recipe';
import type { IMaterial } from './material';
import type { ITickerPriceMap } from './misc';
import workforceNeeds from '../assets/prun_data/workforceNeeds.json';

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
    Consumption: number;
}

export interface Building extends IBuilding {}
export class Building {
    Recipes: Array<Recipe>;
    BuildingCostTotal: number;
    WorkforceCostTotal: number;

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
        this.BuildingCostTotal = 0;
        this.WorkforceCostTotal = 0;
    }

    calcBuildingCosts(prices: ITickerPriceMap) {
        this.BuildingCostTotal = 0;
        for (const input of this.BuildingCosts) {
            input.Price = prices[input.CommodityTicker];
            this.BuildingCostTotal += (input.Price || 0) * input.Amount;
        }
    }

    calcRecipeCosts(prices: ITickerPriceMap) {
        for (const recipe of this.Recipes) {
            recipe.updateInputCosts(prices);
            recipe.updateOutputCosts(prices);
            recipe.updateWorkforceCost(this.WorkforceCostTotal);
            recipe.updateBuildingCost(this.BuildingCostTotal);
            recipe.calcProfits();
        }
    }

    calcWorkforceCosts(prices: ITickerPriceMap) {
        this.WorkforceCostTotal = 0;

        const workforceTypes = [
            {
                buildingFunction: "Pioneers",
                type: "PIONEER",
            },
            {
                buildingFunction: "Settlers",
                type: "SETTLER",
            },
            {
                buildingFunction: "Technicians",
                type: "TECHNICIAN",
            },
            {
                buildingFunction: "Engineers",
                type: "ENGINEER",
            },
            {
                buildingFunction: "Scientists",
                type: "SCIENTIST",
            }
        ]   
        
        for (const workforceType of workforceTypes) {
            const singleTypeNeeds = workforceNeeds.find(n => n.WorkforceType == workforceType.type).Needs;
            for (const need of singleTypeNeeds) {
                this.WorkforceCostTotal += prices[need.MaterialTicker] * need.Amount * (this[workforceType.buildingFunction] / 100);
            }
        }
    }

    calcCosts(prices: ITickerPriceMap) {
        this.calcBuildingCosts(prices);
        this.calcWorkforceCosts(prices);
        this.calcRecipeCosts(prices);
    }
}