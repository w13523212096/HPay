<template>
	<div class="mine">
		<div class="header">
			<div class="head"><img src="../assets/images/logo.svg" alt=""></div>
			<ul class="info">
				<li>等级：{{userGrade}}</li>
				<li>{{userName}}</li>
				<li>UID：{{userId}}</li>
			</ul>
		</div>
    <div class="main">
      <div class="floor">
        <div class="title">个人资料</div>
        <ul>
          <li>
            <router-link to="/mine/nickname">
              <i class="fa fa-user-o"></i>
              <p class="text">昵称修改</p>
            </router-link>
          </li>
          <li>
            <router-link to="/mine/bankcard">
              <i class="fa fa-credit-card"></i>
              <p class="text">银行卡管理</p>
            </router-link>
          </li>
          <li>
            <router-link to="/mine/share">
              <i class="fa fa-share-square-o"></i>
              <p class="text">我的分享</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="floor">
        <div class="title">店铺管理</div>
        <ul>
          <li>
            <router-link to="/mine/store">
              <i class="fa fa-archive"></i>
              <p class="text">我的店铺</p>
            </router-link>
          </li>
          <li>
            <router-link to="/mine/merchant" >
              <i class="fa fa-plus-square-o"></i>
              <p class="text">商家入驻</p>
            </router-link>
          </li>
          <li>
            <router-link to="/mine/moneycode">
              <i class="fa fa-qrcode"></i>
              <p class="text">商家收款码</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="floor">
        <div class="title">系统设置</div>
        <ul>
          <li>
            <router-link to="/mine/changepassword">
              <i class="fa fa-unlock-alt"></i>
              <p class="text">修改登录密码</p>
            </router-link>
          </li>
          <li>
            <router-link to="/mine/payment" >
              <i class="fa fa-lock"></i>
              <p class="text">修改支付密码</p>
            </router-link>
          </li>
          <li>
            <router-link to="/mine/complaint">
              <i class="fa fa-pencil-square-o"></i>
              <p class="text">意见反馈</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="floor">
        <ul>
          <li>
            <router-link to="/mine/notice">
              <i class="fa fa-wpforms"></i>
              <p class="text">公告</p>
            </router-link>
          </li>
          <li>
            <router-link to="/mine/about" >
              <i class="fa fa-info"></i>
              <p class="text">关于</p>
            </router-link>
          </li>
          <li>
            <router-link to="/mine/version" >
              <i class="fa fa-clock-o"></i>
              <p class="text">版本</p>
             </router-link>
          </li>
        </ul>
        <div class="exit">
          <button @click="logout()">退出登录</button>
        </div>
      </div>
    </div>
    <router-view/>
	</div>
</template>

<script>
export default {
  name: 'mine',
  data () {
    return {
      userName:this.$store.state.userInfo.memberinfo_name,
      userId:this.$store.state.userInfo.memberinfo_id,
      userGrade:'普通会员'
    }
  },
  methods:{
      logout(){
        let that = this;
        that.$axios.get(that.$store.state.domain+'/site/logout?'+new Date().getTime(),{
          headers:{
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res)=>{
//          console.log(res);
          if(res.data.success){
            that.$store.commit('tips','退出成功！');
            setTimeout(()=>{
              that.$router.push('/login');
            },1000);
          }
        }).catch((err)=>{
          console.log(err);
        })
      }
  }
}
</script>

<style scoped>
  .header{
    background:  url(../assets/images/bg.jpg) center;
    -webkit-background-size: cover;
    background-size: cover;
    overflow: hidden;
  }
  .header .head{
    width:1.3rem;
    height:1.3rem;
    margin: 0.95rem auto 0;
    border-radius: 50%;
    overflow: hidden;
  }
  .header .info{
    margin:0.45rem 0;
    display: flex;
  }
  .header .info li{
    width:33.33%;
    flex:auto;
    color: #ffffff;
    font-size: 0.26rem;
  }
  .floor{
    padding:0.4rem 0.2rem;
    border-bottom: 1px solid #ccc;
  }
  .floor .title{
    font-size: 0.3rem;
    text-align: left;
    border-left: 2px solid #699c5a;
    padding-left: 0.1rem;
    color: #699c5a;
  }
  .floor ul{
    display: flex;
    margin-top: 0.3rem;
  }
  .floor ul li{
    width:33.33%;
    flex:auto;
    border-right: 1px solid #ddd;
  }
  .floor ul li:last-child{
    border-right: none;
  }
  .floor ul li a{
    display: block;
  }
  .floor ul li i.fa{
    font-size: 0.55rem;
    color: #5ea44b;
  }
  .floor ul li .text{
    font-size: 0.26rem;
    margin-top: 0.2rem;
  }
  .floor .exit{
    margin-top: 0.4rem;
  }
  .floor .exit button{
    width:80%;
    height:0.7rem;
    color: #ffffff;
    border-radius: 5px;

  }
</style>
