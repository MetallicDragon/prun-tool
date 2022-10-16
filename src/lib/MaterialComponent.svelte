<script lang="ts">
    import numberFormatter from '../utils/numbers';
    import type { IMaterial } from '../models/material';
    import materialCategories from '../assets/prun_data/materialCategories.json';
    import categoryCSSMap from '../assets/prun_data/categoryCSSMap.json';

    export let material:IMaterial;
    $: priceFormatted = numberFormatter.formatCurrency(material.Price);
    
    const category = materialCategories[material.CommodityTicker];
    let categoryCSSClass = "";
    if (category){
        categoryCSSClass = "category-" + categoryCSSMap[category];
    }
</script>

<div class="material {categoryCSSClass}">
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
        color: lightgray;
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
    
    .material.category-agricultural-products {
        background: linear-gradient(135deg, #003800, #0a4708);
        color: #8bb37b;
    }

    .material.category-alloys {
        background: linear-gradient(135deg, rgb(123, 76, 30), rgb(148, 101, 55));
        color: rgb(250, 203, 157);
    }

    .material.category-chemicals {
        background: linear-gradient(135deg, rgb(183, 46, 91), rgb(208, 71, 116));
        color: rgb(255, 173, 218); 
    }

    .material.category-construction-materials {
        background: linear-gradient(135deg, rgb(24, 91, 211), rgb(49, 116, 236));
        color: rgb(151, 218, 255);
    }

    .material.category-construction-parts {
        background: linear-gradient(135deg, rgb(41, 77, 107), rgb(66, 102, 132));
        color: rgb(168, 204, 234);
    }

    .material.category-construction-prefabs {
        background: linear-gradient(135deg, rgb(15, 30, 98), rgb(40, 55, 123));
        color: rgb(142, 157, 225);
    }

    .material.category-consumables-basic {
        background: linear-gradient(135deg, #a62c2a, #ba363c);
        color: #ff989e;
    }

    .material.category-consumables-luxury {
        background: linear-gradient(135deg, #680000, #7b0012);
        color: #db9191;
    }

    .material.category-drones {
        background: linear-gradient(135deg, rgb(140, 52, 18), rgb(165, 77, 43));
        color: rgb(255, 179, 145);
    }

    .material.category-electronic-devices {
        background: linear-gradient(135deg, rgb(86, 20, 147), rgb(111, 45, 172));
        color: rgb(213, 147, 255);
    }

    .material.category-electronic-parts {
        background: linear-gradient(135deg, rgb(91, 46, 183), rgb(116, 71, 208));
        color: rgb(218, 173, 255);
    }

    .material.category-electronic-pieces {
        background: linear-gradient(135deg, rgb(119, 82, 189), rgb(144, 107, 214));
        color: rgb(246, 209, 255);
    }

    .material.category-electronic-systems {
        background: linear-gradient(135deg, rgb(51, 26, 76), rgb(76, 51, 101));
        color: rgb(178, 153, 203);
    }

    .material.category-elements {
        background: linear-gradient(135deg, rgb(61, 46, 32), rgb(86, 71, 57));
        color: rgb(188, 173, 159);
    }

    .material.category-energy-systems {
        background: linear-gradient(135deg, rgb(21, 62, 39), rgb(46, 87, 64));
        color: rgb(148, 189, 166);
    }

    .material.category-fuels {
        background: linear-gradient(135deg, #548d22, #6ba23c);
        color: #cbfaa3;
    }

    .material.category-gases {
        background: linear-gradient(135deg, rgb(0, 105, 107), rgb(25, 130, 132));
        color: rgb(127, 232, 234);
    }

    .material.category-liquids {
        background: linear-gradient(135deg, #67a8da, #6098c3);
        color: #f1ffff;
    }

    .material.category-medical-equipment {
        background: linear-gradient(135deg, rgb(85, 170, 85), rgb(110, 195, 110));
        color: rgb(212, 255, 212);
    }

    .material.category-metals {
        background: linear-gradient(135deg, rgb(54, 54, 54), rgb(79, 79, 79));
        color: rgb(181, 181, 181);
    }

    .material.category-minerals {
        background: linear-gradient(135deg, rgb(153, 113, 73), rgb(178, 138, 98));
        color: rgb(255, 240, 200);
    }

    .material.category-ores {
        background: linear-gradient(135deg, rgb(82, 87, 97), rgb(107, 112, 122));
        color: rgb(209, 214, 224);
    }

    .material.category-plastics {
        background: linear-gradient(135deg, #791f62, #92387b);
        color: #f89ee1;
    }

    .material.category-ship-engines {
        background: linear-gradient(135deg, rgb(153, 41, 0), rgb(178, 66, 25));
        color: rgb(255, 168, 127);
    }

    .material.category-ship-kits {
        background: linear-gradient(135deg, rgb(153, 84, 0), rgb(178, 109, 25));
        color: rgb(255, 211, 127);
    }

    .material.category-ship-parts {
        background: linear-gradient(135deg, rgb(153, 99, 0), rgb(178, 124, 25));
        color: rgb(255, 226, 127);
    }

    .material.category-ship-shields {
        background: linear-gradient(135deg, rgb(224, 131, 0), rgb(249, 156, 25));
        color: rgb(255, 255, 127);
    }

    .material.category-software-components {
        background: linear-gradient(135deg, rgb(136, 121, 47), rgb(161, 146, 72));
        color: rgb(255, 248, 174);
    }

    .material.category-software-systems {
        background: linear-gradient(135deg, rgb(60, 53, 5), rgb(85, 78, 30));
        color: rgb(187, 180, 132);
    }

    .material.category-software-tools {
        background: linear-gradient(135deg, rgb(129, 98, 19), rgb(154, 123, 44));
        color: rgb(255, 225, 146);
    }

    .material.category-textiles {
        background: linear-gradient(135deg, rgb(82, 90, 33), rgb(107, 115, 58));
        color: rgb(209, 217, 160);
    }

    .material.category-unit-prefabs {
        background: linear-gradient(135deg, rgb(29, 27, 28), rgb(54, 52, 53));
        color: rgb(156, 154, 155);
    }

    .material.category-utility {
        background: linear-gradient(135deg, rgb(161, 148, 136), rgb(186, 173, 161));
        color: rgb(255, 255, 255);
    }

</style>
