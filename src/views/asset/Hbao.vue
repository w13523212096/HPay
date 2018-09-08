<template>
  <div class="page">
    <div class="head">
      <i class="fa fa-arrow-left" @click="backHome()"></i>
      <span class="text">H宝数字中心</span>
      <span class="record">H宝说明</span>
    </div>
    <div class="body">
      <div class="userinfo">
        <div class="income">
          <p class="text">累计收益(余额)</p>
          <p class="num">0.0000</p>
        </div>
        <ul>
          <li>
            <p class="text">H宝总资产</p>
            <p class="num">0.0000</p>
          </li>
          <li>
            <p class="text">可用资产</p>
            <p class="num">0.0000</p>
          </li>
        </ul>
      </div>
      <div class="tabs">
        <ul>
          <li v-for="(item,index) in recordType" @click="toggle(index)" :class="{active:index===activeItem}">{{item}}</li>
        </ul>
      </div>
      <div class="list">
        <div class="item" v-for="(item,index) in recordType" v-show="index===activeItem">
          <table>
            <thead>
            <tr>
              <th>来源</th>
              <th>数量(余额)</th>
              <th>时间</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>111</td>
              <td>111</td>
              <td>2018/8/8</td>
            </tr>
            <tr>
              <td>111</td>
              <td>111</td>
              <td>2018/8/8</td>
            </tr>
            <tr>
              <td>111</td>
              <td>111</td>
              <td>2018/8/8</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="btn clearfix">
        <button>转入</button>
        <button>转出</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        recordType:['收益记录','转入记录','转出记录'],
        activeItem:0
      }
    },
    methods:{
      backHome(){
        this.$router.go(-1);
      },
      toggle(index){
        this.activeItem = index;
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
    background: #f5f5f5;
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
  .head .record{
    font-size: 0.2rem;
    float: right;
    margin-right: 0.2rem;
  }
  .userinfo{
    background: #167703;
    padding:0.5rem 0 0.2rem;
    color: #ffffff;
    font-size: 0.26rem;
  }
  .userinfo .income .num{
    font-size: 0.3rem;
    margin-top: 0.3rem;
  }
  .userinfo ul{
    margin-top: 0.3rem;
    display: flex;
  }
  .userinfo ul li{
    width:50%;
    flex:auto;
  }
  .userinfo ul li .num{
    margin-top: 0.2rem;
  }
  .tabs ul{
    display: flex;
  }
  .tabs ul li{
    width:33.33%;
    flex:auto;
    padding:0.3rem 0 0.15rem;
    font-size: 0.28rem;
    border-bottom: 2px solid transparent;
  }
  .tabs ul li.active{
    color: #4db232;
    border-color: #3aab1d;
  }
  .item table{
    width: 100%;
    font-size: 0.28rem;
  }
  .item table th,.item table td{
    padding:0.2rem 0;
  }
  .btn{
    position: absolute;
    left:0;
    bottom:0;
    width:100%;
  }
  .btn button{
    width:50%;
    height:0.8rem;
    float: left;
    font-size: 0.3rem;
    color:#fff;
    background: #4db232;
  }
  .btn button:last-child{
    background: #125600;
  }
</style>
