<script>
	import { onMount } from 'svelte'
  import marked from 'marked'
  import dayjs from 'dayjs'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faHome } from '@fortawesome/free-solid-svg-icons'
  import { faGamepad } from '@fortawesome/free-solid-svg-icons'
  import { faFilm } from '@fortawesome/free-solid-svg-icons'
  import { faHamburger } from '@fortawesome/free-solid-svg-icons'
  import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
  import { faBook } from '@fortawesome/free-solid-svg-icons'

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
      topics.forEach((topic, index) => {
        topic.published_at = dayjs(topic.published_at).format('DD/MM/YYYY à HH[h]mm')
      })
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
      categories.sort((a, b) => (a.order > b.order) ? 1 : -1)

    } catch (e) {
      error = e	
    }
	});


	export let siteName
  export let baseline
	
</script>


<main>	
    <header class="h-full bg-gray-800 border-b-4 border-gray-900 shadow-xl">
        <nav class="px-10 py-6 shadow">

            <div class="flex items-center justify-center">
              <img class="inline-block h-20  mr-2" src="/assets/images/gamepads.svg" alt="icon-gamepads">
              <span>
                <span class="inline-block text-6xl text-gray-100 font-extrabold tracking-tighter">{siteName}</span>
                <span class="block text-center text-xl text-gray-100 tracking-wide">{baseline}</span>
              </span>
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
                <div class="flex flex-col mt-2 -mx-2 md:mt-8 md:flex-row md:block">
                  {#each categories as category}
                    {#if category.iconName === 'faHome' }
                      <span class="md:mx-2 px-4 py-3 hover:font-bold text-gray-800 bg-gray-100 rounded-sm hover:shadow-lg">
                        <Fa icon={faHome} size="lg" class="inline mr-1" />
                        {category.name}
                      </span>
                    {:else if ['faHamburger', 'faHeadphones', 'faBook'].includes(category.iconName)}
                      <span class="md:mx-2 px-4 py-3 text-gray-500 rounded-sm hover:shadow-lg">
                        {#if category.iconName === 'faHamburger' }
                          <Fa icon={faHamburger} size="lg" class="inline mr-1" />
                        {:else if category.iconName === 'faHeadphones' }
                          <Fa icon={faHeadphones} size="lg" class="inline mr-1" />
                        {:else if category.iconName === 'faBook' }
                          <Fa icon={faBook} size="lg" class="inline mr-1" />
                        {/if}
                        {category.name}
                      </span>
                    {:else }
                      <span class="md:mx-2 px-4 py-3 hover:font-bold text-gray-100 hover:bg-gray-100 hover:text-gray-900 rounded-sm hover:shadow-lg transform duration-500 cursor-pointer">
                        {#if category.iconName === 'faGamepad' }
                          <Fa icon={faGamepad} size="lg" class="inline mr-1" />
                        {:else if category.iconName === 'faFilm' }
                          <Fa icon={faFilm} size="lg" class="inline mr-1" />
                        {/if}
                        {category.name}
                      </span>
                    {/if}
                  {/each}
                </div>
            </div>
        </nav>
    </header>

    <div class="h-full p-16">
      <ul class="flex flex-wrap gap-6 mb-16">

        {#each topics as topic}
          <li class="w-1/3 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform duration-300 cursor-pointer">
            <img class="w-full h-64 object-cover object-top" src="http://localhost:1337{topic.cover.url}" alt="Article">
              
            <div class="mt-4">

              <div class="flex items-center justify-end -mt-16 mb-5 px-2">
                <span>
                  {#each topic.tests as test}
                  <span class="mr-2 px-3 py-2 text-xl text-right bg-white text-gray-800 rounded-sm shadow-lg">
                    <span class="font-bold text-xl">{test.rating}</span><span class="text-xs">/10</span>
                  </span>
                  {/each}
                </span>
              </div>
              
              <div class="flex items-center justify-left gap-3 bg-gray-800">
                <span class="ml-6 text-xl font-extrabold text-gray-100 uppercase rounded-sm shadow-lg">
                  <Fa icon={faGamepad} size="lg" />
                </span>
                <p class="py-4 text-center text-xl font-extrabold text-gray-100 cursor-pointer">{topic.name}</p>
              </div>
              
            </div>

          </li>
        {/each}
      </ul>

      <ul>
        {#each topics as topic}
          <li class="max-w-5xl mb-16 overflow-hidden bg-white rounded-lg shadow-xl">
            <img class="object-cover object-top w-full h-96 shadow-lg" src="http://localhost:1337{topic.cover.url}" alt="Article">
              
            <div class="p-6 bg-gray-800 border-b-4 border-gray-900">
              <p class="text-left text-5xl font-extrabold text-gray-100 cursor-pointer">{topic.name}</p>

              <div class="flex items-end justify-between mt-3">
                <ul class="flex gap-2">
                  <li class="px-6 py-2 text-sm font-extrabold bg-gray-100 text-gray-800 border-2 border-gray-100 shadow-md uppercase rounded-sm">
                    <Fa icon={faGamepad} size="lg" class="inline mr-1" />
                    {topic.category.name}
                  </li>
                  {#each topic.subcategories as subcategory}
                    <li class="px-6 py-2 text-sm text-gray-100 border-2 border-gray-100 shadow-md uppercase rounded-sm">{subcategory.name}</li>
                  {/each}
                </ul>

                <p class="text-gray-100">Publié le : {topic.published_at}</p>
              </div>
            </div>

            <div class="p-6">
              <div class="flex gap-6 items-start justify-between">
                {#each topic.tests as test}
                  <div class="w-3/4">  
                    <div class="flex items-center mb-3 pb-3 border-b-2 border-gray-900">
                      <div class="flex items-center justify-between w-full">
                        <div class="flex items-center">
                          <img class="object-cover h-12 rounded-full" src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60" alt="Avatar">
                          <span class="mx-2 text-lg font-semibold text-gray-800">Rom</span>
                        </div>
                        <span class="text-right text-xl px-6 py-3 text-gray-100 bg-gray-800 rounded-sm shadow-md">
                          <span class="font-bold text-2xl">{test.rating}</span><span class="text-sm">/10</span>
                        </span>
                      </div>
                    </div>
                    <p class="mt-2 text-lg text-gray-800 font-bold">{test.title}</p>
                    <p class="mt-2 text-gray-800 text-justify">{@html marked(test.content)}</p>
                  </div>
                {/each}
              </div>
            </div>

          </li>
        {/each}
      </ul>
    </div>

    <footer class="h-full p-4 text-xs text-center text-gray-100 bg-gray-800 border-t-4 border-gray-800 shadow-xl">
      Copyright - {siteName} - 2021
    </footer>


</main>
