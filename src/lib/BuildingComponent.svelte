<script lang="ts">
    import type { Building } from 'src/models/building';
    import RecipeComponent from './RecipeComponent.svelte';
    export let building:Building;
</script>

{building.Ticker} - {building.Name}<br />

{#each building.Recipes as recipe}
    <RecipeComponent {recipe} showDetails={true}/>
{/each}