<template>
    <div class="login">
      <div class="login-box" v-if="loginBox">
        <div class="portrait">
          <img src="../assets/images/logo.svg" alt="logo">
        </div>
        <div class="username">
          <i class="fa fa-user"></i>
          <input type="text" placeholder="请输入手机号" v-model="username">
        </div>
        <div class="password">
          <i class="fa fa-lock"></i>
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="verifycode clearfix">
          <i class="fa fa-unlock-alt"></i>
          <input type="text" placeholder="请输入验证码" v-model="verifyCode">
          <img :src="verifyCodeUrl" alt="图片验证码">
        </div>
        <div class="slide-verify">
          <!--<slide-verify></slide-verify>-->
        </div>
        <div class="btn">
          <button @click="login()">登录</button>
        </div>
        <div class="register">
          <a href="#" @click="toRegister()">立即注册</a>
          <!--<button @click="toForget()">忘记密码</button>-->
        </div>
      </div>
      <div class="register-box" v-else>
        <div class="username">
          <span class="text">手机号 <i>*</i></span>
          <input type="text" v-model="regUsername">
        </div>
        <div class="password">
          <span class="text">登录密码 <i>*</i></span>
          <input type="password" v-model="regPassword">
        </div>
        <div class="rePassword">
          <span class="text">确认登录密码 <i>*</i></span>
          <input type="password" v-model="regRePwd">
        </div>
        <div class="payPassword">
          <span class="text">交易密码 <i>*</i></span>
          <input type="password" v-model="regPayPwd">
        </div>
        <div class="rePayPassword">
          <span class="text">确认交易密码 <i>*</i></span>
          <input type="password" v-model="regRePayPwd">
        </div>
        <div class="nickname">
          <span class="text">昵称 <i>&nbsp;</i></span>
          <input type="text" v-model="nickname">
        </div>
        <div class="invite">
          <span class="text">推荐人 <i>*</i></span>
          <input type="text" v-model="recommendPhone">
        </div>
        <div class="agree">
          <label><input type="checkbox" name="agree" v-model="agree"><i>✓</i>我已阅读并同意《用户协议》</label>
        </div>
        <div class="btn">
          <button @click="register()" :disabled="!agree">注  册</button>
        </div>
        <div class="back" @click="backToLogin()">
          <a href="#">返回登录</a>
        </div>
      </div>
    </div>
</template>

<script>
  import SlideVerify from '@/components/SlideVerify'
  export default {
    name:'login',
    components:{
      slideVerify:SlideVerify,
    },
    data(){
      return{
        /*登录部分*/
        username:'',
        password:'',
        verifyCode:'',
        loginBox:true, //登录窗or注册
        verifyCodeUrl:this.$store.state.domain+'/site/captcha.html?v='+new Date().getTime(),
        /*注册部分*/
        regUsername:'',
        regPassword:'', //注册密码
        regRePwd:'',
        regPayPwd:'', //支付密码
        regRePayPwd:'',
        nickname:'',
        recommendPhone:'', //推荐人手机号
        agree:false, //同意用户协议
      }
    },
    methods:{
      login(){
        let that = this;
        let data = {
          'LoginForm[username]':this.username,
          'LoginForm[password]':this.password,
          'LoginForm[verifyCode]':this.verifyCode,
          'ajax':'login-form'
        };
        if (that.username!==''&&that.password!=='') {
          /*接口请求*/
          that.$axios({
            url:that.$store.state.domain+'/site/login',
            method:'post',
            data:data,
            transformRequest: [function (data) {
              // Do whatever you want to transform the data
              let ret = '';
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-Requested-With': 'XMLHttpRequest'
            }
          }).then((res)=>{
//            console.log(res);
            if(res.data.success){
              that.$store.commit('tips','登录成功！');
//              that.setCookie('username',that.username,30);
              setTimeout(function(){
                that.$router.push('/home')
              },1000);
            }else{
              let msg = [];//保存返回的错误信息
              for(let i in res.data.msg){
                msg.push(res.data.msg[i][0]);
              }
              that.$store.commit('tips',msg[0]);// 默认显示第一条
            }
            that.verifyCodeUrl = that.$store.state.domain+'/site/captcha.html?v='+new Date().getTime();//更新图片验证码
          }).catch((err)=>{
            console.log(err);
          });
        }else{
          that.$store.commit('tips','用户名或密码不能为空！');
          return false;
        }
      },
      register(){
        let that = this;
        let data = {
          'Memberinfo[memberinfo_account]':that.regUsername,
          'Memberinfo[memberinfo_password]':that.regPassword,
          'Memberinfo[memberinfo_password_repeat]':that.regRePwd,
          'Memberinfo[memberinfo_password2]':that.regPayPwd,
          'Memberinfo[memberinfo_password_repeat2]':that.regRePayPwd,
          'Memberinfo[memberinfo_nickname]':that.nickname || '用户'+that.regUsername,
          'Memberinfo[memberinfo_mobi]':that.regUsername,
          'Membermap[membermap_recommend_id]':that.recommendPhone,
          'ajax':'memberinfo-form'
        };
        if (that.regUsername!==''&&that.regPassword!==''&&that.regPayPwd!==''&&that.recommendPhone!=='') {
          if(that.regPassword===that.regRePwd){
            if(that.regPayPwd===that.regRePayPwd){
              /*接口请求*/
              that.$store.commit('loading',true);
              that.$axios({
                url:that.$store.state.domain+'/memberinfo/create',
                method:'post',
                data:data,
                transformRequest: [function (data) {
                  // Do whatever you want to transform the data
                  let ret = '';
                  for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                  }
                  return ret
                }],
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'X-Requested-With': 'XMLHttpRequest'
                }
              }).then((res)=>{
                console.log(res);
                if(res.data.length === 0){
                  delete data.ajax;
                  that.$axios({
                    url:that.$store.state.domain+'/memberinfo/create',
                    method:'post',
                    data:data,
                    transformRequest: [function (data) {
                      // Do whatever you want to transform the data
                      let ret = '';
                      for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                      }
                      return ret
                    }],
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'X-Requested-With': 'XMLHttpRequest'
                    }
                  }).then((res)=>{
                    that.$store.commit('loading',false);
                    console.log(res);
                    if(res.data.success){
                      that.$store.commit('tips',res.data.success);
                      setTimeout(function(){
                        that.loginBox=true
                      },1000);
                    }
                  }).catch((err)=>{
                    console.log(err);
                  });
                }else{
                  let infos = res.data;
                  let info = [];  //保存返回错误信息
                  for(let k in infos){
                    for(let j in infos[k]){
                      info.push(infos[k][j])
                    }
                  }
                  that.$store.commit('loading',false);
                  that.$store.commit('tips',info[0]);
                }
              }).catch((err)=>{
                console.log(err);
              });
            }else{
              that.$store.commit('loading',false);
              that.$store.commit('tips','两次输入的交易密码不一致！');
              return false;
            }
          }else{
            that.$store.commit('loading',false);
            that.$store.commit('tips','两次输入的密码不一致！');
            return false;
          }
        }else {
          that.$store.commit('loading',false);
          that.$store.commit('tips','带*的为必填项！');
          return false;
        }
      },
      toRegister(){
        this.loginBox=false;
      },
      backToLogin(){
        this.loginBox=true;
      }
    }

  }
</script>

<style scoped>
  .login{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: url(../assets/images/bg.jpg) no-repeat;
    -webkit-background-size: contain;
    background-size: cover;
    z-index: 1000;
  }
  /*login css*/
  .login-box{
    width:5.6rem;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .portrait{
    width: 2rem;
    height: 2rem;
    margin:0 auto 1.3rem;
  }
  .login-box>div,.register-box>div{
    padding:0.2rem 0;
  }
  .login-box>div i.fa{
    width:0.6rem;
    font-size: 0.48rem;
    color: #ffffff;
  }
  .login-box>div input{
    display: inline-block;
    width:4.8rem;
    padding:0.1rem 0.2rem;
    font-size: 0.32rem;
    color:#fff;
    background: transparent;
    border-bottom: 1px solid #f5f5f5;
  }
  .login-box>div.verifycode i.fa{
    float: left;
    margin-left: 0.08rem;
  }
  .login-box>div.verifycode input{
    width:2.5rem;
    float: left;
    margin-left: 0.1rem;
  }
  .login-box>div.verifycode img{
    width:1.5rem;
    display: block;
    float: right;
    margin-right: 0.2rem;
  }
    .login-box>div input::-webkit-input-placeholder,.register-box>div input::-webkit-input-placeholder{
    color: #ffffff;
    /*text-align: center;*/
  }
  .login-box>div.btn button{
    height:0.8rem;
    width:100%;
    border-radius: 5px;
    font-size: 0.3rem;
    color:#fff;
  }
  .login-box>div.register a{
    color: #ffffff;
    text-decoration: underline;
  }
  /*注册部分*/
  .register-box{
    width:5.6rem;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }

  .register-box>div{
    padding:0.2rem 0;
    border-bottom: 1px solid #ccc;
    text-align: left;
  }
  .register-box>div span.text{
    font-size: 0.28rem;
    color: #ffffff;
  }
  .register-box>div span.text i{
    color: #ea4d1c;
  }
  .register-box>div input[type=text],.register-box>div input[type=password]{
    display: inline-block;
    width:3.5rem;
    padding:0.1rem 0.2rem;
    font-size: 0.3rem;
    color: #ffffff;
    background: transparent;
  }
  .register-box>div.agree{
    border:none;
    text-align: left;
  }
  .register-box>div.agree label{
    font-size: 0.3rem;
    color: #ffffff;
  }
  .register-box>div.btn{
    border:none;
  }
  .register-box>div.btn button{
    height:0.8rem;
    width:100%;
    border-radius: 5px;
    font-size: 0.3rem;
    color: #ffffff;
  }
  .register-box>div.btn button:disabled{
    background: #ccc;
  }

  label{ margin-left: 0.2rem; }
  label i {
    font-size:0.1rem;
    font-style:normal;display:inline-block;
    width:0.3rem;height:0.3rem;
    text-align:center;
    line-height:0.3rem;
    color: #ffffff;
    vertical-align:middle;
    margin:-2px 2px 1px 0px;
    border:1px solid #ffffff;
  }
  input[type="radio"],input[type="checkbox"] {display:none;}
  input[type="radio"] + i {border-radius:50%;}
  input[type="checkbox"]:checked + i,input[type="radio"]:checked + i {
    background: #ffffff;
    color: #333;}
  .register-box>div.back{
    border:none;
    text-align: center;
  }
  .register-box>div.back a{
    color: #ffffff;
    text-decoration: underline;
  }
</style>
