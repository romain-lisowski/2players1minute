<script>
  import { Router, Route } from 'svelte-routing'
  import { ApolloClient, InMemoryCache } from '@apollo/client'
  import { setClient } from 'svelte-apollo'
  import Header from './Header.svelte'
  import TopicList from './TopicList.svelte'
  import Topic from './Topic.svelte'
  import Footer from './Footer.svelte'
  
  // eslint-disable-next-line no-undef
  const apiUrl = API_URL
  export let siteName
  export let baseLine
  export let url = ''
  
  const client = new ApolloClient({
    uri: apiUrl + '/graphql',
    cache: new InMemoryCache()
  })
  setClient(client)
</script>

<Router url="{url}">
  <Header siteName="{siteName}" baseLine="{baseLine}"/>
  <main>	
    <div class="h-full pt-10 sm:pt-12 md:pt-16 px-3 sm:px-12 md:px-16">
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

      <Route path="/:categoryId/:categoryName/:topicId/:topicSlug" let:params>
        <Topic topicId="{params.topicId}" />
      </Route>
    </div>
  </main>
  <Footer siteName="{siteName}" />
</Router>

<style global lang="postcss">

@tailwind base;

@font-face {
  font-family: 'CustomSans';
  src: url('/assets/fonts/Roboto_Condensed/RobotoCondensed-Light.ttf') format('truetype');
  font-weight: 200;
  font-style: normal;
}

@font-face {
  font-family: 'CustomSans';
  src: url('/assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'CustomSans';
  src: url('/assets/fonts/Roboto_Condensed/RobotoCondensed-Italic.ttf') format('truetype');
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: 'CustomSans';
  src: url('/assets/fonts/Roboto_Condensed/RobotoCondensed-Bold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
}

@tailwind components;
@tailwind utilities;
</style>