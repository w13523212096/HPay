<template>
   <div class="version">
     <div class="head">
      <i class="fa fa-arrow-left" @click="back()"></i>
      <span class="text">版本</span>
    </div>
    <div class="body">
      <div class="logo">
        <img src="../../assets/images/logo.svg" alt="logo">
      </div>
      <div class="text">版本1.0.0</div>
       <div class="content">
           当前版本已是最新版本
       </div>

    </div>
   </div>
</template>
<script>
  export default {
    name:'version',
    methods: {
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
.version{
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
    padding:0.4rem;
    font-size: 0.4rem;
    position: relative;
  }
.head .text{
    margin-left: -0.8rem;
}
.logo{
  width: 2rem;
  margin:2rem auto 0;
}
.content {
    font-size:0.3rem;
    margin-top: 0.5rem;
}

</style>
