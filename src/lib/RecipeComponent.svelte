<script lang="ts">
    import type { Recipe } from 'src/models/recipe';
    import MaterialComponent from './MaterialComponent.svelte';
    export let recipe:Recipe;
</script>

<style>
    .indent {
        margin-left: 2rem;
    }
</style>

<div class="indent">
    <div class="indent">
        {#each recipe.Inputs as { CommodityTicker, Amount}}
            <MaterialComponent ticker={CommodityTicker} amount={Amount} price={recipe.InputCosts[CommodityTicker]}/>
        {/each}

        ⇨

        {#each recipe.Outputs as { CommodityTicker, Amount}}
            <MaterialComponent ticker={CommodityTicker} amount={Amount} price={recipe.OutputCosts[CommodityTicker]}/>
        {/each}
    </div>
</div>
