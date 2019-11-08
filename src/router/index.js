import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import manage from '@/pages/manage'
import home from '@/pages/child/home'
import admin from '@/pages/child/admin'
import addhouse from '@/pages/child/addhouse'
import user from '@/pages/child/user'
import House from '@/pages/child/House'
import Let from '@/pages/child/let'
import resoldApartment from '@/pages/child/resoldApartment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/manage',
      component: manage,
      children:[
	      {
	      	path: '',
      		name: 'home',
      		component: home
	      },
	      {
	      	path: 'user',
      		name: 'user',
      		component: user
	      },
	      {
	      	path: 'addhouse',
      		name: 'addhouse',
      		component: addhouse
	      },
	      {
	      	path: 'admin',
      		name: 'admin',
      		component: admin
	      }
	      ,
	      {
	      	path: 'House',
      		name: 'House',
      		component: House
	      },
	       {
	      	path: 'let',
      		name: 'let',
      		component: Let
	      },
	      {
	      	path: 'resoldApartment',
      		name: 'resoldApartment',
      		component: resoldApartment
	      }
	      
	      
				      
      ]
    }
  ]
})
