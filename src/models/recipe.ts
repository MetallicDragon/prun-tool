import { debug } from "svelte/internal";
import type { IMaterial } from "./material";
import type { ITickerPriceMap } from "./misc";

export interface IRecipe {
    Inputs: Array<IMaterial>;
    Outputs: Array<IMaterial>;
    BuildingRecipeId: string;
    DurationMs: number;
    RecipeName: string;
}

export interface Recipe extends IRecipe {}
export class Recipe {
    InputCosts: ITickerPriceMap;
    InputCostTotal: number;
    OutputCosts: ITickerPriceMap;
    OutputCostTotal: number;
    Profit: number;
    ProfitPerDay: number;
    PaybackPeriod: number;


    constructor(params: IRecipe) {
        this.Inputs = params.Inputs;
        this.Outputs = params.Outputs;
        this.BuildingRecipeId = params.BuildingRecipeId;
        this.DurationMs = params.DurationMs;
        this.RecipeName = params.RecipeName;
        this.InputCosts = {};
        this.InputCostTotal = 0;
        this.OutputCosts = {};
        this.OutputCostTotal = 0;
    }

    updateInputCosts(newCosts: ITickerPriceMap) {
        for (const [ticker, price] of Object.entries(newCosts)) {
            this.InputCosts[ticker] = price;
        }
        
        this.InputCostTotal = 0;
        for (const input of this.Inputs) {
            this.InputCostTotal += this.InputCosts[input.CommodityTicker] * (input.Amount || 0);
        }
    }

    updateOutputCosts(newCosts: ITickerPriceMap) {
        for (const [ticker, price] of Object.entries(newCosts)) {
            this.OutputCosts[ticker] = price;
        }

        this.OutputCostTotal = 0;
        for (const output of this.Outputs) {
            this.OutputCostTotal += this.OutputCosts[output.CommodityTicker] * (output.Amount || 0);
        }
    }

    calcProfits() {
        this.Profit = this.OutputCostTotal - this.InputCostTotal;
        const operationsPerDay = 86400000 / this.DurationMs;
        this.ProfitPerDay = this.Profit * operationsPerDay;
    }

    updatePaybackPeriod(buildingCost: number) {
        this.PaybackPeriod = buildingCost / this.ProfitPerDay;
    }
}