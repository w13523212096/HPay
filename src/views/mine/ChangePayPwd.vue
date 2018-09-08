<template>
  <div class="payment">
      <div class="head">
       <i class="fa fa-arrow-left" @click="back()"></i>
       <span class="text">修改支付密码</span>
     </div>
     <div class="form crace">
        <span>旧支付密码</span>
        <input type="password" placeholder="输入旧支付密码" v-model="oldPwd2">
      </div>
      <div class="form crace">
        <span>新支付密码</span>
        <input type="password" placeholder="输入新支付密码" v-model="newPwd2">
      </div>
      <div class="form crace">
        <span>新支付密码</span>
        <input type="password" placeholder="两次输入要一致" v-model="reNewPwd2">
      </div>
      <div class="button">
          <button @click="change()">确认</button>
      </div>
  </div>
</template>
<script>
  export default {
    name:'changepassword',
    data(){
      return{
        oldPwd2:'',
        newPwd2:'',
        reNewPwd2:''
      }
    },
    methods: {
      back(){
        this.$router.go(-1);
      },
      change () {
        let that = this;
        let data = {
          'UpdatePasswordAuth[password2]':that.oldPwd2,
          'Memberinfo[memberinfo_password2]': that.newPwd2,
          'Memberinfo[memberinfo_password_repeat2]': that.reNewPwd2,
          'ajax': 'memberinfo-form'
        };
        if(that.oldPwd2!==''&&that.newPwd2!==''&&that.reNewPwd2!==''){
          if(that.newPwd2===that.reNewPwd2){
            that.$store.commit('loading',true);
            //验证请求
            that.$axios({
              url:that.$store.state.domain+'/memberinfo/updatePasswordMy',
              method:'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
              },
              data:data,
              transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = '';
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }]
            }).then(res=>{
//              console.log(res);
              if(res.data.length===0){
                delete data.ajax;
                //修改请求
                that.$axios({
                  url:that.$store.state.domain+'/memberinfo/updatePasswordMy',
                  method:'post',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest'
                  },
                  data:data,
                  transformRequest: [function (data) {
                    // Do whatever you want to transform the data
                    let ret = '';
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                  }]
                }).then(res=> {
//                  console.log(res);
                  if(res.data.success){
                    that.$store.commit('loading',false);
                    that.$store.commit('tips','修改成功！');
                    setTimeout(function(){
                      that.$router.push('/mine');
                    },1000);
                  }else{
                    that.$store.commit('loading',false);
                    that.$store.commit('tips','原密码不正确！');// 默认显示第一条
                  }
                }).catch((err)=>{
                  console.log(err);
                })
              }else{
                that.$store.commit('loading',false);
                let msg = [];//保存返回的错误信息
                for(let i in res.data){
                  msg.push(res.data[i][0]);
                }
                that.$store.commit('tips',msg[0]);// 默认显示第一条
              }

            }).catch(err=>{
              console.log(err);
            })
          }else{
            that.$store.commit('tips','两次输入的新密码不一致！');
          }
        }else{
          that.$store.commit('tips','信息不可为空');
        }

      },
    }
  }
</script>


<style scoped>
.payment{
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
    padding-left:1.6rem;
    left: 0rem;
}
.form{
    background: #ffffff;
    padding:0.4rem;
    font-size: 0.3rem;
    text-align: left;
    /*border-bottom:1px solid #DDDDDD*/
  }
.form span{
    margin-right: 0.2rem;
  }
.form input{
  width: 70%;
  padding: 0.1rem 0.2rem;
  font-size: 0.28rem;
  color: #333;
  /*border-bottom: 1px solid #DEDEDE;*/
}

.button button{
  width: 80%;
    height:0.8rem;
    border-radius: 5px;
    font-size:0.3rem;
    color:#fff;
    margin-top: 0.8rem;
}

</style>
