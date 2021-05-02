<script>
  import { query } from 'svelte-apollo'
  import { GET_CATEGORIES } from './queries/GET_CATEGORIES'
  import { Link } from 'svelte-routing'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faHome, faGamepad, faFilm, faTv } from '@fortawesome/free-solid-svg-icons'

  export let siteName
  export let baseLine  

  const queryCategories = query(GET_CATEGORIES)

  function getProps({ href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent
    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: 'active md:mx-2 px-4 py-3 hover:font-bold text-gray-800 bg-gray-100 rounded-sm hover:shadow-lg transform duration-500' }
    } 
    return { class: 'md:mx-2 px-4 py-3 hover:font-bold text-gray-100 hover:bg-gray-100 hover:text-gray-900 rounded-sm hover:shadow-lg transform duration-500 cursor-pointer' }
  }
</script>

<header class="h-full bg-gray-800 border-b-2 border-gray-500 shadow-xl">
    <nav class="px-10 py-6 shadow">

      <Link to={'/'}>
        <div class="flex items-center justify-center">
          <img class="inline-block h-20  mr-2" src="/assets/images/gamepads.svg" alt="icon-gamepads">
          <span>
            <span class="inline-block text-6xl text-gray-100 font-extrabold tracking-tighter">{siteName}</span>
            <span class="block text-center text-xl text-gray-100 tracking-wide">{baseLine}</span>
          </span>
        </div>
      </Link>

      <div class="items-center justify-center md:flex">
        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button type="button" class="text-gray-100 hover:text-gray-200 focus:outline-none focus:text-gray-200">
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
            </svg>
          </button>
        </div>
        
        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        {#if $queryCategories.loading}
         Loading...
        {:else}
          <div class="flex flex-col mt-2 -mx-2 md:mt-8 md:flex-row md:block">
            {#each $queryCategories.data.categories as category}
              {#if category.icon_name === 'faHome'}
                <Link to={'/'} getProps="{getProps}">
                  <Fa icon={faHome} size="lg" class="inline mr-1" />
                  {category.name}
                </Link>
              {:else }
                <Link to={'/' + category.id + '/' + category.name.toLowerCase()} getProps="{getProps}">
                  {#if category.icon_name === 'faGamepad' }
                    <Fa icon={faGamepad} size="lg" class="inline mr-1" />
                  {:else if category.icon_name === 'faFilm' }
                    <Fa icon={faFilm} size="lg" class="inline mr-1" />
                  {:else if category.icon_name === 'faTv' }
                    <Fa icon={faTv} size="lg" class="inline mr-1" />
                  {/if}
                  {category.name}
                </Link>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    </nav>
</header>