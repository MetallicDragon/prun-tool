import type { IMaterial } from "./material";

export interface IRecipe {
    Inputs: Array<IMaterial>;
    Outputs: Array<IMaterial>;
    BuildingRecipeId: string;
    DurationMs: number;
    RecipeName: string;
}

export interface Recipe extends IRecipe {}
export class Recipe {
    InputCosts: any;
    InputCostTotal: number;
    OutputCosts: any;
    OutputCostTotal: number;


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

    updateInputCosts(newCosts: {}) {
        for (const [ticker, price] of Object.entries(newCosts)) {
            this.InputCosts[ticker] = price;
        }

        this.InputCostTotal = Object.values(this.InputCosts).reduce((sum:number, x: number) => sum + x, 0) as number;
    }

    updateOutputCosts(newCosts: {}) {
        for (const [ticker, price] of Object.entries(newCosts)) {
            this.OutputCosts[ticker] = price;
        }

        this.OutputCostTotal = Object.values(this.OutputCosts).reduce((sum:number, x: number) => sum + x, 0) as number;
    }
}