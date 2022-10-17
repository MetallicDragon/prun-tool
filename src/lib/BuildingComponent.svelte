<script lang="ts">
    import type { Building } from 'src/models/building';
    import RecipeComponent from './RecipeComponent.svelte';
    import MaterialComponent from './MaterialComponent.svelte';
    export let building:Building;
</script>

<div style="text-align: right;">
    {building.Name}

    {#each building.BuildingCosts as { CommodityTicker, Amount}}
        <MaterialComponent material={
            {
                CommodityTicker: CommodityTicker, 
                Amount: Amount,
                Price: building.InputCosts[CommodityTicker],
            }
        }/>
    {/each}

    ⇨

    <MaterialComponent material={ { CommodityTicker: building.Ticker, Price: building.InputCostTotal } }/><br />

    {#each building.Recipes as recipe}
        <RecipeComponent {recipe}/>
    {/each}
</div>