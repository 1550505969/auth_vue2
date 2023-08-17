<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 10px;">
        <el-card class="box-card"> 
          <div class="user">
            <img src="../assets/logo.png">
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="login-info">
            <p>上次登陆时间：<span>2023-8-9</span></p>
            <p>上次登陆地点：<span>武汉</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px;">
          <el-table
            :data="tableData"
            style="width: 100%"
            height="460">
            <el-table-column v-for="(val,key) in tableLabel" :key="key"
              :prop="key"
              :label="val">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left: 10px;">
        <div class="num">
          <el-card v-for="(item,index) in countData" :key="index" :body-style="{display:'flex',padding:'0px'}" style="width: 32%; margin-bottom: 20px;margin-left: 9px;;">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px;">
          <!-- 折线图 -->
          <div ref="echarts1" style="height: 280px;"></div>
        </el-card>
        <div class="graph">
          <el-card style="width: 48%;height: 295px;">
            <div ref="echarts2" style="height: 260px;"></div>
          </el-card>
          <el-card style="width: 48%;height: 295px;">
            <div ref="echarts3" style="height: 240px;"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getData} from '../api'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      tableData:[],
      // tableData: [{
      //       date: '2016-05-02',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1518 弄'
      //     }, {
      //       date: '2016-05-04',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1517 弄'
      //     }, {
      //       date: '2016-05-01',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1519 弄'
      //     }, {
      //       date: '2016-05-03',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1516 弄'
      //     }, {
      //       date: '2016-05-04',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1517 弄'
      //     }, , {
      //       date: '2016-05-03',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1516 弄'
      //     }, {
      //       date: '2016-05-04',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1517 弄'
      //     },{
      //       date: '2016-05-01',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1519 弄'
      //     }],
      tableLabel:{
        name:'名称',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'总购买'
      },
      countData:[
        {
          name:'今日支付订单',
          value:1234,
          icon:"success",
          color:'#2ec7c9'
        },
        {
          name:'今日支付订单',
          value:1234,
          icon:"success",
          color:'#2ec7c9'
        },
        {
          name:'今日支付订单',
          value:1234,
          icon:"success",
          color:'#2ec7c9'
        },
        {
          name:'今日支付订单',
          value:1234,
          icon:"success",
          color:'#2ec7c9'
        },
        {
          name:'今日支付订单',
          value:1234,
          icon:"success",
          color:'#2ec7c9'
        },
        {
          name:'今日支付订单',
          value:1234,
          icon:"success",
          color:'#2ec7c9'
        },
      ]
    }
  },
  mounted(){
    getData().then(({data}) => {
      const {tableData} = data.data
      console.log(data.data);
      this.tableData = tableData

      // 初始化echarts
      const echarts1 = echarts.init(this.$refs.echarts1)
      // 指定图表的配置项和数据
      var echarts1Option ={}
      // 处理数据xAxis 折线图x轴数据
      const {orderData,userData,videoData} = data.data
      const xAxis = Object.keys(orderData.data[0])
      const xAxisData = {
        data:xAxis
      }
      echarts1Option.xAxis = xAxisData
      echarts1Option.yAxis = {}
      echarts1Option.legend = xAxisData
      echarts1Option.series = []
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name:key,
          data:orderData.data.map(item => item[key]),
          type:'line'
        })
      })
      echarts1.setOption(echarts1Option)

      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2)
      const echarts2Option = {
        legend:{
          textStyle:{
            color:'#333',
          }
        },
          grid:{
            trigger:'axis'
          },
          xAxis:{
            type:'category',
            data:userData.map(item => item.date),
            axisLine:{
              lineStyle:{
                color:'#17b3a3'
              }
            },
            axisLabel:{
              interval:0,
              color:'#333'
            }
          },
          yAxis:[
            {
              type:'value',
              axisLine:{
                lineStyle:{
                  color:'#17b3a3'
                }
              }
            }
          ],
          color:['#2ec7c9','#b6a2de'],
          series:[
            {
              name:'新增用户',
              data:userData.map(item => item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:userData.map(item => item.active),
              type:'bar'
            }
          ]
        }
      echarts2.setOption(echarts2Option)

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts3Option = {
        tooltip:{
          trigger:'item',
        },
        color:[
          '#0f784f',
          '#dd536b',
          '#9462ee5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf'
        ],
        series:[
          {
            data:videoData,
            type:'pie'
          }
        ]
      }
      echarts3.setOption(echarts3Option)
    })
  }
}
</script>

<style scoped>
  .user{
    border: 1px solicd #ccc;
    display: flex;
    align-items: center;
    height: 100%;
  }
  img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .name{
    font-size: 32px;
    margin-bottom: 10px;
  }
  .access{
    color: #999999;
  }
  .login-info p{
    line-height: 20px;
    font-size: 14px;
    color: #999999;
  }
  .login-info span{
    line-height: 20px;
    font-size: 14px;
    color: #999999;
    margin-left: 60px;
  }
  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .num .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
  }

  .detail .price{
    font-size: 30px;
    margin-bottom: 10px;
    line-height: 30px;
  }

  .detail .desc{
    font-size: 14px;
    text-align: center;
    color: #999;
  }

.graph{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>