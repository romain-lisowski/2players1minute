<script>
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faHome, faGamepad, faFilm, faHamburger, faHeadphones, faBook, faTv } from '@fortawesome/free-solid-svg-icons'

  let categories = []

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
  export let baseLine
	
</script>

<header class="h-full bg-gray-800 border-b-4 border-gray-500 shadow-xl">
    <nav class="px-10 py-6 shadow">

        <div class="flex items-center justify-center">
          <img class="inline-block h-20  mr-2" src="/assets/images/gamepads.svg" alt="icon-gamepads">
          <span>
            <span class="inline-block text-6xl text-gray-100 font-extrabold tracking-tighter">{siteName}</span>
            <span class="block text-center text-xl text-gray-100 tracking-wide">{baseLine}</span>
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
                {#if category.icon_name === 'faHome' }
                  <span class="md:mx-2 px-4 py-3 hover:font-bold text-gray-800 bg-gray-100 rounded-sm hover:shadow-lg">
                    <Fa icon={faHome} size="lg" class="inline mr-1" />
                    {category.name}
                  </span>
                {:else if ['faHamburger', 'faHeadphones', 'faBook'].includes(category.icon_name)}
                  <span class="md:mx-2 px-4 py-3 text-gray-500 rounded-sm hover:shadow-lg">
                    {#if category.icon_name === 'faHamburger' }
                      <Fa icon={faHamburger} size="lg" class="inline mr-1" />
                    {:else if category.icon_name === 'faHeadphones' }
                      <Fa icon={faHeadphones} size="lg" class="inline mr-1" />
                    {:else if category.icon_name === 'faBook' }
                      <Fa icon={faBook} size="lg" class="inline mr-1" />
                    {/if}
                    {category.name}
                  </span>
                {:else }
                  <span class="md:mx-2 px-4 py-3 hover:font-bold text-gray-100 hover:bg-gray-100 hover:text-gray-900 rounded-sm hover:shadow-lg transform duration-500 cursor-pointer">
                    {#if category.icon_name === 'faGamepad' }
                      <Fa icon={faGamepad} size="lg" class="inline mr-1" />
                    {:else if category.icon_name === 'faFilm' }
                      <Fa icon={faFilm} size="lg" class="inline mr-1" />
                    {:else if category.icon_name === 'faTv' }
                      <Fa icon={faTv} size="lg" class="inline mr-1" />
                    {/if}
                    {category.name}
                  </span>
                {/if}
              {/each}
            </div>
        </div>
    </nav>
</header>