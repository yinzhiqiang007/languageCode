import Vue from 'vue'
import Router from 'vue-router'
import LanguageView from '@/components/LanguageView.vue'
import LanguageEdit from '@/components/LanguageEdit.vue'
import KeyEdit from '@/components/KeyEdit.vue'
import ModuleEdit from '@/components/ModuleEdit.vue'
import LeftMenu from '@/components/LeftMenu.vue'
import Hello from '@/components/Hello.vue'

Vue.use(Router)



export default new Router({
  routes: [
    {
      path:'/',
      name:'leftMenu',
      component:LeftMenu,
      children:[
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
    }
    
  ]
})
