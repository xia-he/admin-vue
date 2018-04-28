// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
   next();
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

Vue.use(ElementUI);

// 如果sessionStorage 缓存没有用户，强制进入登录页面
// router.beforeEach((to, from, next) => {  
//   if (to.path == '/login') {
//       sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login') {
//       next({
//           path: '/login'
//       });
//   } else {
//       next();
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
