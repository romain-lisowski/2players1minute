<script>
  import { Router, Route } from 'svelte-routing'
  import Header from './Header.svelte'
  import TopicList from './TopicList.svelte'
  import Topic from './Topic.svelte'
  import Footer from './Footer.svelte'
  
export let siteName
  export let baseLine
  export let url = ''
  
</script>

<Router url="{url}">
  <Header siteName="{siteName}" baseLine="{baseLine}"/>
  <main>	
    <div class="h-full pt-16 px-16">
      <Route path="/">
        <TopicList />
      </Route>

      <Route path="/1/gaming">
        <TopicList categoryId="1" />
      </Route>

      <Route path="/2/cinema">
        <TopicList categoryId="2" />
      </Route>

      <Route path="/7/serie">
        <TopicList categoryId="7" />
      </Route>

      <Route path="/:categoryId/:categoryName/:topicId" let:params>
        <Topic topicId="{params.topicId}" />
      </Route>
    </div>
  </main>
  <Footer siteName="{siteName}" />
</Router>

