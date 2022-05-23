<script>
    import { tick } from "svelte";


    export let messages = []

    let container

    const scrollToBottom = async () => {
        if (container) {
            await tick()
            container.scrollTop = container.scrollHeight
        }
    }

    $: {
        if (messages)
            scrollToBottom()
    }
</script>

<div class="px-[10px] py-[25px] overflow-y-auto h-full scroll-smooth" bind:this={container}>
    {#each messages as { message, isUser }}
        <div class="flex justify-between gap-1.5 mb-[10px] last:mb-0">
            {#if !isUser}
                <div class="h-[30px] w-[30px] overflow-hidden rounded-full bg-[#D2E0F1] shrink-0" />
            {/if}
            <p class="px-[12px] py-[10px] bg-[#E8E8E8] rounded-lg rounded-tl-none text-sm" class:user-message={isUser}>
                {message}
            </p>
        </div>   
    {/each}
</div>

<style>
    .user-message {
        @apply ml-auto rounded-lg rounded-tr-none bg-[#C9E1FF];
    }
</style>
