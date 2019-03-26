<template>
  <Form ref="formValidate" :model="formValidate"  :rules="ruleValidate" :label-width="80">
		<FormItem label="Key" >
      <Row :gutter="6">
        <Col  span="5">
					<Input v-model="positionKey"  placeholder="请输入key" readonly></Input>
        </Col>
      </Row>
    </FormItem>

		<FormItem label="产品" prop="positionKey" >
      <Row :gutter="6"  type="flex" style="text-align: left" >
				<Col span="20">
          <Tag v-for="item in productList" :key="item.id" :name="item.id" closable @on-close="handleClose">{{ item.name }}</Tag>
    			<!-- <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button> -->
					<Poptip placement="right" width="400">
						<Button>添加产品</Button>
						<div class="api" slot="content">
								<Button  v-for="item in productListAll" :key="item.id" :name="item.id" icon="ios-add" type="dashed" size="small" @click="handleAdd(item.id,item.name)">{{ item.name }}</Button>

						</div>
				</Poptip>

        </Col>
      </Row>
    </FormItem>
		

		<FormItem v-for="item in languageCodeList" v-bind:label="item.languageCode" >
      <Row :gutter="6">
        <Col  span="5">
					<!-- <Input v-model="item.value" @on-keyup="handleKey($event,item.languageCode,item.id)"  placeholder="请输入key" ></Input> -->
					<Input v-model="item.value"  placeholder="请输入key" ></Input>
        </Col>
      </Row>
    </FormItem>


    <FormItem label="语言" prop="languageCode">
      <Row :gutter="6">
        <Col push="0" span="5">
          <Select v-model="formValidate.languageCode" placeholder="选择语言" :label-width="20">
            <Option v-for="item in languageList" :value="item.key" :key="item.key" >{{item.name}}</Option>
          </Select>
        </Col>

        <Col span="5">
					<FormItem label="" prop="value">
						<Input v-model="formValidate.value" placeholder="请输入key"></Input>
					</FormItem>
        </Col>
        <Col span="1">
          <Button type="primary" @click="handleAddLanguage('formValidate')">添加</Button>
        </Col>
      </Row>
    </FormItem>

    <FormItem>
      <Row :gutter="6">
        <Col push="0" span="5">
          <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
          <Icon custom="i-icon i-icon-shop_fill" size="24"/>
          <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button> -->
        </Col>
      </Row>
    </FormItem>
  </Form>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      formValidate: {
        name: "",
        value: "",
        mail: "",
        productId: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: "",
				languageCode:"",
				positionKey:this.$route.params.positionKey,
			},
			positionKey: this.$route.params.positionKey,
			productName: this.$route.params.productName,
			languageList: [],
			languageCodeList: [],
			productList: [],
			productListAll: [],
      activeName: "1-1",
      pathName: "编辑字串",
      ruleValidate: {
        key1: [{ required: true, message: "请选择产品", trigger: "change" }],
        languageCode: [
          { required: true, message: "请选择语言", trigger: "change" }
        ],
        value: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        desc: [
          { message: "Please enter a personal introduction", trigger: "blur" },
          {
            type: "string",
            min: 2,
            message: "Introduce no less than 2 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
		handleAdd(id,name) {
			if(this.productList.findIndex(p => p.id == id)<0){
				this.productList.push.apply(this.productList,[{"id":id,"name":name}]);
			}else{
				this.$Message.error("产品已经添加!");
			}
				
		},
		handleClose(event, name) {
				this.productList = this.productList.filter(t => t.id != name)
		},
		handleKey(e,languageCode,id){
			const self = this;
			axios({method: "post",
          url:"/language/updateLanguageCode",
          params:{ "positionKey":self.positionKey,"value":e.srcElement.value,"languageCode":languageCode,"id":id},
        })
        .then(function(resp) {
          console.log(resp.data);
        })
        .catch(resp => {
          console.log("请求失败：" + resp.status + "," + resp.statusText);
      });
		},
		handleAddLanguage(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					const self = this;
					if(this.languageCodeList.findIndex(p => p.languageCode == this.formValidate.languageCode)<0){
						this.languageCodeList.push.apply(this.languageCodeList,[{"languageCode":this.formValidate.languageCode,"value":this.formValidate.value}]);
					}else{
						this.$Message.error("字串类型已经存在!");
					}
				}
			});
    },
    handleSubmit(name) {
      const self = this;
			console.log({"positionKey":self.positionKey,"productList":self.productList,"languageCodeListList":self.languageCodeList});
			axios.post("/language/updateLanguageCodeByKey",
				{"positionKey":self.positionKey,"productList":self.productList,"languageCodeListList":self.languageCodeList}
			).then(function(resp) {
					console.log(resp.data);
					if (resp.data.code == "000000") {
						self.$Message.success(resp.data.message);
					} else {
						self.$Message.error(resp.data.message);
					}
				})
				.catch(resp => {
					console.log("请求失败：" + resp.status + "," + resp.statusText);
				});
    },
    handleReset(name) {
      this.$refs[name].resetFields();
		},

  },
  mounted: function() {
		const self = this;

    this.$router.push({
      name: "LanguageEdit",
      query: { index: 1, pathName: "编辑字串" }
		});

		axios.post("/language/listByProduct"
    ).then(function(resp) {
      self.productListAll = resp.data.data;
      console.log(self.productListAll);
    })
    .catch(resp => {
      console.log("请求失败：" + resp.status + "," + resp.statusText);
    });


		axios.post("/language/listByCode?code="+this.positionKey)
      .then(function(resp) {
				self.languageCodeList = resp.data.data.languageCodeList;
				self.productList = resp.data.data.productList;
        console.log(self.languageCodeList);
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
      });

   
    axios.post("/language/languageList")
      .then(function(resp) {
        self.languageList = resp.data.data;
        console.log(self.languageList);
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
      });
	}
};
</script>
