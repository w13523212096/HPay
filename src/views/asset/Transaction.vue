<template>
  <div class="transaction">
    <div class="head">
      <i class="fa fa-arrow-left" @click="backHome()"></i>
      <span class="text">Hpay</span>
    </div>
    <div class="body">
      <div class="top">
        <div>
          <p class="text">Hpay</p>
          <p class="num">0.00</p>
        </div>
        <div>
          <p class="text">积分</p>
          <p class="num">0000</p>
        </div>
      </div>
      <div class="price">
        <div class="current">当前价格 <span>2.8555</span></div>
        <div class="max">高 <span>2.8555</span></div>
        <div class="min">低 <span>2.8555</span></div>
      </div>
      <div class="handle">

        <div>
          <router-link to="/asset/transaction/buying">
          <i class="fa fa-qrcode"></i>
          <p class="text">发布购买订单</p></router-link>
        </div>
        <div>
          <router-link to="/asset/transaction/sell">
            <i class="fa fa-qrcode"></i>
            <p class="text">发布出售订单</p></router-link>
        </div>
        <div>
          <router-link to="/asset/transaction/order">
          <i class="fa fa-qrcode"></i>
          <p class="text">订单</p></router-link>
        </div>
        <div>
          <router-link to="/asset/transaction/record">
          <i class="fa fa-qrcode"></i>
          <p class="text">交易记录</p></router-link>
        </div>
      </div>
      <div class="time">
        <div>一小时</div>
        <div>五小时</div>
        <div>日线</div>
      </div>
      <div class="charts">echarts</div>
      <div class="btn">
        <router-link to="/asset/transaction/buying">购买</router-link>
        <router-link to="/asset/transaction/sell">出售</router-link>
      </div>
    </div>
    <router-view></router-view>
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
  .transaction{
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
  .head .text{
    margin-left: -1rem;
  }
  .top{
    padding:0.45rem 0;
    font-size: 0.36rem;
    color: #ffffff;
    line-height: 0.6rem;
    background: #4db232;
    display: flex;
  }
  .top>div{
    flex:auto;
  }
  .top>div:first-child{
    border-right: 1px solid #ffffff;
  }
  .price{
    height:0.7rem;
    line-height:0.7rem;
    display: flex;
    background: #ffffff;
  }
  .price>div{
    flex:auto;
    color: #999;
  }
  .price .current span{
    color: #000;
  }
  .price .max span{
    color: red;
  }
  .price .min span{
    color: #4db232;
  }
  .handle{
    margin-top:0.05rem;
    background: #ffffff;
    display: flex;
    padding:0.3rem 0;
  }
  .handle a{
    display: block;
  }
  .handle>div{
    flex:auto;
    width:25%;
  }
  .handle .fa{
    font-size: 0.65rem;
    color: #4db232;
    margin-bottom: 0.2rem;
  }
  .time{
    display: flex;
    margin:0.1rem 0 0.2rem;
    background: #ffffff;
    border-top: 1px solid #4db232;
    border-bottom: 1px solid #4db232;
    line-height:0.7rem;
    font-size: 0.3rem;
  }
  .time>div{
    flex:auto;
  }
  .btn{
    width:5.8rem;
    height:0.7rem;
    line-height:0.7rem;
    margin:0.2rem auto;
    border:1px solid #197700;
    border-radius:0.7rem ;
    overflow: hidden;
    background: #ffffff;
    display: flex;
  }
  .btn a{
    display: block;
    flex:auto;
    width: 50%;
    background: #197700;
    color: #ffffff;
    font-size: 0.3rem;
  }
  .btn a:last-child{
    background: #ffffff;
    color: #197700;
  }

</style>
