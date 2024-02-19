import { createRouter, createWebHistory } from 'vue-router';
import { useTokenStore } from "@/stores/token";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue'),
    },
    {
      path: '/',
      name: '',
      component: () => import('@/components/layout/AppLayout.vue'),
      meta: {
        // 需要登入驗證
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: "home",
          component: () => import('@/views/IndexView.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/AboutView.vue')
        },
        {
          path: '/menus',
          name: 'menus',
          component: () => import('@/views/menu/MenuIndex.vue')
        },
        {
          path: '/menus/create',
          name: 'menu-create',
          component: () => import('@/views/menu/CreateOrEdit.vue')
        },
        {
          path: '/menus/:id/edit',
          name: 'menu-edit',
          component: () => import('@/views/menu/CreateOrEdit.vue')
        },
        {
          path: '/resource-category',
          name: 'resource-category',
          component: () => import('@/views/resource-category/ResourceCategoryIndex.vue')
        },
        {
          path: '/resources',
          name: 'resources',
          component: () => import('@/views/resources/ResourcesIndex.vue')
        },
        {
          path: '/roles',
          name: 'roles',
          component: () => import('@/views/roles/RolesIndex.vue')
        },
        {
          path: '/roles/:roleId/alloc-menus',
          name: 'alloc-menus',
          component: () => import('@/views/roles/AllocMenus.vue'),
          props: true, // 把:roleId 當成屬性接收
        },
        {
          path: '/:xxx(.*)*',
          name: 'ErrorPage',
          component: () => import('@/views/ErrorPage.vue')
        },
      ],
    }
  ]
});

// next 表示下一步要做什麼
router.beforeEach((to, from, next) => {
  // r 表示每一層子路由
  if (to.matched.some(r => r.meta?.requiresAuth)) {
    const store = useTokenStore();
    if (!store.token.access_token) {
      next({
        name: 'login',
        // 先跳回 login 後，當登入成功就跳回原頁
        query: { redirect: to.fullPath }
      });
      return;
    }
  }
  next();
});

export default router;
