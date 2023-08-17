<template>
  <div class="manager">
    <el-dialog
      title="用户信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <!-- 用户表单信息 -->
      <el-form ref="form" 
        :inline="true" 
        :model="form" 
        label-width="80px" 
        :rules="rules">
        <!-- prop与rules中的key一致 -->
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" type="text" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="请选择日期"
            value-format="yyyy-MM-DD">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" type="text" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manager-header">
      <el-button type="primary" @click="handlerAdd">
        + 新增
      </el-button>
      <!-- form的搜索区 -->
      <el-form :model="userForm" :inline="true">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table
          :data="tableData"
          style="width: 100%;"
          height="90%"
          :stripe="true">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex === 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="addr"
          label="地址">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handledelete(scope.row)">删除</el-button>
          </template>1
        </el-table-column>
        </el-table>
        <div class="pager">
          <el-pagination
            layout="prev,pager,next"
            :total="total"
            @current-change="handlePage">    
          </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import {getUser,addUser,editUser,deleteUser} from '../api'
export default {
  name:'User',
  data() {
      return {
        dialogVisible: false,
        form:{
          name:'',
          age:'',
          sex:'',
          birth:'',
          addr:''
        },
        tableData:[],
        rules:{
          name:[
            {required:true,message:'请输入姓名',}
          ],
          age:[
            {required:true,message:'请输入年龄',}
          ],
          sex:[
            {required:true,message:'请选择性别',}
          ],
          birth:[
            {required:true,message:'请选择出生日期',}
          ],
          addr:[
            {required:true,message:'请输入地址',}
          ],
        },
        modelType:0,
        // 当前总条数默认为0
        total:0 ,
        pageData:{
          page:1,
          limit:10
        },
        userForm:{
          name:''
        }
      };
    },
    methods: {
      // 提交用户表单
      submit(){
        this.$refs.form.validate((valid) => {
          if(valid){
            // 后续对表单数据处理
            if( this.modelType === 0){
              addUser(this.form).then(() =>{
                // 重新获取列表的接口
                this.getList()
              })
            }else{
              editUser(this.form).then(() =>{
                // 重新获取列表的接口
                this.getList()
              })
            }
            // 关闭弹窗
            this.dialogVisible = false
            this.$refs.form.resetFields()
          }
        })
      },
      // 弹窗关闭时候
      handleClose(){
        // 清空数据
        this.$refs.form.resetFields()
        this.dialogVisible = false
      },
      cancle(){
        this.handleClose()
      },
      // 编辑
      handleEdit(row){
        this.modelType = 1
        this.dialogVisible = true
        // 进行数据的深拷贝
        this.form = JSON.parse(JSON.stringify(row))
      },
      // 删除
      handledelete(row){
        this.$confirm('此操作将删除该用户信息，是否继续？','系统提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(() => {
          deleteUser({id:row.id}).then(() => {
            this.$message({
              type:'success',
              message:'删除成功'
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        })
      },
      handlerAdd(){
        this.dialogVisible = true
        this.modelType = 0
      },
      getList(){
        getUser({params:{...this.userForm,...this.pageData}}).then(({data}) => {
          console.log('用户数据',data);
          this.tableData = data.list
          this.total = data.count || 0
        })
      },
      // 分页数据 参数为当前页码
      handlePage(val){
        this.pageData.page = val
        this.getList()
      },
      // 列表查询条件
      onSubmit(){
        this.getList()
      }
    },
    mounted(){
      this.getList()
    }
}
</script>

<style>
  .manager{
    height: 90%;
  }
  .common-table{
    position: relative;
    height: calc(100% - 62px);
  }
  .pager{
    position: absolute;
    bottom: 0;
    right: 20px;
  }
  .manager-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>