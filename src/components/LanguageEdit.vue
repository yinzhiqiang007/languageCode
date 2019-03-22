<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

		<FormItem label="产品" prop="positionKey" >
      <Row :gutter="6">
				<Col span="5">
          <Input v-model="positionKey"  placeholder="请输入key"></Input>
        </Col>
      </Row>
    </FormItem>
		<FormItem label="Key" >
      <Row :gutter="6">
        <Col  span="5">
					<Input v-model="productName"  placeholder="请输入key" readonly></Input>
        </Col>
      </Row>
    </FormItem>

		<FormItem v-for="item in languageCodeList" v-bind:label="item.languageCode" >
      <Row :gutter="6">
        <Col  span="5">
					<Input v-model="item.value"  placeholder="请输入key" readonly></Input>
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
          <Input v-model="formValidate.value" placeholder="请输入key"></Input>
        </Col>
        <Col span="1">
          <!-- <Button type="primary" @click="handleSubmit('formValidate')">添加</Button> -->
        </Col>
      </Row>
    </FormItem>

    <FormItem>
      <Row :gutter="6">
        <Col push="0" span="5">
          <Button type="primary" @click="handleSubmit('formValidate')">创建</Button>
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
      activeName: "1-1",
      pathName: "创建字串",
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
    handleSubmit(name) {
      const self = this;
      console.log(this.formValidate);
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.formValidate);
          axios({
            method: "post",
            url: "http://localhost:8081/iot/language/addLanguageCodeByCn",
            params: this.formValidate
          })
            .then(function(resp) {
              console.log(resp.data);
              if (resp.data.code == "000000") {
								self.languageCodeList = resp.data.data;
                self.$Message.success(resp.data.message);
              } else {
                self.$Message.error(resp.data.message);
              }
            })
            .catch(resp => {
              console.log("请求失败：" + resp.status + "," + resp.statusText);
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
		},
		// listByCode(){
		// 	axios.post("http://localhost:8081/iot/language/listByCode?code="+self.positionKey)
    //   .then(function(resp) {
    //     self.languageCodeList = resp.data.data;
    //     console.log(self.languageCodeList);
    //   })
    //   .catch(resp => {
    //     console.log("请求失败：" + resp.status + "," + resp.statusText);
    //   });
		// }

  },
  mounted: function() {
    this.$router.push({
      name: "LanguageEdit",
      query: { index: 1, pathName: "编辑字串" }
		});

		// listByCode();

		axios.post("http://localhost:8081/iot/language/listByCode?code="+this.positionKey)
      .then(function(resp) {
        self.languageCodeList = resp.data.data;
        console.log(self.languageCodeList);
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
      });

		


    const self = this;
    axios.post("http://localhost:8081/iot/language/languageList")
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
