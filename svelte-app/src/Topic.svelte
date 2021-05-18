<script>
  import { query } from 'svelte-apollo'
  import { GET_TOPIC } from './queries/GET_TOPIC'
  import dayjs from 'dayjs'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faGamepad, faFilm, faTv } from '@fortawesome/free-solid-svg-icons'
  import marked from 'marked'

  // eslint-disable-next-line no-undef
  const apiUrl = API_URL
  export let topicId

  const queryTopic = query(GET_TOPIC, { variables: { id: topicId } })
</script> 

{#if $queryTopic.loading}
  <div class="h-screen"></div>
{:else}
  <div class="max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto mb-16 overflow-hidden bg-white rounded-lg shadow-xl">
    <img class="object-cover object-top w-full h-60 sm:h-72 md:h-80 lg:h-96 shadow-lg" src="{apiUrl + $queryTopic.data.topic.cover.url}" alt="Article">
      
    <div class="px-6 py-4 md:py-6 md:p-6 bg-gray-800 border-b-2 border-gray-500">
      <p class="text-left text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-gray-100 cursor-pointer">{$queryTopic.data.topic.name}</p>

      <div class="flex flex-col md:flex-row items-start md:items-end md:justify-between mt-3 md:mt-0">
        <ul class="flex gap-2">
          <li class="px-2 sm:px-4 md:px-6 py-1 md:py-2 text-xs sm:text-sm font-extrabold bg-gray-100 text-gray-800 border-2 border-gray-100 shadow-md uppercase rounded-sm">
            {#if $queryTopic.data.topic.category.icon_name === 'faGamepad' }
              <Fa icon={faGamepad} class="h-10 inline mr-1" />
            {:else if $queryTopic.data.topic.category.icon_name === 'faFilm' }
              <Fa icon={faFilm} class="h-10 inline mr-1" />
            {:else if $queryTopic.data.topic.category.icon_name === 'faTv' }
              <Fa icon={faTv} class="h-10 inline mr-1" />
            {/if}
            {$queryTopic.data.topic.category.name}
          </li>
          {#each $queryTopic.data.topic.subcategories as subcategory}
            <li class="px-2 sm:px-4 md:px-6 py-1 md:py-2 text-xs sm:text-sm text-gray-100 border-2 border-gray-100 shadow-md uppercase rounded-sm">{subcategory.name}</li>
          {/each}
        </ul>
        
        <span>
          <ul class="flex justify-start md:justify-end gap-2 mt-2 md:mt-0">
            {#each $queryTopic.data.topic.platforms as platform}
            <li class="px-4 py-1 text-xs md:text-sm text-gray-100 align-middle rounded-sm {platform.classes}">{platform.name}</li>
            {/each}
          </ul>
          <p class="text-left md:text-right text-xs sm:text-sm md:text-base text-gray-100 mt-4 md:mt-2">Publié le : {dayjs($queryTopic.data.topic.published_at).format('DD/MM/YYYY')}</p>
        </span>
      </div>
    </div>

    <div class="p-6">
      <div class="flex flex-col md:flex-row gap-6 items-start justify-between">
        {#each $queryTopic.data.topic.tests as test}
          <div class="w-full md:w-3/4 mb-8 md:mb-0">  
            <div class="flex items-center mb-3 pb-3 border-b-2 border-gray-800">
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center">
                  <img class="object-cover h-10 md:h-12 rounded-full" src="{apiUrl + test.user.image_profile.url}" alt="Avatar">
                  <span class="mx-2 text-lg font-semibold text-gray-800">{test.user.username}</span>
                </div>
                <span class="text-right text-xl px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 text-gray-100 bg-gray-800 rounded-sm shadow-md">
                  <span class="font-bold text-2xl">{test.rating}</span><span class="text-sm">/10</span>
                </span>
              </div>
            </div>
            <p class="mt-2 text-xl text-gray-800 font-bold">{test.title}</p>
            <p class="mt-2 text-gray-800 text-justify">{@html marked(test.content)}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}