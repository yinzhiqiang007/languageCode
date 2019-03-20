<template>
 
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

                <FormItem label="产品" prop="productId">
                    <Select v-model="formValidate.productId" placeholder="选择产品" >
                        <Option v-for="item in productList" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>

                <FormItem label="模块" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your module"></Input>
                </FormItem>

                <FormItem label="模块" prop="name" style="margin-left: 1px">
                    <span style="margin-left: 1px">123水电费</span>
                  
                </FormItem>


                <FormItem label="版本" prop="version">
                    <Input v-model="formValidate.version" placeholder="请输入版本号" number></Input>
                </FormItem>

                
                <FormItem label="Desc" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">创建</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button>
                </FormItem>
            </Form>
</template>
<script>
import axios from "axios";
export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    productId: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: '',
                    version: ''
                },
                productList:[],
                activeName:"1-2",
                ruleValidate: {
                    name: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        { message: '太长了',max:20, trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    productId: [
                        { required: true,type: 'number', message: 'Please select the product', trigger: 'change' }
                    ],
                    version: [
                        { required: true,type: 'number',message: '请输入数字', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        { type: 'string', min: 2,max:100, message: '请输入长度2-100的字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                const self = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(this.formValidate);
                        axios({
                            method: 'post',
                            url:"http://localhost:8081/iot/language/addModule",
                            params: this.formValidate
                        }).then(function(resp) {
                            console.log(resp.data);
                            self.$Message.success('Success!');
                        }).catch(resp => {
                            console.log("请求失败：" + resp.status + "," + resp.statusText);
                        });

                        
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        mounted: function() {
            this.$router.push({name:"ModuleEdit",query:{index:1,pathName:"创建模块"}});

            const self = this;

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
        }
    }
</script>
