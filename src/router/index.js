import Vue from 'vue'
import Router from 'vue-router'
import LanguageView from '@/components/LanguageView.vue'
import LanguageEdit from '@/components/LanguageEdit.vue'
import AddKey from '@/components/AddKey.vue'
import AddProduct from '@/components/AddProduct.vue'
import LeftMenu from '@/components/LeftMenu.vue'
import Hello from '@/components/Hello.vue'
import KeyList from '@/components/KeyList.vue'
import LanguageAdd from '@/components/LanguageAdd.vue'

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
          path: '/languageAdd',
          name: 'LanguageAdd',
          component: LanguageAdd
        },
        {
          path: '/languageEdit/:id',
          name: 'LanguageEdit',
          component: LanguageEdit
        },
        {
          path: '/addKey',
          name: 'AddKey',
          component: AddKey
        },
        {
          path: '/addProduct',
          name: 'AddProduct',
          component: AddProduct
        },
        {
          path: '/hello',
          name: 'Hello',
          component: Hello
        },
        {
          path: '/keyList',
          name: 'KeyList',
          component: KeyList
        }
      ]
    }
    
  ]
})
