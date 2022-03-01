import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import(/* webpackChunkName: "group-foo" */ '@/views/Home/index.vue')
const Login = () => import(/* webpackChunkName: "group-foo" */ '@/views/Login/index.vue')
const Users = () => import(/* webpackChunkName: "group-foo" */ '@/views/Users/index.vue')
const Welcome = () => import(/* webpackChunkName: "group-foo" */ '@/views/Welcome/index.vue')
const Roles = () => import(/* webpackChunkName: "group-foo" */ '@/views/Roles/index.vue')
const Cat = () => import(/* webpackChunkName: "group-foo" */ '@/views/Category/index.vue')
const Label = () => import(/* webpackChunkName: "group-foo" */ '@/views/Label/index.vue')
const Articles = () => import(/* webpackChunkName: "group-foo" */ '@/views/Articles/index.vue')
const AddArticle = () => import(/* webpackChunkName: "group-foo" */ '@/views/Articles/AddArticle/index.vue')
const EditArticle = () => import(/* webpackChunkName: "group-foo" */ '@/views/Articles/EditArticle/index.vue')
const Friends = () => import(/* webpackChunkName: "group-foo" */ '@/views/Friends/index.vue')

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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/admin/'),
  routes
})
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token')
  if (to.meta.auth) {

    if (!token) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else if (to.name == 'Login') {
    if (token) {
      next({ name: 'Welcome' })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
