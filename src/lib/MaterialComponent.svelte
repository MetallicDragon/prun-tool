<script lang="ts">
    export let ticker:string;
    export let amount:number = null;
    export let price:number = null;
    $: priceFormatted = price ? price.toFixed(2) : null;
</script>

<div class="material">
    {#if amount}
        <span class="amount">{amount}</span>
    {/if}

    {#if priceFormatted}
        <span class="price">${priceFormatted}</span>
    {/if}
    
    <span class="ticker">{ticker}</span>
</div>

<style>
    .material {
        font-size: 16px;
        font-weight: bold;
        color: lightgray;
        background: grey;
        display: inline-block;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
