<template>
  <div class="tabs">
    <el-tag
        v-for="(item,index) in tags"
        :key="item.path"
        :effect="$route.name === item.name ? 'dark' : 'plain'"
        :closable="item.name !== 'home'"
        size="small"
        @click="changeMenu(item)"
        @close="handleClose(item,index)"
        style="cursor: pointer; margin-left: 10px;">
        {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';

export default {
    name:'CommonTag',
    data() {
        return {
            
        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabsList
        })
    },
    methods: {
        ...mapMutations(['closeTag']),
        // 点击tag跳转的功能
        changeMenu(item){
            console.log(item);
            this.$router.push({name:item.name})
        },
        // 点击tag删除功能
        handleClose(item,index){
            // 删除tag
            this.closeTag(item)
            const length = this.tags.length
            // 删除并且跳转
            if(item.name !== this.$route.name){
                return
            }
            if(index === length){
                this.$router.push(this.tags[index-1].path)
            }else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    },
}
</script>

<style>

</style>