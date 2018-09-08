<template>
  <div class="page">
    <div class="head">
      <i class="fa fa-arrow-left" @click="backHome()"></i>
      <span class="text">交易记录</span>
      <span class="more">···</span>
    </div>
    <div class="body">
      <table>
        <thead>
          <tr>
            <th>甲方</th>
            <th>类型</th>
            <th>乙方</th>
            <th>数量</th>
            <th>总价</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>aaa</td>
            <td>bbb</td>
            <td>ccc</td>
            <td>111</td>
            <td>222</td>
            <td>2018/8/8</td>
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
