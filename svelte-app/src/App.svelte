<script>
  import { EasyrouteProvider, RouterOutlet } from 'svelte-easyroute'
  import { router } from './router.js'
  import Header from './Header.svelte'
  
	export let siteName
  export let baseLine
</script>

<EasyrouteProvider {router}>
  <Header siteName="{siteName}" baseLine="{baseLine}"/>
  <main>	
    <div class="h-full p-16">
      <RouterOutlet />
    </div>

    <footer class="h-full p-4 text-xs text-center text-gray-100 bg-gray-800 border-t-4 border-gray-800 shadow-xl">
      Copyright - {siteName} - 2021
    </footer>
  </main>
</EasyrouteProvider>

