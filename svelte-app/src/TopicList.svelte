<script>
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faGamepad } from '@fortawesome/free-solid-svg-icons'

    export let topics
</script>

<ul class="flex flex-wrap gap-6 mb-16">
    {#each topics as topic}
      <li class="w-1/4 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform duration-300 cursor-pointer">
        <img class="w-full h-64 object-cover object-top" src="http://localhost:1337{topic.cover.url}" alt="Article">
          
        <div>

          <div class="flex items-baseline justify-between -mt-12">
            <ul class="flex justify-end gap-2 pl-3">
              {#each topic.game_platforms as gamePlaform}
                <li class="px-3 py-2 text-xs text-gray-100 align-middle rounded-sm shadow-lg {gamePlaform.classes}">{gamePlaform.name}</li>
              {/each}
            </ul>
            <span class="flex justify-end pr-2">
              <span>
                {#each topic.tests as test}
                <span class="mr-2 px-3 py-2 text-xl text-right bg-white text-gray-800 rounded-sm shadow-lg">
                  <span class="font-bold text-xl">{test.rating}</span><span class="text-xs">/10</span>
                </span>
                {/each}
              </span>
            </span>
          </div>
          
          <div class="flex items-center justify-left gap-3 mt-3 bg-gray-800">
            <span class="ml-6 text-xl font-extrabold text-gray-100 uppercase rounded-sm shadow-lg">
              <Fa icon={faGamepad} size="lg" />
            </span>
            <p class="py-4 text-center text-xl font-extrabold text-gray-100 cursor-pointer">{topic.name}</p>
          </div>
          
        </div>

      </li>
    {/each}
  </ul>