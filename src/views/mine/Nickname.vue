<template>
  <div class="nickname">
     <div class="head">
          <i class="fa fa-arrow-left" @click="back()"></i>
          <span class="text">昵称修改</span>
      </div>
      <div class="form">
        <span>昵称</span>
        <input type="text" placeholder="输入新的昵称" v-model="newNickname">
      </div>
      <div class="button">
          <button @click="changeNickname()">确认</button>
      </div>
  </div>

</template>
<script>
  export default {
    name: 'addition',
    data () {
      return {
        newNickname:''
      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      changeNickname(){
        let that = this;
        that.$axios({
          url:that.$store.state.domain+'/memberinfo/update/'+that.$store.state.userInfo.memberinfo_id,
          method:'post',
          headers:{
            'X-Requested-With':'XMLHttpRequest'
          },
          data:{
            'Memberinfo[memberinfo_nickname]':that.newNickname
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = '';
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }]
        }).then((res)=>{
//          console.log(res);
          if(res.data.success){
            that.$store.commit('tips',res.data.success);
            setTimeout(function(){
              that.$router.push('/home')
            },1000);
          }else{
            that.$store.commit('tips',res.data.error);
          }
        }).catch((err)=>{
          console.log(err);
        })
      }
    }
  }
</script>


<style scoped>
.nickname{
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

.form{
    background: #ffffff;
    padding:0.4rem;
    font-size: 0.3rem;
    text-align: left;
  }
.form span{
    margin-right: 0.2rem;
  }
 .form input{
    width: 70%;
    padding:  0.1rem 0.2rem;
    font-size: 0.28rem;
    color: #000;
    /*border-bottom: 1px solid #DEDEDE;*/
  }
.button button{
    width:80%;
    height:0.8rem;
    border-radius: 5px;
    font-size:0.3rem;
    color:#fff;
    margin-top: 0.8rem;
}

</style>
