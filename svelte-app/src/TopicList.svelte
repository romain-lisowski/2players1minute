<script>
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faGamepad, faFilm, faTv } from '@fortawesome/free-solid-svg-icons'

    export let topics
</script>

<ul class="grid grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
    {#each topics as topic}
      <li class="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform duration-300 cursor-pointer">
        <img class="w-full h-64 object-cover object-top" src="http://localhost:1337{topic.cover.url}" alt="Article">
          
        <div>
          <div class="flex items-baseline justify-between -mt-12">
            <ul class="flex justify-end gap-2 pl-3">
              {#each topic.platforms as platform}
                <li class="px-2 py-1 text-xs text-gray-100 align-middle rounded-sm shadow-lg {platform.classes}">{platform.name}</li>
              {/each}
            </ul>
            <span class="flex justify-end pr-2">
              <span>
                {#each topic.tests as test}
                <span class="mr-2 px-2 py-2 text-xl text-right bg-white text-gray-800 rounded-sm shadow-lg">
                  <span class="font-bold text-xl">{test.rating}</span><span class="text-xs">/10</span>
                </span>
                {/each}
              </span>
            </span>
          </div>
          
          <div class="flex items-center justify-left gap-3 mt-3 bg-gray-800">
            <span class="ml-6 text-xl font-extrabold text-gray-100 uppercase rounded-sm shadow-lg">
              {#if topic.category.icon_name === 'faGamepad' }
                <Fa icon={faGamepad} size="lg" />
              {:else if topic.category.icon_name === 'faFilm' }
                <Fa icon={faFilm} size="lg" />
              {:else if topic.category.icon_name === 'faTv' }
                <Fa icon={faTv} size="lg" />
              {/if}
            </span>
            <p class="py-4 text-center text-xl font-extrabold text-gray-100 cursor-pointer">{topic.name}</p>
          </div>
          
        </div>

      </li>
    {/each}
  </ul>