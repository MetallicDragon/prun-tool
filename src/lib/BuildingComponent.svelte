<script lang="ts">
    import type { Building } from 'src/models/building';
    import RecipeComponent from './RecipeComponent.svelte';
    import MaterialComponent from './MaterialComponent.svelte';
    export let building:Building;
</script>

<div style="text-align: right;">
    {building.Name} - <MaterialComponent material={ { CommodityTicker: building.Ticker } }/><br />

    {#each building.Recipes as recipe}
        <RecipeComponent {recipe}/>
    {/each}
</div>