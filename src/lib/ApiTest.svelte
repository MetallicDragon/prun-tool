<script lang="ts">
    import BuildingComponent from './BuildingComponent.svelte';
    import MaterialComponent from './MaterialComponent.svelte';
    import buildingsRaw from '../assets/prun_data/buildings.json';
    import FIOApi from '../services/fio_api';
    import { Building } from '../models/building';
    import type { IBuilding } from '../models/building';

    let buildingsRawSorted = buildingsRaw.sort((a,b) => (a.Ticker > b.Ticker) ? 1 : ((b.Ticker > a.Ticker) ? -1 : 0));
    let buildingsRawHavingRecipes = buildingsRawSorted.filter(b => b.Recipes.length > 0);

    let buildings = buildingsRawHavingRecipes.map(b => new Building(b as IBuilding))
    let buildingsFiltered = buildings;

    let promise;
    let priceDataRaw;

    async function getAndProcessPriceData() {
        priceDataRaw = await FIOApi.get('rain/prices');
        let priceMatMapping = {};
        for (let p of priceDataRaw) {
            priceMatMapping[p.Ticker] = p["NC1-Average"];
        }

        for (const building of buildings) {
            for (const recipe of building.Recipes) {
                let recipeInputCosts = {};
                let recipeOutputCosts = {};

                for (let inputMat of recipe.Inputs) {
                    recipeInputCosts[inputMat.CommodityTicker] = priceMatMapping[inputMat.CommodityTicker];
                }

                for (let outputMat of recipe.Outputs) {
                    recipeOutputCosts[outputMat.CommodityTicker] = priceMatMapping[outputMat.CommodityTicker];
                }

                recipe.updateInputCosts(recipeInputCosts);
                recipe.updateOutputCosts(recipeOutputCosts);
                recipe.calcProfits();
            }
        }

        filterBuildings(); //Force update

        return priceDataRaw;
    }

    function clickCompanyInfo() {
        promise = getAndProcessPriceData();
    }

    let buildingFilter = "";
    function filterBuildings() {
        if (buildingFilter) {
            buildingsFiltered = buildings.filter((b) => b.Ticker.includes(buildingFilter));
        } else {
            buildingsFiltered = buildings;
        }
    }

</script>

<button on:click={clickCompanyInfo}>Get Price Data</button>

<input bind:value={buildingFilter} on:change={filterBuildings} on:input={() => buildingFilter = buildingFilter.toUpperCase()}>

<div>
    {#await promise}
        <p>...waiting</p>
    {:then data}
        {#if data}
            <p>Prices Fetched!</p>
        {:else}
            <p>Press The Button!</p>
        {/if}
    {/await}
    </div>

<div>
    <h1>Buildings Test</h1>
    
    {#each buildingsFiltered as building (building.BuildingId)}
    <div class="building-container">
        <BuildingComponent {building}/>
    </div>
    {/each}
</div>

<style>
    .building-container {
        padding: 1rem 1rem;
        margin: 1rem;
        border-radius: 1rem;
        background-color: var(--background);
        width: auto;
    }
</style>