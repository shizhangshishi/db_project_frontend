import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Start from "../views/Start";
import Login from "../views/Login"
import Register from "../views/Register"

import Admin from "../views/admin/Admin"
import AdminDefault from "../components/admin/AdminDefault";
import ManageUsers from "../components/admin/ManageUsers"
import ManageResources from "../components/admin/ManageResources"


import Home from "../views/user/Home";
import HomeDefault from "../components/user/HomeDefault";
import Workspace from "../components/user/Workspace"

import Patient from "../views/Patient"

import MessageCenter from "../views/MessageCenter"
import SystemMessages from "../components/message_center/SystemMessages";

import Error from "../components/Error"

import Test from "../views/Test"

Vue.use(VueRouter);

const routes = [
  {
    path: '/', name: 'Start',
    component: Start
  },
  {
    path:'/test',name:'Test',
    component:Test
  },
  {
    path: '/login', name: 'Login',
    component: Login
  },
  {
    path: '/register', name: 'Register',
    component: Register
  },
  {
    path: '/home',
    component: Home,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '', name: 'HomeDefault',
        component: HomeDefault
      },
      {
        path: 'workspace', name: 'Workspace',
        component: Workspace
      },
    ],
    beforeEnter: (to, from, next) => {
      if (store.state.profile.role === 'ADMIN') {
        next({path: '/admin'});
      } else {
        next();
      }
    }
  },
  {
    path: '/admin',
    component: Admin,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '', name: 'AdminDefault',
        component: AdminDefault
      },
      {
        path: 'manageusers', name:'ManageUsers',
        component: ManageUsers
      },
      {
        path: 'manageresources', name:'ManageResources',
        component: ManageResources
      }
    ],
    beforeEnter: (to, from, next) => {
      if (store.state.profile.role === 'USER') {
        next({path: '/home'});
      } else {
        next();
      }
    }
  },


  {
    path: '/patient/:id', name: "Patient",
    component: Patient,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/messagecenter',
    component: MessageCenter,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '', name: "SystemMessages",
        component: SystemMessages
      },
    ]
  },
  {
    // Error page
    path: '/error/:id', name: 'Error',
    component: Error
  },
  {
    // 404 NOT FOUND
    path: '*', name: 'NotFound',
    component: Error
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 前端登录拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
      });
    }
  }
  else {
    next();
  }
});

export default router;
