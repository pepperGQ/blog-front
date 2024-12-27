import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import useRouteCacheStore from '@/stores/modules/routeCache'
import useRouteTransitionNameStore from '@/stores/modules/routeTransitionName'
import type { EnhancedRouteLocation } from './types'

import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type'
import { localStorage } from '@/utils/local-storage'

NProgress.configure({ showSpinner: true, parent: '#app' })

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes,
})

router.beforeEach((to: EnhancedRouteLocation, from, next) => {
  NProgress.start()

  const routeCacheStore = useRouteCacheStore()
  const routeTransitionNameStore = useRouteTransitionNameStore()

  // Route cache
  routeCacheStore.addRoute(to)
  // 判断页面是否需要登录
  if(to.meta.needLogin){
    if(localStorage.get(STORAGE_TOKEN_KEY)){
      next()
    }else{
      next('/login')
    }
  }
  if (to.meta.level > from.meta.level)
    routeTransitionNameStore.setName('slide-fadein-left')

  else if (to.meta.level < from.meta.level)
    routeTransitionNameStore.setName('slide-fadein-right')

  else
    routeTransitionNameStore.setName('')

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
