<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let inputVal

    const submitForm = () => {
        if (inputVal) {
            dispatch('submit', inputVal)
            inputVal = ''
        }
    }
</script>

<form class="border-t-2 border-[#5BA2FF] px-[10px] py-[14px] flex justify-center gap-2 items-center" on:submit|preventDefault={submitForm}>
    <input type="text" 
        class="rounded-full border-2 border-[#5BA2FF] flex-1 px-[16px] py-[8px] outline-0" 
        bind:value={inputVal}>
    <button type="submit" 
        class="w-[40px] h-[40px] rounded-full pl-[2px] grid place-items-center text-white" style="background: #5BA2FF;">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.821233 0.5C5.14981 2.66414 9.44822 4.81277 13.8208 6.99975C9.458 9.18101 5.15145 11.3345 0.793501 13.5134V13.1585C0.793501 11.6421 0.798395 10.1256 0.788607 8.60919C0.786976 8.38078 0.845701 8.27718 1.07571 8.20458C2.15969 7.85953 3.23552 7.49 4.31379 7.12863C4.40677 7.09763 4.49812 7.06174 4.67511 6.99648C4.2102 6.83905 3.82359 6.70608 3.43616 6.57638C2.63684 6.30964 1.8367 6.04289 1.03656 5.7786C0.897087 5.73292 0.787792 5.69702 0.789423 5.50125C0.798395 3.88284 0.795132 2.26524 0.795947 0.646831C0.795947 0.616649 0.805736 0.587283 0.821233 0.5Z" fill="currentColor"/>
        </svg>            
    </button>
</form>