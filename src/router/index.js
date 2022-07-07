import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('@/views/Home/index.vue')
const Login = () => import('@/views/Login/index.vue')
const Users = () => import('@/views/Users/index.vue')
const Welcome = () => import('@/views/Welcome/index.vue')
const Roles = () => import('@/views/Roles/index.vue')
const Cat = () => import('@/views/Category/index.vue')
const Label = () => import('@/views/Label/index.vue')
const Articles = () => import('@/views/Articles/index.vue')
const AddArticle = () => import('@/views/Articles/AddArticle/index.vue')
const EditArticle = () => import('@/views/Articles/EditArticle/index.vue')
const Friends = () => import('@/views/Friends/index.vue')
const AboutSetting = () => import('@/views/AboutSetting/index.vue')
const AboutArticle = () => import('@/views/AboutSetting/Article/index.vue')
const AboutAddArticle = () => import('@/views/AboutSetting/Article/AddArticle/index.vue')
const AboutEditArticle = () => import('@/views/AboutSetting/Article/EditArticle/index.vue')
const Recreation = () => import('@/views/Recreation/Recreation.vue')
const Anime = () => import('@/views/Recreation/Anime/Anime.vue')
const AddAnime = () => import('@/views/Recreation/Anime/AddAnime/AddAnime.vue')
const EditAnime = () => import('@/views/Recreation/Anime/EditAnime/EditAnime.vue')
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    meta: { auth: true },
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
      },
      {
        path: '/users',
        name: 'Users',
        component: Users
      },
      {
        path: '/roles',
        name: 'Roles',
        component: Roles
      },
      {
        path: '/categories',
        name: 'Cat',
        component: Cat
      },
      {
        path: '/labels',
        name: 'Label',
        component: Label
      },
      {
        path: '/articles',
        name: 'Articles',
        component: Articles,
        children: [
          {
            path: 'add',
            name: 'AddArticle',
            component: AddArticle,
            meta: { article: true }
          },
          {
            path: 'edit',
            name: 'EditArticle',
            component: EditArticle,
            meta: { article: true }
          }
        ]
      },
      {
        path: '/friends',
        name: 'Friends',
        component: Friends
      },
      {
        path: '/about-setting',
        redirect: '/about-setting/article',
        component: AboutSetting,
        children: [
          {
            path: 'article',
            name: 'aboutArticle',
            component: AboutArticle,
            children: [
              {
                path: 'add',
                name: 'aboutAddArticle',
                component: AboutAddArticle,
                meta: { article: true }
              },
              {
                path: 'edit',
                name: 'aboutEditArticle',
                component: AboutEditArticle,
                meta: { article: true }
              }
            ]
          },

        ]
      },
      {
        path: '/recreation',
        component: Recreation,
        name: Recreation,
        children: [
          {
            path: 'anime',
            name: 'Anime',
            component: Anime,
            children: [
              {
                path: 'add',
                name: 'AddAnime',
                component: AddAnime,
                meta: { anime: true }
              },
              {
                path: 'edit',
                name: 'EditAnime',
                component: EditAnime,
                meta: { anime: true }
              }
            ]
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/admin'),
  routes
})
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('refresh_token')
  if (to.meta.auth) {
    if (!token || token == 'undefined') {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('userInfo')
      window.localStorage.removeItem('refresh_token')
      next({ name: 'Login' })
    } else {
      next()
    }
  } else if (to.name == 'Login') {
    if (token && token != 'undefined') {
      next({ name: 'Welcome' })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
