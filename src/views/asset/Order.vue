<template>
  <div class="page">
    <div class="head">
      <i class="fa fa-arrow-left" @click="backHome()"></i>
      <span class="text">订单记录</span>
      <span class="more">···</span>
    </div>
    <div class="body">
      <ul class="tabs">
        <li>进行中</li>
        <li>已完成</li>
      </ul>
      <table>
        <thead>
        <tr>
          <th>类型</th>
          <th>数量</th>
          <th>总价</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>aaa</td>
          <td>111</td>
          <td>222</td>
          <td>2018/8/8</td>
          <td>删除</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
    methods:{
      backHome(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .page{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: #ffffff;
    z-index: 1000;
  }
  .head{
    height:1.16rem;
    line-height: 1.16rem;
    color: #ffffff;
    font-size: 0.36rem;
    background: #4db232;
  }
  .head i.fa{
    float: left;
    padding:0.35rem 0.4rem;
    font-size: 0.4rem;
    position: relative;
  }
  .head .more{
    float: right;
    padding:0 0.4rem;
  }
  .tabs{
    width:5.8rem;
    height:0.7rem;
    line-height:0.7rem;
    margin:0.2rem auto 0.3rem;
    border:1px solid #197700;
    border-radius:0.7rem ;
    overflow: hidden;
    background: #ffffff;
    display: flex;
  }
  .tabs li{
    flex:auto;
    width: 50%;
    background: #197700;
    color: #ffffff;
    font-size: 0.3rem;
  }
  .body table{
    width: 100%;
    border-spacing:0;
  }
  table thead{
    background: #f5f5f5;
  }
  table th,table td{
    padding:0.2rem 0;
  }
</style>
