<template>
  <div class="container">
    <div class="row clearfix">
      <div class="col-md-12 column">
        <nav class="navbar navbar-default" role="navigation">

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <!-- <li class="active">
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li> -->

              <li class="dropdown">
                <a href="javascript:void(0)"  class="dropdown-toggle" v-model="productId" data-toggle="dropdown">
                  {{productText}}<strong class="caret"></strong>
                </a>
                <ul class="dropdown-menu">
                  <li v-for="item in productList">
                    <a href="javascript:void(0)" @click="checkModule(item.id,item.name)"   >{{item.name}}</a>
                  </li>
                </ul>
              </li>

              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  {{moduleText}}
                  <strong class="caret"></strong>
                </a>
                <ul class="dropdown-menu">
                  <li v-for="item in moduleList">
                    <a href="javascript:void(0)" @click="checkCode(item.id,item.name)" >{{item.name}}</a>
                  </li>
  
                </ul>
              </li>
            </ul>

            <form class="navbar-form navbar-left" role="search">
              <div class="form-group">
                <input type="text" class="form-control" v-model="param"  >
              </div>
              <button type="button" class="btn btn-default" @click="checkCode(null,null)" >查询</button>
            </form>

          </div>
        </nav>


        <table class="table">
          <thead  >
            <tr>
              <th class=" text-center">Key</th>
              <th class=" text-center">产品</th>
              <th class=" text-center">模块</th>
              <th class=" text-center">CN</th>
              <th class=" text-center">EN</th>
              <th class=" text-center">IT</th>
              <th class=" text-center">TW</th>
              <th class=" text-center">EU</th>
              <th class=" text-center">ES</th>
              <th class=" text-center">HK</th>
              <th class=" text-center">编辑</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <td>{{item.positionKey}}</td>
              <td>{{item.productName}}</td>
              <td>{{item.moduleName}}</td>
              <td>{{item.cn}}</td>
              <td>{{item.en}}</td>
              <td>{{item.it}}</td>
              <td>{{item.tw}}</td>
              <td>{{item.eu}}</td>
              <td>{{item.es}}</td>
              <td>{{item.hk}}</td>
              <td>
              <router-link target="_blank" :to="{ name: 'LanguageEdit', params: { id: item.id }}">编辑</router-link>
              </td>

              
            </tr>
          </tbody>
        </table>
        <button type="button" class="btn btn-default"><router-link target="_blank" :to="{ name: 'ModuleEdit'}">创建模块</router-link></button>
        <button type="button" class="btn btn-default"><router-link target="_blank" :to="{ name: 'KeyEdit'}">创建Key</router-link></button>
        <div class="btn-group btn-group-lg">
          <button class="btn btn-default" type="button">
            <em class="glyphicon glyphicon-heart"></em> 左
          </button>
          <button class="btn btn-default" type="button">
            <em class="glyphicon glyphicon-align-center"></em> 中
          </button>
          <button class="btn btn-default" type="button">
            <em class="glyphicon glyphicon-align-right"></em> 右
          </button>
          <button class="btn btn-default" type="button">
            <em class="glyphicon glyphicon-align-justify"></em> 全
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      user: {
        name: "尹志强",
        age: 100
      },
      list: [],
      productList:[],
      moduleList:[],
      productText:"产品",
      moduleText:"模块",
      param:"",
      productId:"",
      moduleId:""

    };
  },
  mounted: function() {
    const self = this;
    axios.post(
        "http://localhost:8081/iot/language/languageView",
        { param: "" },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(function(resp) {
        console.log(resp.data.data);
        self.list = resp.data.data;
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
    });

    axios.post(
      "http://localhost:8081/iot/language/listByProduct"
    )
    .then(function(resp) {
      self.productList = resp.data.data;
      console.log(self.productList);
    })
    .catch(resp => {
      console.log("请求失败：" + resp.status + "," + resp.statusText);
    });
  },
  methods: {

    getUrl(u,v){
      return u+v;
    },

    checkModule(id,name){
      const self = this;
      this.productId=id;
      axios.post(
        "http://localhost:8081/iot/language/listByModule?productId="+id
      )
      .then(function(resp) {
        self.moduleList = resp.data.data;
        console.log(self.moduleList);
        self.productText = name;
        
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
      });
    },
    checkCode(id,name){
      const self = this;
      if(id != null){
        this.moduleId=id;
      }
      
      if(name!=null){
        self.moduleText = name;
      }
      axios.post(
          "http://localhost:8081/iot/language/languageView",
          { moduleId: this.moduleId,param:this.param,"productId":this.productId },
          {
            headers: { "Content-Type": "application/json" }
          }
        )
        .then(function(resp) {
          console.log(resp.data.data);
          self.list = resp.data.data;
        })
        .catch(resp => {
          console.log("请求失败：" + resp.status + "," + resp.statusText);
      });

    },
    
    send() {
      
    }
  }
};
</script>
