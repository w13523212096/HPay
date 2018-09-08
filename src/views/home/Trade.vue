<template>
    <div class="trade">
      <div class="head">
        <i class="fa fa-arrow-left" @click="backHome()"></i>
        <span class="text">交易</span>
      </div>
      <ul class="tabs">
          <router-link to='/home/trade/buying' tag="li">
            买入
          </router-link>
          <router-link to='/home/trade/sellout' tag="li">
            卖出
          </router-link>
          <router-link to='/home/trade/orderlist' tag="li">
            订单列表
          </router-link>
      </ul>
      <router-view/>
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
        this.$router.push('/home');
      }
    }
  }
</script>

<style scoped>
  .trade{
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
  .head .text{
    margin-left: -1rem;
  }
  .tabs{
    display: flex;
    background: #ffffff;
    border-bottom: 1px solid #ccc;
  }
  .tabs li{
    width:33.33%;
    flex:auto;
    /*border-right: 1px solid #ccc;*/
    font-size: 0.3rem;
    line-height: 0.8rem;
  }
  .tabs li:last-child{
    border:none;
  }
  .tabs li.router-link-active{
    background: #83e868;
    color: #ffffff;
  }
</style>
