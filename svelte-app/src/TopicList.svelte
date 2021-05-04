<script>
  import { Link } from 'svelte-routing'
  import { query } from 'svelte-apollo'
  import { GET_TOPICS } from './queries/GET_TOPICS'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faGamepad, faFilm, faTv } from '@fortawesome/free-solid-svg-icons'

  // eslint-disable-next-line no-undef
  const apiUrl = API_URL
  export let categoryId = null
  const queryVariables = categoryId ? { variables: { id: categoryId } } : {}
  const queryTopics = query(GET_TOPICS, queryVariables)
</script>

{#if $queryTopics.loading}
  <div class="h-screen"></div>
{:else}
  <ul class="grid sm:grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-10 sm:mb-12 md:mb-16">
    {#each $queryTopics.data.topics as topic}
      <li class="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform duration-300 cursor-pointer">
        <Link to={'/' + topic.category.id + '/' + topic.category.name.toLowerCase() + '/' + topic.id + '/' + topic.slug}>
          
          <img class="w-full h-48 sm:h-52 md:h-64 object-cover object-top" src="{apiUrl + topic.cover.url}" alt="Article">
          <span class="absolute top-4 right-4">
            <span class="flex items-center justify-end gap-2">
              {#each topic.tests as test}
              <span class="flex items-center justify-center w-14 h-10 text-xs sm:text-sm md:text-xl text-center bg-gray-100 text-gray-800 rounded-sm shadow-lg">
                <span class="font-bold text-xl">{test.rating}</span><span class="text-xs">/10</span>
              </span>
              {/each}
            </span>
          </span>
          <span class="absolute bottom-16 md:bottom-20 left-2">
            <ul class="flex justify-end gap-2 pl-3">
              {#each topic.platforms as platform}
                <li class="px-2 py-1 lg:px-3 lg:py-2 text-xs sm:text-sm text-gray-100 align-middle rounded-sm shadow-lg {platform.classes}">{platform.name}</li>
              {/each}
            </ul>  
          </span>
            
          <div class="flex items-center justify-left gap-3 bg-gray-800">
            <span class="ml-6 text-base sm:text-lg md:text-xl font-extrabold text-gray-100 uppercase rounded-sm shadow-lg">
              {#if topic.category.icon_name === 'faGamepad' }
                <Fa icon={faGamepad} size="lg" />
              {:else if topic.category.icon_name === 'faFilm' }
                <Fa icon={faFilm} size="lg" />
              {:else if topic.category.icon_name === 'faTv' }
                <Fa icon={faTv} size="lg" />
              {/if}
            </span>
            <p class="py-3 sm:py-4 text-center text-xl font-extrabold text-gray-100 cursor-pointer">{topic.name}</p>
          </div>

        </Link>
      </li>
    {/each}
  </ul>
{/if}