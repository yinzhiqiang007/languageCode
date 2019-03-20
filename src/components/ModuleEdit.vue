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
                <FormItem label="版本" prop="version">
                    <Input v-model="formValidate.version" placeholder="Enter your module"></Input>
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
                    desc: ''
                },
                productList:[],
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    productId: [
                        { required: true,type: 'number', message: 'Please select the product', trigger: 'change' }
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
            
            this.$refs.LeftMenuTemplate.activeName='1-2';
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
