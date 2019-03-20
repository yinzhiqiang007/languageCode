<template>
  <div id="example">
    <ol>
      <li>1234</li>
      <!-- <Hello12></Hello12> -->
      <li>这是个待办项1</li>
      <li>{{message}}</li>
      <row ref="one"></row>
      <row></row>
      <row></row>
    </ol>
    <!-- <LeftMenuTemplate></LeftMenuTemplate> -->
  </div>
</template>

<script>
import Vue from "vue"
// import LeftMenuTemplate from "leftMenuTemplate"

Vue.component('row',{
  data:function(){
    return {mmm:"-hahah"};
  },
  template: '<li>this is a row {{mmm}}</li>'
})

// var vm = new Vue({
//   el: "#example"
// })


export default {
  name: "Hello12",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      todos: [
        { text: '学习 JavaScript' },
        { text: '学习 Vue' },
        { text: '整个牛项目' }
      ],
      message:"ddddd",
      mmm:"dddddddddddd"
    };
    
  },
  mounted: function() {
    this.$refs.one.mmm = "dddfsdfsdfsdf";
      message:"11111"
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>