<template>
  <div class="container">
    <div class="row clearfix">
      <div class="col-md-12 column">
        <nav class="navbar navbar-default" role="navigation">

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <!-- <ul class="nav navbar-nav">

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
            </ul> -->

            <form class="navbar-form navbar-left" role="search">
              <div class="form-group">
                <input type="text" class="form-control" v-model="param"  >
              </div>
              <button type="button" class="btn btn-default" @click="checkCode(null,null)" >查询</button>
            </form>

            <ul class="nav navbar-nav navbar-right">
              <li>
                <router-link  :to="{ name: 'AddKey'}">创建Key</router-link>
              </li>
            </ul>

          </div>
        </nav>


        <table class="table">
          <thead  >
            <tr>
              <th class=" text-center">Key</th>
              <th class=" text-center">名称</th>
              <th class=" text-center">产品</th>
              <th class=" text-center">级别</th>
              <th class=" text-center">编辑</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <td>{{item.code}}</td>
              <td>{{item.name}}</td>
              <td>{{item.productName}}</td>
              <td>{{item.level}}</td>

              <td>
              <!-- <router-link target="_blank" :to="{ name: 'LanguageEdit', params: { id: item.id }}">编辑</router-link> -->
              </td>

              
            </tr>
          </tbody>
        </table>
        <!-- <Page v-bind:total="total" :page-size="pageSize" @on-change="ddddd" @on-page-size-change="aaaaa" show-sizer show-elevator /> -->

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  
  name: "KeyList",
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
      param:"",
      productId:"",
      activeName:"1-3",
      pathName:"Key列表",
      current:1,
      pageSize:10,
      total:0,

    };
  },
  mounted: function() {
    this.$router.push({
      name: "KeyList",
      query: { index: 1, pathName: "Key列表" }
		});

    const self = this;
    axios.post(
        "/language/keyList",
        { param: "" }
      )
      .then(function(resp) {
        console.log(resp.data.data);
        self.list = resp.data.data;
        self.total = self.list.length
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
    });

    axios.post(
      "/language/listByProduct"
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
   
    checkCode(id,name){
      const self = this;
      
      axios({
          url:"/language/keyList",
          params:{"code":self.param }
        })
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
