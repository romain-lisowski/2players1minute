<script>
	import { onMount } from 'svelte'

	let topics = []
  let categories = []
	let error = null

	onMount(async () => {
		const parseJSON = (resp) => (resp.json ? resp.json() : resp);
		const checkStatus = (resp) => {
      if (resp.status >= 200 && resp.status < 300) {
      return resp;
      }
      return parseJSON(resp).then((resp) => {
      throw resp;
      });
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const res = await fetch("http://localhost:1337/topics", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(checkStatus)
        .then(parseJSON);
      topics = res
    } catch (e) {
      error = e	
    }

    try {
      const res = await fetch("http://localhost:1337/categories", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(checkStatus)
        .then(parseJSON);
      categories = res
    } catch (e) {
      error = e	
    }
	});


	export let siteName
	
</script>


<main>	
    <header class="h-full bg-gray-800 border-b-4 border-gray-900 shadow-xl">
        <nav class="px-10 py-6 shadow">

            <div class="flex items-center justify-center">
                <img class="inline-block h-14 -mt-2 mr-2" src="/assets/images/joypads.svg" alt="logo-joypads">
                <span class="inline-block text-4xl text-gray-100 font-extrabold tracking-tighter">{siteName}</span>
            </div>

            <div class="items-center justify-center md:flex">
                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button type="button" class="text-gray-100 hover:text-gray-200 focus:outline-none focus:text-gray-200" aria-label="Toggle menu">
                        <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                            <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                        </svg>
                    </button>
                </div>
            
                <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
                <div class="flex flex-col mt-2 -mx-2 md:mt-4 md:flex-row md:block">
                  {#each categories as category}
                    <span class="px-6 py-2 text-sm hover:font-bold text-gray-100 hover:bg-gray-100 hover:text-gray-900 md:mx-2 rounded-sm cursor-pointer">{category.name}</span>
                  {/each}
                </div>
            </div>
        </nav>
    </header>

    <div class="h-full py-16 bg-gray-200">
      {#if error !== null}
        <span class="text-gray-100">{error}</span>
      {:else}
        <ul>
          {#each topics as topic}
            <li class="max-w-5xl mx-auto mb-16 overflow-hidden bg-white rounded-lg shadow-xl">
              <img class="object-cover object-top w-full h-96 shadow-lg" src="http://localhost:1337{topic.cover.url}" alt="Article">
                
              <div class="w-full h-full p-6 bg-gray-800 border-b-4 border-gray-900">
                <p class="text-left text-5xl font-extrabold text-gray-100 cursor-pointer">{topic.name}</p>

                <div class="flex items-center justify-between my-3">
                  <ul class="flex gap-2">
                    {#each topic.categories as category}
                      <li class="px-6 py-1 text-xs font-extrabold bg-gray-100 text-gray-800 border-2 border-gray-100 shadow-md uppercase rounded-sm">{category.name}</li>
                    {/each}
                    {#each topic.subcategories as subcategory}
                      <li class="px-6 py-1 text-xs text-gray-100 border-2 border-gray-100 shadow-md uppercase rounded-sm">{subcategory.name}</li>
                    {/each}
                  </ul>

                  <p class="text-gray-100">{topic.published_at}</p>
                </div>
              </div>

              <div class="p-6">
                <div class="flex gap-6 items-start justify-between">
                  {#each topic.tests as test}
                    <div class="w-3/4">
                      
                      <div class="flex items-center mb-3 pb-3 border-b-2 border-gray-900">
                        <div class="flex items-center justify-between w-full">
                          <div class="flex items-center">
                            <div class="flex items-center">
                              <img class="object-cover h-12 rounded-full" src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60" alt="Avatar">
                              <span class="mx-2 text-lg font-semibold text-gray-900">Rom</span>
                            </div>
                          </div>
                          <span class="text-right text-xl px-6 py-3 text-gray-100 bg-gray-800 rounded-sm shadow-md">
                            <span class="font-bold text-xl">{test.rating}</span><span class="text-xs">/10</span>
                        </div>
                      </div>

                      <p class="mt-2 text-gray-800 text-justify">{test.content}</p>
                      
                    </div>
                    
                  {/each}
                </div>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <footer class="h-full p-4 text-xs text-center text-gray-100 bg-gray-800 border-t-4 border-gray-800 shadow-xl">
      Copyright - {siteName} - 2021
    </footer>


</main>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>