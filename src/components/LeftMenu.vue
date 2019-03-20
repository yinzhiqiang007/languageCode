<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
<template id="LeftMenuTemplate">
          <Menu id="LeftMenu" v-bind:active-name="activeName" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>产品管理
              </template>
              <MenuItem name="1-1"><router-link :to="{ name: 'LanguageView'}">Key列表</router-link></MenuItem>
              <MenuItem name="1-2">创建产品</MenuItem>
              <MenuItem name="1-3">Option 3</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>Item 2
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
              <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>Item 3
              </template>
              <MenuItem name="3-1">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu>
          </Menu>
      
</template>
<script>
import Vue from "vue"

Vue.component('LeftMenuTemplate',{
  template: '#LeftMenuTemplate'
})

var app4 = new Vue({
  el: '#LeftMenu',
  data: {
  
  }
})


export default {
        name:'LeftMenu',
        data () {
            return {

            }
        }
    }

</script>
