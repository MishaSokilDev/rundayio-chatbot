<script>
	// @ts-nocheck
  	import TailwindCss from './lib/components/TailwindCSS.svelte';
	import ChatMessages from './lib/components/ChatMessages.svelte'
	import ChatInput from './lib/components/ChatInput.svelte'

	let isChatOpen = false

	let messages = [{
		blocks: [
			{
				message: '👋 Hey there, nice to meet you! I’m Sunny and I’d like to welcome you  to [business name]. Let me know if you have any questions or need help with anything and I’ll be happy to help!'
			}, {
				commands: ['create meet'],
			}
		]
	}]

	let botLoading = false

	const submitInpt = (val) => {

		//remove last commands menus
		messages[messages.length - 1].blocks = messages[messages.length - 1].blocks.filter(el => el.commands = [])

		messages = [	
			...messages, 
			{ 
				blocks: [{ message: val }],
				isUser: true }
		]

		botRes()
	}

	const botRes = () => {
		botLoading = true

		setTimeout(() => {
			messages = [
			...messages, 
				{ 
					blocks: [{ message: 'test' }]
				}
			]

			botLoading = false
		}, 1000)
	}
</script>

<TailwindCss />

<main class="fixed right-0 bottom-0">
	{#if !isChatOpen}
		<button class="w-[60px] h-[60px] rounded-full bg-[#5BA2FF] absolute right-[20px] bottom-[20px] text-white grid place-items-center p-3" 
			on:click={() => isChatOpen = true}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
			</svg>
		</button>
		{:else}
		<section class="h-[80vh] max-h-[600px] max-w-[400px] w-[95vw] rounded-tl-lg overflow-hidden flex flex-col bg-white drop-shadow-2xl">
			<div class="px-[20px] py-[16px] bg-[#5BA2FF] flex justify-center items-center gap-4">
				<h2 class="text-white text-lg font-bold">
					Runday Chat	
				</h2>
				<button style="margin-left: auto;" class="h-[20px] w-[20px] text-white">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
					</svg>
				</button>
				<button on:click={() => isChatOpen = false} class="h-[20px] w-[20px] text-white">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<ChatMessages {messages} isLoading={botLoading} 
				on:btn-clicked={(e) => submitInpt(e.detail)}/>

			<ChatInput isLoading={botLoading} 
				on:submit={(e) => submitInpt(e.detail)}/>
		</section>
	{/if}
</main>