<template>
 
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

                <FormItem label="产品" prop="productId">
                    <Select v-model="formValidate.productId" placeholder="选择产品" >
                        <Option v-for="item in productList" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="Key等级" prop="level">
                    <Select v-model="formValidate.level" placeholder="选择级别" >
                        <Option  value="1">一级</Option>
                        <Option  value="2">二级</Option>
                        <Option  value="3">三级</Option>
                    </Select>
                </FormItem>

                <FormItem label="Key" prop="code">
                    <Input v-model="formValidate.code" placeholder="请输入key"></Input>
                </FormItem>
                <FormItem label="描述" prop="name">
                    <Input v-model="formValidate.name" placeholder="说点什么吧"></Input>
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
                    code: '',
                    mail: '',
                    productId: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                productList:[],
                activeName:"1-3",
                pathName:"创建Key",
                ruleValidate: {
                    name: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        { message: '太长了',max:20, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '不能为空',max:20, trigger: 'blur' },
                        { message: '太长了',max:20, trigger: 'blur' }
                    ],
                    productId: [
                        { required: true,type: 'number', message: '请选择产品', trigger: 'change' }
                    ],
                    level: [
                        { required: true, message: '请选择key级别', trigger: 'change' }
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
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 2, message: 'Introduce no less than 2 words', trigger: 'blur' }
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
                            url:"/language/addKey",
                            params: this.formValidate
                        }).then(function(resp) {
                            console.log(resp.data);
                            if(resp.data.code=="000000"){
                                self.$Message.success(resp.data.message);
                            }else{
                                self.$Message.error(resp.data.message);
                            }
                            
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
            this.$router.push({name:"AddKey",query:{index:1,pathName:"创建模块"}});

            const self = this;

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
        }
    }
</script>
