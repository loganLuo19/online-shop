import Vue from 'vue';
import Router from 'vue-router';
//客戶端頁面
import Login from '@/components/pages/Login';
import Index from '@/components/Index';
import Home from '@/components/pages/Home';
import ProductPage from '@/components/pages/ProductPage';
import ProductInfo from '@/components/pages/ProductInfo';
import ShoppingCart from '@/components/pages/ShoppingCart';
import Checkout from '@/components/Checkout';
import Orderer from '@/components/pages/Orderer';
import Payment from '@/components/pages/Payment';
import Invoice from '@/components/pages/Invoice';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import OrderCompleted from '@/components/pages/OrderCompleted';
import SpecialOffers from '@/components/pages/SpecialOffers';


//管理者頁面
import Dashborad from '@/components/Dashborad';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import Coupon from '@/components/pages/Coupons';



Vue.use(Router);
export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        },
        {
          path: 'st.19_shop',
          name: 'Home',
          component: Home
        },
        {
          path: 'product_page',
          name: 'ProductPage',
          component: ProductPage
        },
        {
          path: 'shopping_cart',
          name: 'ShoppingCart',
          component: ShoppingCart
        },
        {
          path: 'product_info',
          name: 'ProductInfo',
          component: ProductInfo
        },
        {
          path: 'special_offers',
          name: 'SpecialOffers',
          component: SpecialOffers
        },
        {
          path: 'order_completed',
          name: 'OrderCompleted',
          component: OrderCompleted
        },
      ]
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
      children: [
        {
          path: 'orderer',
          name: 'Orderer',
          component: Orderer
        },
        {
          path: 'payment/:orderId',
          name: 'Payment',
          component: Payment
        },
        {
          path: 'invoice/:orderId',
          name: 'Invoice',
          component: Invoice
        }
      ]
    },
    {
      path: '/admin',
      name: 'Dashborad',
      component: Dashborad,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        }
      ]
    }
  ]
})
