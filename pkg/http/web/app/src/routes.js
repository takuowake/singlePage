import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '@okta/okta-vue'

import Home from './components/Home';
import Login from './components/Login';
import GitHubRepoDetails from './components/GithubRepoDetails';

Vue.use(VueRouter);
Vue.use(Auth,{
    issuer:'https://dev-48933354.okta.com/oauth2/default',
    client_id:'0oa2hheh5em3ZvtB85d7',
    redirect_url:'http://localhost:8080/implicit/callback',
    scope:'openid profile email'
})

export default new VueRouter({
    mode:'history',
    routes:[
        { path: '/', component: Login },
        { path: '/me', component:Home, meta: { requiresAuth: true }},
        { name: 'repo-details', path: '/repo/:id', component: GitHubRepoDetails, meta: { requiresAuth: true } },
        { path: '/implicit/callback', component: Auth.handleCallback() }
    ]
});
