import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import store from './store';

import Home from './views/Home.vue';
import Profile from './views/Profile.vue';
import ProfileOrganization from './views/ProfileOrganization.vue';
import ProfileContacts from './views/ProfileContacts.vue';
import ProfileStore from './views/ProfileStore.vue';
import ProfileDelivery from './views/ProfileDelivery.vue';
import ProfilePayments from './views/ProfilePayments.vue';
import ProfilePass from './views/ProfilePass.vue';
import ProfileWarranty from './views/ProfileWarranty.vue';
import ProfileAdvantages from './views/ProfileAdvantages.vue';
import ProductAdd from './views/ProductAdd.vue';
import LoadsPriceList from './views/LoadsPriceList.vue';
import ProductsHistory from './views/ProductsHistory.vue';
import ProductsPosition from './views/ProductsPosition.vue';
import Providers from './views/Providers.vue';
import ProviderAdd from './views/ProviderAdd.vue';
import Favorites from './views/Favorites.vue';
import Support from './views/Support.vue';

Vue.use(Router);

// Определяем роуты
const router = new Router({
    mode: 'history',
    base: 'dashboard',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Catalog
        },
    ],
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else if (to.hash) {
        return { selector: to.hash }
      } else {
        return { x: 0, y: 0 }
      }
    },
  });
  
// Конфигурируем полосу загрузки
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
});

router.afterEach((to, from) => {
    NProgress.done()
});

export default router;