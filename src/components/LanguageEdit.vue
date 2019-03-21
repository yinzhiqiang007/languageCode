<template>
  <form class="form-horizontal" role="form" @submit.prevent="updateCode" >
  <div class="form-group">
		<label for="firstname" class="col-sm-2 control-label">产品</label>
		<div class="col-sm-2">
			<label for="firstname" class="col-sm-4 control-label" style="text-align:left">{{languageCode.productName}}</label>
		</div>
	</div>
  <div class="form-group">
		<label for="firstname" class="col-sm-2 control-label" >模块</label>
		<div class="col-sm-2">
			<label for="firstname" class="col-sm-6 control-label" style="text-align:left">{{languageCode.moduleName}}</label>
		</div>
	</div>
  <div class="form-group">
		<label for="firstname" class="col-sm-2 control-label">Key</label>
		<div class="col-sm-2">
			<label for="firstname" class="col-sm-2 control-label">{{languageCode.positionKey}}</label>
		</div>
	</div>
	<div class="form-group">
		<label for="firstname" class="col-sm-2 control-label">CN</label>
		<div class="col-sm-2">
			<input type="text" class="form-control"  id="cn"  v-model="languageCode.cn"
				   placeholder="请输入名字">
		</div>
	</div>
	<div class="form-group">
		<label for="lastname" class="col-sm-2 control-label">TW</label>
		<div class="col-sm-2">
			<input type="text" class="form-control" id="tw"  v-model="languageCode.tw"
				   placeholder="请输入姓">
		</div>
	</div>

  <div class="form-group">
		<label for="lastname" class="col-sm-2 control-label">HK</label>
		<div class="col-sm-2">
			<input type="text" class="form-control" id="hk"  v-model="languageCode.hk"
				   placeholder="请输入姓">
		</div>
	</div>

  <div class="form-group">
		<label for="lastname" class="col-sm-2 control-label">EN</label>
		<div class="col-sm-2">
			<input type="text" class="form-control" id="en"  v-model="languageCode.en"
				   placeholder="请输入姓">
		</div>
	</div>

  <div class="form-group">
		<label for="lastname" class="col-sm-2 control-label">IT</label>
		<div class="col-sm-2">
			<input type="text" class="form-control" id="it"  v-model="languageCode.it"
				   placeholder="请输入姓">
		</div>
	</div>

  <div class="form-group">
		<label for="lastname" class="col-sm-2 control-label">ES</label>
		<div class="col-sm-2">
			<input type="text" class="form-control" id="es"  v-model="languageCode.es"
				   placeholder="请输入姓">
		</div>
	</div>

  <div class="form-group">
		<label for="lastname" class="col-sm-2 control-label">EU</label>
		<div class="col-sm-2">
			<input type="text" class="form-control" id="eu"  v-model="languageCode.eu"
				   placeholder="请输入姓">
		</div>
	</div>




	<div class="form-group">
		<div class="col-sm-offset-2 col-sm-2">
			<button type="submit" class="btn btn-default">更新</button>
		</div>
	</div>
</form>
</template>

<script>
import axios from "axios";
export default {
  name: "LanguageEdit",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      user: {
        name: "尹志强",
        age: 100
      },
      languageCode: {},
      productList:[],
      moduleList:[],
      productText:"产品",
      moduleText:"模块",
      param:"",
      productId:"",
      moduleId:"",
      id:this.$route.params.id

    };
  },
  mounted: function() {

    const self = this;

    axios.post(
        "http://localhost:8081/iot/language/languageView",
        { id: self.id },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(function(resp) {
        console.log(resp.data.data[0]);
        self.languageCode = resp.data.data[0];
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
    });
  },
  methods: {
    updateCode(e){
      const self = this;
      console.log(this.languageCode);

      axios({
        method: 'post',
        url:"http://localhost:8081/iot/language/updateLanguageCode",
        params: this.languageCode

      }).then(function(resp) {
        console.log(resp.data);
				self.$Message.success(resp.data.message);
        // self.languageCode = resp.data.data[0];
      }).catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
      });
      
    },

  }
};
</script>
