<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let title: string
    export let styles = ''
    export let isDisabled = false

    const dispatch = createEventDispatcher();
</script>

<button class={"w-full rounded-lg font-medium text-lg py-2.5 bg-blue-500 text-white " + styles}
    disabled={isDisabled}
    class:opacity-30={isDisabled}
    on:click={() => dispatch('click')}>
    {title}
</button>