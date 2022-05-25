<script lang="ts">
	import ChatMessages from './lib/components/ChatMessages.svelte'
	import ChatInput from './lib/components/ChatInput.svelte'
	
	import BotResMsg from './lib/config/BotResMsg'

	import dayjs from './lib/config/dayjs'

	import { onMount } from 'svelte';

	import type { Block, Messages } from './lib/types/messages'

	let isChatOpen = false

	let messages: Messages[] = []

	let botLoading = false

	let isChooseTime = false

	let convStatus = '/menu'

	let submitInfo = {
		first_name: '',
		last_name: '',
		start_time: new Date(),
		invitees: [
			{
				email: ''
			}
		]
	}

	const submitInpt = (val: string) => {

		//remove last commands menus
		messages[messages.length - 1].blocks = messages[messages.length - 1].blocks.filter(el => el.commands = [])

		messages = [	
			...messages, 
			{ 
				blocks: [{ message: val }],
				isUser: true }
		]		

		
		if (val[0] === '/') {
			convStatus = val
			return botResCommdands()
		}

		switch (convStatus) {
			case ('/create-meeting'):
			case ('/create-meeting:error'):
				const isEmail = /\S+@\S+\.\S+/;
				if (isEmail.test(val)) {
					convStatus = '/create-meeting:name'
					submitInfo.invitees[0].email = val
				}
				else 
					convStatus = '/create-meeting:error'
				botResCommdands()
				break
			case ('/create-meeting:name'): 
			case ('/create-meeting:name:error'): 
				const [ first, last ] = val.split(' ')

				if (first && last) {
					convStatus = '/create-meeting:time'
					submitInfo.first_name = first
					submitInfo.last_name = last
				}
				else	
					convStatus = '/create-meeting:name:error'
				botResCommdands()
				break
			default:
				botResMessages(val)
				break
		}
	}

	const botResMessages = (val: string) => {
		botLoading = true

		setTimeout(() => {
			messages = [
			...messages, 
				{ 
					blocks: [{
						message: 'Bot repeat: ' + val
					}]
				}
			]
			botLoading = false
		}, 250)	
	}

	const botResCommdands = (blocks?: Block[]) => {
		botLoading = true

		setTimeout(() => {
			messages = [
			...messages, 
				{ 
					blocks: BotResMsg(convStatus, blocks)
				}
			]
			if (convStatus === '/create-meeting:time')
				isChooseTime = true
			botLoading = false
		}, 250)
	}

	onMount(() => {
		window.RUNDAY_IO_USER_ID = 'test'
		console.log(window.RUNDAY_IO_USER_ID)
		botResCommdands()
	})

	const submitCreateMeeting = () => {
		convStatus = '/create-meeting:success'
		botResCommdands([{
			message: `<strong>MEETING CREATED!🎉</strong><br>
				Email: ${submitInfo.invitees[0].email}<br>
				Name: ${submitInfo.first_name + ' ' + submitInfo.last_name}<br>
				Time: ${dayjs(submitInfo.start_time).format('dddd, MMMM D hA')}`,
			button: {
				title: 'Copy Meeting Link',
				callback: () => console.log('copy meet')
			}
		}])
	}
</script>

<aside class="fixed right-0 bottom-0 top-0 sm:top-[20vh]">
	{#if !isChatOpen}
		<button class="w-[60px] h-[60px] rounded-full bg-[#5BA2FF] absolute right-[20px] bottom-[20px] text-white grid place-items-center p-3" 
			on:click={() => isChatOpen = true}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
			</svg>
		</button>
		{:else}
		<section class="h-full sm:max-w-[450px] float-right sm:rounded-tl-lg rounded-none overflow-hidden flex flex-col bg-white drop-shadow-2xl">
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

			<ChatMessages {messages} isLoading={botLoading} {isChooseTime}
				on:command-clicked={(e) => submitInpt(e.detail)}
				on:submit-time={({detail}) => {
					submitInfo.start_time = detail.utc().toDate()
					isChooseTime = false
					submitCreateMeeting()
				}}/>

			<ChatInput isLoading={botLoading} 
				on:submit={(e) => submitInpt(e.detail)}/>
		</section>
	{/if}
</aside>

<style global>
	@tailwind utilities;
	@tailwind components;
	@tailwind base;
</style>