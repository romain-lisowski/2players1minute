<script>
  import { RouterLink } from 'svelte-easyroute'
  import { onMount } from 'svelte'
  import dayjs from 'dayjs'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faGamepad, faFilm, faTv } from '@fortawesome/free-solid-svg-icons'

  export let router
  const categoryName = router.currentRouteData.value.params.categoryName
  
  // export let topics = []
  $: topics = []

  router.beforeEach(async (to, from, next) => {
    topics = await findTopics(router.currentRouteData.value.params.categoryName)
    console.log(topics)
    topics = topics
    next()
  })

  onMount(async () => {
    topics = await findTopics(categoryName)
  });

  async function findTopics(fetchCategoryName) {
    let fetchTopics = []
    const parseJSON = (resp) => (resp.json ? resp.json() : resp);
    const checkStatus = (resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }
      return parseJSON(resp).then((resp) => {
        throw resp;
      });
    };

    try {
      const res = await fetch("http://localhost:1337/topics", {
        method: "GET",
        'Content-Type': 'application/json',
      }).then(checkStatus)
        .then(parseJSON);

      if (fetchCategoryName) {
        res.forEach((r) => {
          if (r.category.name.toLowerCase() === fetchCategoryName) {
            fetchTopics.push(r)
          }
        })
      } else {
        fetchTopics = res
      }

      fetchTopics.forEach((topic) => {
        topic.published_at = dayjs(topic.published_at).format('DD/MM/YYYY')
      })
    } catch (e) {
      console.error(e)
    }

    return fetchTopics
  }

</script>

<ul class="grid grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
    {#each topics as topic}
      <li class="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform duration-300 cursor-pointer">
        <RouterLink to={'/' + topic.category.name.toLowerCase() + '/' + topic.id}>
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
        </RouterLink>
      </li>
    {/each}
  </ul>