<template>
  <div class="page">
    <div class="head">
      <i class="fa fa-arrow-left" @click="backHome()"></i>
      <span class="text">开发中</span>
    </div>
    <div class="body">
      <div class="text">该功能正在开发中，请耐心等待。</div>
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
  .body .text{
    margin-top: 3rem;
    color: #666;
  }
</style>
