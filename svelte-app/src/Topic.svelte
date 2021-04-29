<script>
  import dayjs from 'dayjs'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faGamepad, faFilm, faTv } from '@fortawesome/free-solid-svg-icons'
  import marked from 'marked'

  export let topicId

  const fetchTopic = (async () => {
    let topic
    const response = await fetch('http://localhost:1337/topics/' + topicId, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(
      (resp) => (resp.json ? resp.json() : resp)
    )
    topic = response
    topic.published_at = dayjs(topic.published_at).format('DD/MM/YYYY')

    return topic
  })()

</script>

{#await fetchTopic}
  <div class="h-screen"></div>
{:then topic}
  <div class="max-w-5xl mx-auto mb-16 overflow-hidden bg-white rounded-lg shadow-xl">
    <img class="object-cover object-top w-full h-96 shadow-lg" src="http://localhost:1337{topic.cover.url}" alt="Article">
      
    <div class="p-6 bg-gray-800 border-b-4 border-gray-500">
      <p class="text-left text-5xl font-extrabold text-gray-100 cursor-pointer">{topic.name}</p>

      <div class="flex items-end justify-between mt-3">
        <ul class="flex gap-2">
          <li class="px-6 py-2 text-sm font-extrabold bg-gray-100 text-gray-800 border-2 border-gray-100 shadow-md uppercase rounded-sm">
            {#if topic.category.icon_name === 'faGamepad' }
              <Fa icon={faGamepad} size="lg" class="inline mr-1" />
            {:else if topic.category.icon_name === 'faFilm' }
              <Fa icon={faFilm} size="lg" class="inline mr-1" />
            {:else if topic.category.icon_name === 'faTv' }
              <Fa icon={faTv} size="lg" class="inline mr-1" />
            {/if}
            {topic.category.name}
          </li>
          {#each topic.subcategories as subcategory}
            <li class="px-6 py-2 text-sm text-gray-100 border-2 border-gray-100 shadow-md uppercase rounded-sm">{subcategory.name}</li>
          {/each}
        </ul>
        
        <span>
          <p class="text-right text-gray-100 mb-2">Publié le : {topic.published_at}</p>
          <ul class="flex justify-end gap-2 ">
            {#each topic.platforms as platform}
              <li class="px-4 py-1 text-xs text-gray-100 align-middle rounded-sm {platform.classes}">{platform.name}</li>
            {/each}
          </ul>
        </span>

      </div>
    </div>

    <div class="p-6">
      <div class="flex gap-6 items-start justify-between">
        {#each topic.tests as test}
          <div class="w-3/4">  
            <div class="flex items-center mb-3 pb-3 border-b-2 border-gray-800">
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
            <p class="mt-2 text-xl text-gray-800 font-bold">{test.title}</p>
            <p class="mt-2 text-gray-800 text-justify">{@html marked(test.content)}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/await}