<template>
  <el-form label-width="70px" :model="form" :rules="rules" ref="form" class="login-container">
    <h3 class="login-title">系统登陆</h3>
    <el-form-item
        label="用户名"
        prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item
        label="密码"
        prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button @click="submit" type="primary" class="login-button">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '@/api'
export default {
    name:'Login',
    data() {
        return {
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    {required:true,message:'请输入用户名',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'}
                ]
            }
        }
    },
    methods: {
        submit(){
            // roken信息
            // const token = Mock.Random.guid()
            // // token信息放入cookie
            // Cookie.set('token',token)

            // 校验form表单
            this.$refs.form.validate((valid) => {
                if(valid){
                    getMenu(this.form).then(({data})=>{
                        if(data.code === 20000){
                            Cookie.set('token',data.data.token) 

                            // 获取菜单权限数据 存入store
                            this.$store.commit('setMenu',data.data.menu)
                            this.$store.commit('addMenu',this.$router)
                            this.$router.push('/home')
                        }else{
                            this.$message.error('用户名或密码错误！')
                        }
                    })
                }
            })
           
        }
    },
}
</script>

<style scoped>
    .login-container{
        width: 350px;
        border:1px solid #eaeaea;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        background-color: #fff;
        border-radius: 15px;
        box-shadow:  0 0 25px #cac6c6;
    }
    .el-input{
        width: 198px;
    }
    .login-title{
        text-align: center;
        margin-bottom: 30px;
    }
    .login-button{
        justify-items: center;
    }
</style>