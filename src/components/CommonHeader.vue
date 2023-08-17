<template>
  <div class="header-container">
    <div class="l-content">
        <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item  v-for="item in tags" :key="item.path" :to="{path:item.path}" style="cursor: pointer;">{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown>
            <span class="el-dropdown-link">
                <img class="user" src="../assets/logo.png">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookie from 'js-cookie'
export default {
    methods: {
        handleMenu(){
            this.$store.commit('collapseMenu')
        },
        logout(){
            Cookie.remove('token')
            Cookie.remove('menu')
            this.$router.push({name:'login'})
        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabsList
        })
    }
}
</script>

<style>
.header-container{
    padding: 0 20px;
    background-color: #333;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.text{
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
}
.user{
    width: 40px;
    height: 10px;
    border-radius: 50%;
}
.l-content{
    display:flex;
    align-items: center;
}
:deep(.el-breadcrumb_inner,.is-link){
    color:#666
}
:deep(.el-breadcrumb_inner){
    font-weight: normal;
}
</style>