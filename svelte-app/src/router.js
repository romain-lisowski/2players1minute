import Router from 'svelte-easyroute'
import TopicList from './TopicList.svelte'
import Topic from './Topic.svelte'

export const router = new Router({
    mode: "history", 
    omitTrailingSlash: true, 
    routes:[
        {
            path: '/',
            component: TopicList,
            name: 'Topic list'
        },
        {
            path: '/:categoryName',
            component: TopicList,
            name: 'Topic category list'
        },
        {
            path: '/:categoryName/:topicId',
            component: Topic,
            name: 'Topic'
        },
    ]
})