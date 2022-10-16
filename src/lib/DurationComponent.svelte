<script lang="ts">
    export let duration:number;
    let durationHours:number;
    let durationMinutes:number;

    $: {
        if (duration) {
            durationHours = Math.floor(duration / 3600000);
            durationMinutes = Math.round((duration / 60000) % 60);
        } else {
            durationHours = null;
            durationMinutes = null;
        }
    }
</script>

<div class="duration">
    <span class="time">
        <span class="time-hours">{durationHours}h</span>
        <span class="time-minutes">{durationMinutes}m</span>
        &nbsp;
    </span>
</div>

<style>
    .duration {
        font-size: 12px;
        font-weight: bold;
        color: lightgray;
        background: black;
        display: inline-block;
        position: relative;
        text-align: center;
        width: 48px;
        height: 48px;
        margin: 4px
    }

    .time {
        vertical-align: middle;
        line-height: 50px;
    }

    .time-hours {
        position: absolute;
        text-align: center;
        top: -8px;
        left: 12px;
    }

    .time-minutes {
        position: absolute;
        bottom: -8px;
        left: 12px;
    }
</style>