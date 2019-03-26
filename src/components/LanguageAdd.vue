<template>
  <Form ref="formValidate" :model="formValidate"  :rules="ruleValidate" :label-width="80">

    <FormItem label="一级Key" prop="key1" >
      <Row :gutter="6">
        <Col push="0" span="5" style="text-align:left">
          <AutoComplete
              icon="ios-search"
              v-model="formValidate.key1"
              :data="key1List"
              :filter-method="filterMethod"
              placeholder="input here"
              style="width:200px">
          </AutoComplete>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="二级Key" prop="key2">
      <Row :gutter="6">
        <Col push="0" span="5" style="text-align:left">
          <AutoComplete
              icon="ios-search"
              v-model="formValidate.key2"
              :data="key2List"
              :filter-method="filterMethod"
              placeholder="input here"
              style="width:200px">
          </AutoComplete>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="三级Key" prop="key3">
      <Row :gutter="6">
        <Col push="0" span="5" style="text-align:left">
          <AutoComplete
              icon="ios-search"
              v-model="formValidate.key3"
              :data="key3List"
              :filter-method="filterMethod"
              placeholder="input here"
              style="width:200px">
          </AutoComplete>
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
        key1: "",
        key2: '',
        key3: '',
				languageCode:"",
				positionKey:this.$route.params.positionKey,
			},
			positionKey: this.$route.params.positionKey,
			productName: this.$route.params.productName,
			languageList: [],
			languageCodeList: [],
			productList: [],
      productListAll: [],
      key1List: [],
      key2List: [],
      key3List: [],
      data3: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive'],
      activeName: "1-1",
      pathName: "创建字串",
      ruleValidate: {
        key1: [{ required: true, message: "请输入Key", trigger: "change" }],
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
    filterMethod (value, option) {
      console.log(value);
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
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
      this.$refs[name].validate((valid) => {
				if (valid) {
          const self = this;
          if(self.languageCodeList.length==0){
            self.$Message.error("请先添加语言");
          }
          axios.post("/language/addLanguageCodeByKey",
            {"positionKey":self.positionKey,
            "productList":self.productList,
            "languageCodeListList":self.languageCodeList,
            "key1":self.formValidate.key1,
            "key2":self.formValidate.key2,
            "key3":self.formValidate.key3}
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
        }
			});
    },
    handleReset(name) {
      this.$refs[name].resetFields();
		},

  },
  mounted: function() {
		const self = this;

    this.$router.push({
      name: "LanguageAdd",
      query: { index: 1, pathName: "创建字串" }
		});

		axios.post("/language/listByProduct"
    ).then(function(resp) {
      self.productListAll = resp.data.data;
      console.log(self.productListAll);
    })
    .catch(resp => {
      console.log("请求失败：" + resp.status + "," + resp.statusText);
    });

    axios.post("/language/listByPositionCode?level=1")
      .then(function(resp) {
        self.key1List = resp.data.data.map(function(item){
          return item.code;
        });
        console.log("----------"+self.data3);
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
      });

    axios.post("/language/listByPositionCode?level=2")
      .then(function(resp) {
        self.key2List = resp.data.data.map(function(item,index,arr){
          return item.code;
        });
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
      });

    axios.post("/language/listByPositionCode?level=3")
      .then(function(resp) {
        self.key3List = resp.data.data.map(function(item,index,arr){
          return item.code;
        });
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
