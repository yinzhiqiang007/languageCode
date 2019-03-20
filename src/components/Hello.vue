<template>
  <div id="example">
    <ol>
      <li>1234</li>
      <li>这是个待办项1</li>
      <li>{{message}}</li>
      <row ref="one"></row>
      <row></row>
      <row></row>
    </ol>
  </div>
</template>

<script>
import Vue from "vue"

Vue.component('row',{
  data:function(){
    return {mmm:"-hahah"};
  },
  template: '<li>this is a row {{mmm}}</li>'
})


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