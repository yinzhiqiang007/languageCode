<template>
  <div class="container">
    <div class="row clearfix">
      <div class="col-md-12 column">
        <nav class="navbar navbar-default" role="navigation">

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <!-- <li class="active">
                <a href="#">Link</a>
              </li> -->
              <!-- <li>
                <a href="#">Link</a>
              </li> -->

              

              <li class="dropdown">
                <a href="javascript:void(0)"  class="dropdown-toggle" v-model="productId" data-toggle="dropdown">
                  {{productText}}<strong class="caret"></strong>
                </a>

                <ul class="dropdown-menu">

                  <!-- <li><a href="javascript:void(0)" @click="checkCode('','全部')" >全部</a></li>
                  <li v-for="item in productList">
                    <a href="javascript:void(0)" @click="checkCode(item.id,item.name)"   >{{item.name}}</a>
                  </li> -->


                <CheckboxGroup v-model="checkProductGroup" @on-change="checkAllProductGroupChange">
                  <li v-for="item in productList">
                  <Row >
                    <Col><Checkbox :label="item.id">{{item.name}}</Checkbox></Col>
                  </Row>
                  </li>
                </CheckboxGroup>

                </ul>
              </li>

            </ul>
            

            <form class="navbar-form navbar-left" role="search">
              <div class="form-group">
                <!-- <input type="text" class="form-control" v-model="param"  > -->
                <AutoComplete
                    icon="ios-search"
                    v-model="param"
                    :data="keywordList"
                    :filter-method="filterMethod"
                    @on-change="handleKeyUp"
                    @on-search="checkCode(null,null)"
                    placeholder="input here"
                    style="width:200px">
                </AutoComplete>
              </div>
              <button type="button" class="btn btn-default" @click="checkCode(null,null)" >查询</button>
            </form>


            <ul class="nav navbar-nav navbar-right">
              <li>
                <router-link  :to="{ name: 'LanguageAdd'}">创建字串</router-link>
              </li>
            </ul>

          </div>
        </nav>


        <table class="table">
          <thead  >
            <tr>
              <th class=" text-center">Key</th>
              <th class=" text-center">产品</th>

              <th  v-for="item in titleList" class=" text-center">{{item.name}}</th>
              <th class=" text-center">编辑</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <td>{{item.positionKey}}</td>
              <td>{{item.productName}}
                <tag v-for="p in item.productList">{{p.name}}</tag></td>
              <td   v-for="titleItem in titleList"  >{{item[titleItem.key]}}</td>

              <td>
              <router-link  :to="{ name: 'LanguageEdit', params: { positionKey: item.positionKey}}">编辑</router-link>
              </td>

              
            </tr>
          </tbody>
        </table>
        <Page v-bind:total="total" :page-size="pageSize" @on-change="ddddd" @on-page-size-change="aaaaa" show-sizer show-elevator />
        <!-- <button type="button" @click="exportExcel()" class="btn btn-default">导出字串表</button> -->
        <Row :gutter="1">
        <Col  span="3">
					<Button @click="exportExcel()" icon="ios-cloud-download-outline">导出字串表</Button>
        </Col>
        <Col  span="1">
					<Upload  name="file" :format="['xls','xlsx']" :on-format-error="handleFormatError" accept=".xlsx,.xls" v-bind:action="uploadUrl" :on-success="sss">
              <Button icon="ios-cloud-upload-outline">导入字串表</Button>
          </Upload>
        </Col>
      </Row>
      

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  
  name: "LanguageView",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      user: {
        name: "尹志强",
        age: 100
      },
      list: [],
      titleList: [],
      productList:[],
      keywordList:[],
      checkProductGroup:[],
      productText:"请选择",
      param:"",
      productId:"",
      activeName:"1-1",
      pathName:"Key列表",
      current:1,
      pageSize:10,
      total:0,
      uploadUrl:axios.defaults.baseURL+"/language/importExcel",

    };
  },
  mounted: function() {
    this.$router.push({
      name: "LanguageView",
      query: { index: 1, pathName: "字串列表" }
		});

    const self = this;
    this.checkCode(null,null);

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
    checkAllProductGroupChange(data){
      this.checkCode(null,null);
      console.log(this.checkProductGroup)
    },
    handleKeyUp(){
      const self = this;
      axios.post(
        "/language/keywordList?param="+self.param
      )
      .then(function(resp) {
        console.log(self.keywordList);
        self.keywordList = resp.data.data;
        
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
      });
    },
    filterMethod (value, option) {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    handleFormatError(){
      this.$Message.error("请选择文件类型xlsx，xls");
    },
    sss(e){
      console.log(e.code);
      this.$Message.success("success");
    },
    ddddd(index){
      this.current= index;
      this.checkCode(null,null);
    },
    aaaaa(index){
      this.pageSize= index;
      this.checkCode(null,null);
    },
    // 下载文件
    download (data) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '字串列表.xlsx')
        
        document.body.appendChild(link)
        link.click()
    },
    checkCode(id,name){
      const self = this;

      if(id !=null ){
        self.productId = id;
      }
      if(name!=null){
        self.productText = name;
      }
      axios.post(
          "/language/languageView",
          { param:self.param,"productId":self.productId,"pageNum":self.current,"pageSize":self.pageSize,"checkProductGroup":self.checkProductGroup },
          {
            headers: { "Content-Type": "application/json" }
          }
        )
        .then(function(resp) {
          console.log(resp.data.data);
          self.list = resp.data.data.data.list;
          self.titleList = resp.data.data.title;
          self.total= resp.data.data.data.total;
        })
        .catch(resp => {
          console.log("请求失败：" + resp.status + "," + resp.statusText);
      });
    },
    exportExcel(){
      const self = this;
      axios({
            method: 'post',
            url: '/language/downLoadExcel',
            data: { param:self.param,"productId":self.productId },
            responseType: 'blob'
        }).then(response => {
            this.download(response.data)
        }).catch((error) => {

        })

    }
    
  }
};
</script>
