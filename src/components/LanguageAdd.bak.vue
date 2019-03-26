<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="一级Key" prop="key1">
      <Row :gutter="6">
        <Col push="0" span="5">
          <Select v-model="formValidate.key1" placeholder="请选择一级Key">
            <Option v-for="item in key1List" :value="item.code" :key="item.code" >{{item.name}}</Option>
          </Select>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="二级Key" prop="key2">
      <Row :gutter="6">
        <Col push="0" span="5">
          <Select v-model="formValidate.key2" placeholder="请选择二级Key">
            <Option v-for="item in key2List" :value="item.code" :key="item.code" >{{item.name}}</Option>
          </Select>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="三级Key" prop="key3">
      <Row :gutter="6">
        <Col push="0" span="5">
          <Select v-model="formValidate.key3" placeholder="请选择三级Key">
            <Option v-for="item in key3List" :value="item.code" :key="item.code" >{{item.name}}</Option>
          </Select>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="描述" prop="desc">
      <Row :gutter="6">
        <Col push="0" span="5">
          <Input type="textarea" v-model="formValidate.desc" placeholder="说点什么吧"></Input>
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
        languageCode:""
      },
      languageList: [],
      languageCodeList: [],
      key1List: [],
      key2List: [],
      key3List: [],
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
            url: "/language/addLanguageCode",
            params: this.formValidate
          })
            .then(function(resp) {
              console.log(resp.data);
              if (resp.data.code == "000000") {
                self.languageCodeList = resp.data.data;
                // self.languageCodeList.push.apply(self.languageCodeList,resp.data.data);
                self.$Message.success(resp.data.message);
              } else {
                if(resp.data.data){
                  self.languageCodeList = resp.data.data;
                }
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
    }
  },
  mounted: function() {
    this.$router.push({
      name: "LanguageAdd",
      query: { index: 1, pathName: "创建字串" }
    });

    const self = this;
    axios.post("/language/languageList")
      .then(function(resp) {
        self.languageList = resp.data.data;
        console.log(self.languageList);
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
      });
    
    axios.post("/language/listByPositionCode?level=1")
      .then(function(resp) {
        self.key1List = resp.data.data;
        console.log(self.key1List);
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
      });

    axios.post("/language/listByPositionCode?level=2")
      .then(function(resp) {
        self.key2List = resp.data.data;
        console.log(self.key2List);
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
      });

    axios.post("/language/listByPositionCode?level=3")
      .then(function(resp) {
        self.key3List = resp.data.data;
        console.log(self.key3List);
      })
      .catch(resp => {
        console.log("请求失败：" + resp.status + "," + resp.statusText);
      });

  }
};
</script>
