import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/home';
import SavingPots from '@/components/saving-pots/saving-pots';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SavingPots',
      component: SavingPots
    }
  ]
})
