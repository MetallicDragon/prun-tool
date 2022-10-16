<script lang="ts">
    import numberFormatter from '../utils/numbers';
    import type { IMaterial } from '../models/material';

    export let material:IMaterial;
    $: priceFormatted = numberFormatter.formatCurrency(material.Price);
</script>

<div class="material">
    {#if material.Amount}
        <span class="amount">{material.Amount}</span>
    {/if}

    {#if material.Price}
        <span class="price">${priceFormatted}</span>
    {/if}
    
    <span class="ticker">{material.CommodityTicker}</span>
</div>

<style>
    .material {
        font-size: 16px;
        font-weight: bold;
        color: lightgray;
        background: grey;
        display: inline-block;
        position: relative;
        text-align: center;
        width: 48px;
        height: 48px;
        margin: 4px
    }

    .ticker {
        vertical-align: middle;
        line-height: 48px;
    }

    .amount {
        font-size: 8px;
        background: black;
        position: absolute;
        right: 0px;
        bottom: 0px;
        line-height: 0.9;
        padding: 3px 3px 2px 4px;
        border-top-left-radius: 4px
    }

    .price {
        font-size: 10px;
        color: black;
        background: white;
        position: absolute;
        line-height: 0.9;
        padding: 1px 2px 2px 1px;
        top: 0px;
        left: 0px;
        border-bottom-right-radius: 4px
    }
</style>
