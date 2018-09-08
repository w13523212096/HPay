<template>
  <div class="complaint">
    <div class="head">
      <i class="fa fa-arrow-left" @click="$router.back(-1)"></i>
      <span class="text">意见反馈</span>
    </div>
    <div class="text-compla">
        <p>请在下方输入您的宝贵意见</p>
    </div>
    <div class="import">
        <textarea  cols="30" rows="10" placeholder="请输入..." v-model="content"></textarea>
    </div>
    <div class="button">
          <button @click="submit()">确认</button>
      </div>
  </div>
</template>
<script>
  export default {
    name:'complaint',
    data(){
      return{
        content:''
      }
    },
    methods: {
      back(){
        this.$router.go(-1);
      },
      submit () {
        let that = this;
        if(that.content!==''){
          //待完善。。
          that.$store.commit('tips','提交成功！');
          setTimeout(()=>{
            that.$router.push('/home');
          },1000)
        }else{
          that.$store.commit('tips','信息不可为空');
        }

      },
    }
  }
</script>


<style scoped>
.complaint{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: #fff;
    z-index: 1000;
}
.head{
    height:1.16rem;
    line-height: 1.16rem;
    color: #ffffff;
    font-size: 0.36rem;
    background: #4db232;
  }
.head .fa{
    float: left;
    font-size:0.4rem;
    padding:0.35rem 0.4rem;
}
.head .text{
    float:left;
    padding-left:2rem;
    left: 0rem;
}
.text-compla p{
    float:left;
    padding: 0.3rem;
    color:red;
    font-size:0.3rem;
}
.import textarea{
    width:92%;
    outline:none;
    font-size:0.3rem;
    border:none;
    border-top:2px solid #E6E6E6;
    border-bottom: 12px solid #E6E6E6;
}
.button button{
    width:6.8rem;
    height:0.9rem;
    border-radius: 5px;
    font-size:0.35rem;
    color:#fff;
    margin-top: 0.8rem;
}
</style>
