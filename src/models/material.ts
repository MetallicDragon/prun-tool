export interface IMaterial {
    CommodityName?: string;
    CommodityTicker: string;
    Weight?: number;
    Volume?: number;
    Amount?: number;
    Price?: number;
}

export interface Material extends IMaterial {}
export class Material {

}