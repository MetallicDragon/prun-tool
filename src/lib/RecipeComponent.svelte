<script lang="ts">
    import type { Recipe } from 'src/models/recipe';
    import DurationComponent from './DurationComponent.svelte';
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
            <MaterialComponent material={
                {
                    CommodityTicker: CommodityTicker, 
                    Amount: Amount,
                    Price: recipe.InputCosts[CommodityTicker],
                }
            }/>
        {/each}

        ⇨

        {#each recipe.Outputs as { CommodityTicker, Amount}}
            <MaterialComponent material={
                {
                    CommodityTicker: CommodityTicker, 
                    Amount: Amount,
                    Price: recipe.OutputCosts[CommodityTicker],
                }
            }/>
        {/each}

        {#if recipe.DurationMs}
            <DurationComponent duration={recipe.DurationMs}/>
        {/if}
    </div>
</div>
