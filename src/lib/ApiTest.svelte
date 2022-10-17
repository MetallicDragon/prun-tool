<script lang="ts">
    import BuildingComponent from './BuildingComponent.svelte';
    import MaterialComponent from './MaterialComponent.svelte';
    import buildingsRaw from '../assets/prun_data/buildings.json';
    import FIOApi from '../services/fio_api';
    import { Building } from '../models/building';
    import type { IBuilding } from '../models/building';
    import type { ITickerPriceMap } from 'src/models/misc';

    let buildingsRawSorted = buildingsRaw.sort((a,b) => (a.Ticker > b.Ticker) ? 1 : ((b.Ticker > a.Ticker) ? -1 : 0));
    let buildingsRawHavingRecipes = buildingsRawSorted.filter(b => b.Recipes.length > 0);

    let buildings = buildingsRawHavingRecipes.map(b => new Building(b as IBuilding));
    let buildingsFiltered = buildings;

    let promise;
    let priceDataRaw;

    async function getAndProcessPriceData() {
        priceDataRaw = await FIOApi.get('rain/prices');
        let priceMatMapping = {} as ITickerPriceMap;
        for (let p of priceDataRaw) {
            priceMatMapping[p.Ticker] = p["NC1-Average"];
        }

        for (const building of buildings) {
            building.calcCosts(priceMatMapping);
        }

        filterBuildings();

        return priceDataRaw;
    }

    function clickCompanyInfo() {
        promise = getAndProcessPriceData();
    }

    let buildingFilter = "";
    function filterBuildings() {
        if (buildingFilter) {
            buildingFilter = buildingFilter.toUpperCase()
            buildingsFiltered = buildings.filter((b) => b.Ticker.includes(buildingFilter));
        } else {
            buildingsFiltered = buildings;
        }
    }

</script>


<div>
    <label for="building-ticker">Building Ticker:</label>
    <input name="building-ticker" bind:value={buildingFilter} on:input={filterBuildings}>
</div>

<button on:click={clickCompanyInfo}>Get Price Data (NC1 AVG)</button>
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
    <h1>Buildings</h1>
    <p>Showing {buildingsFiltered.length} buildings</p>
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