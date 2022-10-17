<script lang="ts">
    import type { Building } from 'src/models/building';
    import RecipeComponent from './RecipeComponent.svelte';
    import MaterialComponent from './MaterialComponent.svelte';
    import numberFormatter from '../utils/numbers';
    export let building:Building;
</script>

<div style="text-align: right;">
    {building.Name}

    {#each building.BuildingCosts as { CommodityTicker, Amount, Price}}
        <MaterialComponent material={
            {
                CommodityTicker: CommodityTicker, 
                Amount: Amount,
                Price: Price,
            }
        }/>
    {/each}

    ⇨

    <MaterialComponent material={ { CommodityTicker: building.Ticker, Price: building.BuildingCostTotal } }/><br />

    {#if building.WorkforceCostTotal}
        Consumables $/d: {numberFormatter.formatCurrency(building.WorkforceCostTotal)}
    {/if}

    {#each building.Recipes as recipe}
        <RecipeComponent {recipe}/>
    {/each}
</div>