<script lang="ts">
    import numberFormatter from '../utils/numbers';
    import type { Recipe } from 'src/models/recipe';
    import DurationComponent from './DurationComponent.svelte';
    import MaterialComponent from './MaterialComponent.svelte';
    export let recipe:Recipe;
</script>

<div>
    <div>
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

        {#if recipe.Profit}
            <strong>${numberFormatter.formatCurrency(recipe.ProfitPerDay)}</strong>/d 
        {/if}

        {#if recipe.PaybackPeriod}
            PP: <strong>{recipe.PaybackPeriod > 0 ? recipe.PaybackPeriod.toFixed(1) : "inf"}</strong> days
        {/if}
    </div>
</div>
