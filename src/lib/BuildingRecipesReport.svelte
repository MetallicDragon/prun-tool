<script lang="ts">
    import BuildingComponent from './BuildingComponent.svelte';
    import RainPriceKeys from '../assets/prun_data/rain_price_keys.json';
    import { PriceContext } from '../models/price_context';

    let priceContext = new PriceContext({
        PriceKey: RainPriceKeys[0]
    });

    let validCXTickers = [...new Set(RainPriceKeys.map(k => k.split("-")[0]))];
    let validPriceKeyTypes = [...new Set(RainPriceKeys.map(k => k.split("-")[1]))];

    let promise;
    let buildingFilter;
    let buildingsFiltered = priceContext.BuildingsFiltered;
    let priceKeyCX = 'NC1';
    let priceKeyType = "Average";
    let priceKey = 'NC1-Average';
    
    function clickCompanyInfo() {
        promise = priceContext.getPriceData()
            .then(() => {
                priceContext.calcPrices();
                buildingsFiltered = priceContext.BuildingsFiltered;
            });
    }

$: {
    buildingsFiltered = priceContext.updateBuildingsFiltered(buildingFilter);
    buildingFilter = priceContext.BuildingFilter;
}

$: { 
    priceKey = priceKeyCX + "-" + priceKeyType;
    priceContext.PriceKey = priceKey;
    priceContext.calcPrices();
    buildingsFiltered = priceContext.BuildingsFiltered;
}
</script>


<div>
    
    <label for="price-source-cx">Price Source</label>
    
    <div>
        <select name="price-source-cx" bind:value={ priceKeyCX } style:display="inline-block">
            {#each validCXTickers as CXTicker}
                <option value={CXTicker}>
                    {CXTicker}
                </option>
            {/each}
        </select>

        <select name="price-source-type" bind:value={ priceKeyType } style:display="inline-block">
            {#each validPriceKeyTypes as type}
                <option value={type}>
                    {type}
                </option>
            {/each}
        </select>
    </div>
    
    <div>
        <label for="building-ticker">Building Ticker</label>
        <input name="building-ticker" bind:value={buildingFilter}>
    </div>
</div>

<div>
    {#await promise}
        <p>...waiting</p>
    {:then data}
        {#if priceContext.PriceDataRaw}
            <p>Prices Fetched!</p>
        {:else}
            <button on:click={clickCompanyInfo}>Get Price Data</button>
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
