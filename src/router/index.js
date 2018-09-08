import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Asset from '@/views/Asset'
import Application from '@/views/Application'
import Mine from '@/views/Mine'
import Login from '@/views/Login'
import Developing from '@/components/Developing'

import Trade from '@/views/home/Trade'
import Buying from '@/views/home/Buying'
import Exchange from '@/views/home/Exchange'
import MoneyCode from '@/views/home/MoneyCode'
import Moneyto from '@/views/home/Moneyto'
import SellOut from '@/views/home/SellOut'
import OrderList from '@/views/home/OrderList'

import Hbao from '@/views/asset/Hbao'
import Order from '@/views/asset/Order'
import Raise from '@/views/asset/Raise'
import Record from '@/views/asset/Record'
import Sell from '@/views/asset/Sell'
import Transaction from '@/views/asset/Transaction'

import ChangePassword from '@/views/mine/ChangePassword'
import Complaint from '@/views/mine/Complaint'
import Notice from '@/views/mine/Notice'
import About from '@/views/mine/About'
import ChangePayPwd from '@/views/mine/ChangePayPwd'
import Nickname from '@/views/mine/Nickname'
import Bankcard from '@/views/mine/Bankcard'
import Version from '@/views/mine/Version'
import Share from '@/views/mine/Share'
import Addition from '@/views/mine/Addition'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[{
        path:'moneycode',
        component: MoneyCode
      },{
        path:'moneyto',
        component: Moneyto
      },{
        path:'exchange',
        component: Exchange
      },{
        path:'trade',
        component: Trade,
        redirect: '/home/trade/buying',
        children:[{
          path:'buying',
          component:Buying
        },{
          path:'sellout',
          component:SellOut
        },{
          path:'orderlist',
          component:OrderList
        }]
      }]
    },
    {
      path: '/asset',
      name: 'asset',
      component: Asset,
      children:[{
        path:'moneyto',
        component: Moneyto
      },{
        path:'raise',
        component: Raise
      },{
        path:'hbao',
        component: Hbao
      },{
        path:'transaction',
        component: Transaction,
        children:[{
          path:'sell',
          component: Sell
        },{
          path:'buying',
          component: Buying
        },{
          path:'order',
          component: Order
        },{
          path:'record',
          component: Record
        }]
      }]
    },
    {
      path: '/application',
      name: 'application',
      component: Application,
      children:[{
        path:'league',
        component: Developing
      },{
        path:'newretail',
        component: Developing
      },{
        path:'entertainment',
        component: Developing
      },{
        path:'qrcode',
        component: Developing
      }]
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
      children:[{
          path:'changepassword',
          component: ChangePassword
        },{
          path:'complaint',
          component: Complaint
        },{
          path:'notice',
          component: Notice,
        },{
          path:'about',
          component:About
        },{
          path:'store',
          component:Developing
        },{
          path:'merchant',
          component:Developing
        },{
          path:'moneyCode',
          component:MoneyCode
        },{
          path:'payment',
          component:ChangePayPwd
        },{
          path:'nickname',
          component:Nickname
        },{
          path:'bankcard',
          component:Bankcard
        },{
          path:'share',
          component:Share
        },{
          path:'addition',
          component:Addition
        },{
        path:'version',
        component:Version
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/',
      redirect:'/login'
    }
  ]
})
