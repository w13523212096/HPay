<template>
    <div class="moneycode">
      <div class="head">
        <i class="fa fa-arrow-left" @click="back()"></i>
        <span class="text">转入</span>
      </div>
      <div class="body">
        <div class="text">扫一扫，向我付款</div>
        <div class="qrcode" id="qrcode"></div>
      </div>
      <div class="record">转入记录</div>
    </div>
</template>

<script>
  import QRCode from 'qrcodejs2'
    export default {
      data(){
        return{
          Moneycode:'http://www.baidu.com'
        }
      },
      mounted(){
        let qrcode = new QRCode('qrcode', {
          text:this.Moneycode,
          width: 256,
          height: 256,
          colorDark : '#000000',
          colorLight : '#ffffff',
        })
      },
      methods:{
        back(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped>
  .moneycode{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: url("../../assets/images/bg.jpg");
    -webkit-background-size: contain;
    background-size: contain;
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
    padding:0.4rem;
    font-size: 0.4rem;
    position: relative;
  }
  .head .text{
    margin-left: -0.5rem;
  }
  .body{
    width:90%;
    margin:1rem auto;
    padding:1.2rem;
    border:1px solid #ccc;
    border-radius: 10px;
    background: rgba(255,255,255,0.4);
  }
  .body .text{
    color: #ffffff;
    font-size: 0.3rem;
    margin-bottom: 0.5rem;
  }
  .body .qrcode{
    padding:0.2rem;
    background: #ffffff;
  }
  .record{
    color: #ffffff;
    font-size: 0.3rem;
  }

</style>
