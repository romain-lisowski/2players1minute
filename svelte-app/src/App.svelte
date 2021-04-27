<script>
  import { Router, Route } from 'svelte-navigator'
  import Header from './Header.svelte'
  import Footer from './Footer.svelte'
  import TopicList from './TopicList.svelte'
  
	export let siteName
  export let baseLine

  const fetchCategories = (async () => {
    let categories = []
    const response = await fetch("http://localhost:1337/categories", {
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    }).then(
      (resp) => (resp.json ? resp.json() : resp)
    )

    categories = response
    categories.sort((a, b) => (a.order > b.order) ? 1 : -1)
    return categories
  })()

  
</script>

<Router primary={false}>
  <Header siteName="{siteName}" baseLine="{baseLine}"/>
  <main>	
    <div class="h-full p-16">
      <Route path="/">
        <TopicList />
      </Route>


      <!-- <Route path="/1/gaming">
        <TopicList />
      </Route>

      <Route path="/2/cinéma">
        <TopicList />
      </Route> -->

      <Route path="/:categoryId/:categoryName">
        <TopicList />
      </Route>
            <!-- {#await fetchCategories then categories}
        {#each categories as category}
          <Route path="/ + {category.id} + '/' + {category.name}">
            <TopicList />
          </Route>
        {/each}
      {/await} -->
    </div>
  </main>
  <Footer siteName="{siteName}" />
</Router>

