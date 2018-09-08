<template>
  <div class="page">
    <div class="head">
      <i class="fa fa-arrow-left" @click="backHome()"></i>
      <span class="text">分享</span>
    </div>
    <div class="body">
      <div class="qrcode" id="qrcode"></div>
      <div class="share">分享链接</div>
      <div class="copy">
        <input type="text" :value="shareUrl"  id="input">
      </div>
      <div class="btn">
        <button @click="copyUrl()">复制链接</button>
      </div>
      <div class="btn">
        <button @click="downloadIamge()">下载二维码</button>
      </div>
    </div>

  </div>
</template>

<script>
  import QRCode from 'qrcodejs2'
  export default {
    data(){
      return{
        shareUrl:'http://192.168.31.146/#/login',
      }
    },
    mounted(){
      let qrcode = new QRCode('qrcode', {
        text:this.shareUrl,
        width: 200,
        height: 200,
        colorDark : '#000000',
        colorLight : '#ffffff',
      })
    },
    methods:{
      backHome(){
        this.$router.go(-1);
      },
      // 点击复制
      copyUrl() {
        const input = document.getElementById('input');
        input.select();
        if (document.execCommand('copy')) {
          document.execCommand('copy')
        }
      },
      //下载图片
      downloadIamge() {
        // 通过选择器获取img元素
        const img = document.querySelector('#qrcode').querySelector('img');
        // 将图片的src属性作为URL地址
        let url = img.src;
        let a = document.createElement('a');
        let event = new MouseEvent('click');

        a.download = new Date().getTime();
        a.href = url;

        a.dispatchEvent(event)
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
    /*background: #286519;*/
    background-image: url("../../assets/images/bg.jpg");
    background-repeat: no-repeat;
    background-size:cover;
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
    width:4rem;
    height:auto;
    margin: auto;
  }

  .body .qrcode{
    width:4rem;
    height:auto;
    margin: 0.8rem auto 0;
    padding:0.1rem;
    background: #ffffff;
  }
.share{
  width:3.95rem;
  height:auto;
  margin: auto;
  color: #fff;
  font-size:0.3rem;
  text-align: left;
  margin-top:0.5rem;
}
.copy input{
  background:none;
  width:3.8rem;
  color:#fff;
  font-size:0.3rem;
  margin-top: 0.3rem;
  border-bottom: 1px solid #fff;
}
.btn{
  width:100%;
  float: left;
}
.btn button{
  width:3rem;
  height:0.7rem;
  border-radius: 0.1rem;
  margin-top: 0.4rem;
  color:#fff;
  font-size:0.3rem;
}
</style>
