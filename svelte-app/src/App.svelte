<script>
  import Header from './Header.svelte'
  import TopicList from './TopicList.svelte'
  import Topic from './Topic.svelte'
	import { onMount } from 'svelte'
  import dayjs from 'dayjs'

	export let topics = []

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
        headers,
      }).then(checkStatus)
        .then(parseJSON);
      topics = res
      topics.forEach((topic, index) => {
        topic.published_at = dayjs(topic.published_at).format('DD/MM/YYYY')
      })
    } catch (e) {
      error = e	
    }

	});


	export let siteName
  export let baseLine
	
</script>


<main>	
    <Header siteName="{siteName}" baseLine="{baseLine}"/>
    <div class="h-full p-16">
      <TopicList topics="{topics}" />
      <ul>
        {#each topics as topic}
          <Topic topic="{topic}" />
        {/each}
      </ul>
    </div>

    <footer class="h-full p-4 text-xs text-center text-gray-100 bg-gray-800 border-t-4 border-gray-800 shadow-xl">
      Copyright - {siteName} - 2021
    </footer>


</main>
