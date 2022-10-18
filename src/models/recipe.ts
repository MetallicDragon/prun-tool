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
    WorkforceCostPerDay: number;
    WorkforceCostPerOperation: number;
    DepreciationPerOperation: number;
    OperationsPerDay: number;
    BuildingCost: number;


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
        this.WorkforceCostPerDay = 0;
        this.OperationsPerDay = 86400000 / this.DurationMs;
    }

    updateInputCosts(prices: ITickerPriceMap) {
        this.InputCostTotal = 0;
        for (const input of this.Inputs) {
            this.InputCosts[input.CommodityTicker] = prices[input.CommodityTicker];
            this.InputCostTotal += this.InputCosts[input.CommodityTicker] * (input.Amount || 0);
        }
    }

    updateOutputCosts(prices: ITickerPriceMap) {
        this.OutputCostTotal = 0;
        for (const output of this.Outputs) {
            this.OutputCosts[output.CommodityTicker] = prices[output.CommodityTicker];
            this.OutputCostTotal += this.OutputCosts[output.CommodityTicker] * (output.Amount || 0);
        }
    }

    calcProfits() {
        this.Profit = this.OutputCostTotal - this.InputCostTotal;
        this.Profit -= this.WorkforceCostPerOperation;
        this.DepreciationPerOperation = (this.BuildingCost / 180) / this.OperationsPerDay;
        this.Profit -= this.DepreciationPerOperation;
        this.ProfitPerDay = this.Profit * this.OperationsPerDay;
        this.PaybackPeriod = this.BuildingCost / this.ProfitPerDay;
    }

    updateBuildingCost(buildingCost: number) {
        this.BuildingCost = buildingCost;
    }

    updateWorkforceCost(workforceCost: number) {
        this.WorkforceCostPerDay = workforceCost;
        this.WorkforceCostPerOperation = this.WorkforceCostPerDay / this.OperationsPerDay;
    }
}