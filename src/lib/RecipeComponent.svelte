<script lang="ts">
    import type { Recipe } from 'src/models/recipe';
    export let recipe:Recipe;
    export let showDetails = false;
</script>

<style>
    .indent {
        margin-left: 2rem;
    }
</style>

<div class="indent">
    {recipe.RecipeName}

    {#if showDetails}
        <div class="indent">
            Inputs:
            {#each recipe.Inputs as { CommodityTicker, Amount}}
                <div class="indent">
                    <span>{Amount} {CommodityTicker}{recipe.InputCosts[CommodityTicker] ? " @ " + recipe.InputCosts[CommodityTicker] + " NCC " : ""}</span>
                </div>
            {/each}
        </div>

        <div class="indent">
            Outputs:
            {#each recipe.Outputs as { CommodityTicker, Amount}}
                <div class="indent">
                    <span>{Amount} {CommodityTicker}{recipe.OutputCosts[CommodityTicker] ? " @ " + recipe.OutputCosts[CommodityTicker] + " NCC " : ""}</span>
                </div>
            {/each}
        </div>
    {/if}
</div>
