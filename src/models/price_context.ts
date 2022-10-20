import type { ITickerPriceMap } from "./misc_types";
import type RainPriceKeys from '../assets/prun_data/rain_price_keys.json';
import FIOApi from "../services/fio_api";
import { Building, type IBuilding } from "./building";
import buildingsRaw from '../assets/prun_data/buildings.json';

export type IRainPriceKey = typeof RainPriceKeys[number];

export class PriceContext {
    Buildings: Array<Building>;
    BuildingsFiltered: Array<Building>;
    PriceKey: IRainPriceKey;
    Prices: ITickerPriceMap;
    BuildingFilter: string;
    PriceDataRaw: any;

    constructor(params: { PriceKey: string}) {
        const buildingsRawSorted = buildingsRaw.sort((a,b) => (a.Ticker > b.Ticker) ? 1 : ((b.Ticker > a.Ticker) ? -1 : 0));
        const buildingsRawHavingRecipes = buildingsRawSorted.filter(b => b.Recipes.length > 0);
        this.Buildings = buildingsRawHavingRecipes.map(b => new Building(b as IBuilding))
        this.PriceKey = params.PriceKey;
        this.BuildingsFiltered = this.Buildings;
        this.BuildingFilter = "";
    }

    async getPriceData() {
        this.PriceDataRaw = await FIOApi.get('rain/prices');
        
        return this.PriceDataRaw;
    }

    updateBuildingsFiltered(buildingFilter: string) {
        this.BuildingFilter = buildingFilter;
        if (this.BuildingFilter) {
            this.BuildingFilter = this.BuildingFilter.toUpperCase()
            this.BuildingsFiltered = this.Buildings.filter((b) => b.Ticker.includes(this.BuildingFilter));
        } else {
            this.BuildingsFiltered = this.Buildings;
        }

        return this.BuildingsFiltered;
    }

    calcPrices() {
        if (!this.PriceDataRaw) {
            return false;
        }
        console.log("Prices Calced: " + this.PriceKey);
        let priceMatMapping = {} as ITickerPriceMap;
        for (let p of this.PriceDataRaw) {
            priceMatMapping[p.Ticker] = p[this.PriceKey];
        }

        for (const building of this.Buildings) {
            building.calcCosts(priceMatMapping);
        }
    }
}