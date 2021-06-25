import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Details = () => import('../views/home/Details')
const Write_diary = () => import('../views/home/Write_diary')
const About = () => import('../views/about/About')
const Learn = () => import('../views/learn/Learn')
const Shop = () => import('../views/learn/Shop')
const GoodsDeails = () => import('../views/learn/GoodsDeails')
const Message = () => import('../views/message/Message')
const Login = () => import('../views/login/Login')
const Register = () => import('../views/login/Register')
const Profile = () => import('../views/profile/Profile')
const WithDrawal = () => import('../views/profile/WithDrawal')
const Order = () => import('../views/profile/Order')
const Photo_list = () => import('../views/profile/Photo_list')
const Setting = () => import('../views/profile/Setting')
const Tools = () => import('../views/profile/Tools')
const Nav = () => import('../views/nav/Nav')
const NavDetails = () => import('../views/nav/NavDetails')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/nav',
    name: 'Nav',
    component: Nav
  },
  {
    path: '/navDetails',
    name: 'NavDetails',
    component: NavDetails
  },
  {
    path: '/details',
    name: 'Details',
    component: Details
  },
  {
    path: '/write_diary',
    name: 'Write_diary',
    component: Write_diary
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/learn',
    name: 'Learn',
    component: Learn
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    meta: {
      noRefresh: true
    }
  },
  {
    path: '/goodsDetails',
    name: 'GoodsDeails',
    component: GoodsDeails
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/withDrawal',
    name: 'WithDrawal',
    component: WithDrawal
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      noRefresh: true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      noRefresh: true
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/photo_list',
    name: 'Photo_list',
    component: Photo_list
  },
  {
    path: '/tools',
    name: 'Tools',
    component: Tools
  }
]
const router = new VueRouter({
  routes,
  mode: 'hash'
})


export default router
