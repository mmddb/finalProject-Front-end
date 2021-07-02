import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'signup',
    component: () => import('../components/Signup.vue')
  },
    {
      path: '/home',
      name: 'home',
      component: () => import('../components/Home.vue')
    },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
    {
      path: '/error',
      name: 'error',
      component: () => import('../components/Error.vue')
    },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/ForgotPassword.vue')
  },
  {
    path: '/postFormAxios',
    name: 'postFormAxios',
    component: () => import('../components/PostFormAxios.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path.startsWith('/login')){
    window.localStorage.removeItem('access-admin')
    next()
  } else {
    let admin = JSON.parse(window.localStorage.getItem('access-admin'));
    if (!admin){
      next({path: '/login'})
    } else {
      axios({
        url:'http://localhost:8081/checkToken',
        method:'get',
        headers:{
          token:admin.result.token
        }
      }).then( res => {
        console.log(res.data);
            if (!res.data) {
              console.log("校验失败")
              next({path: '/error'})
            }
          }
      )
      next()
    }
  }
})

export default router
