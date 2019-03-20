import Vue from 'vue'
import Router from 'vue-router'
import LanguageView from '@/components/LanguageView'
import LanguageEdit from '@/components/LanguageEdit'
import KeyEdit from '@/components/KeyEdit'
import ModuleEdit from '@/components/ModuleEdit'
import LeftMenu from '@/components/LeftMenu'
import Hello from '@/components/Hello'

Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      name: 'LanguageView',
      component: LanguageView
    },
    {
      path: '/languageEdit/:id',
      name: 'LanguageEdit',
      component: LanguageEdit
    },
    {
      path: '/keyEdit',
      name: 'KeyEdit',
      component: KeyEdit
    },
    {
      path: '/moduleEdit',
      name: 'ModuleEdit',
      component: ModuleEdit
    },
    {
      path: '/leftMenu',
      name: 'LeftMenu',
      component: LeftMenu
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
