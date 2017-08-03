// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './components/app/app';
import router from './router';
var $ = window.jQuery = require('jquery');
require('materialize-css/dist/js/materialize.min.js');

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: {App }
});
