<template>
  <div class="home">
  	<div class="header">
    	<!--<div class="qrcode">
        <i class="fa fa-minus-square-o"></i>
        <p class="text">扫一扫</p>
      </div>-->
      <div class="portrait">
        <img src="../assets/images/logo.svg" alt="logo">
      </div>
      <ul class="my-info">
        <li>
          <p class="tit">余额</p>
          <p class="con">{{userBalance}}</p>
        </li>
        <li>
          <p class="tit">{{userName}}</p>
          <p class="con">UID：{{userId}}</p>
        </li>
        <li>
          <p class="tit">积分</p>
          <p class="con">{{userIntegral}}</p>
        </li>
      </ul>
      <ul class="handle">
        <li>
          <router-link to="/home/moneycode">
            <i class="fa fa-qrcode"></i>
            <p class="text">收款码</p>
          </router-link>
        </li>
        <li>
          <router-link to="/home/moneyto">
            <i class="fa fa-refresh"></i>
            <p class="text">转账</p>
          </router-link>
        </li>
        <li>
          <router-link to="/home/exchange">
            <i class="fa fa-credit-card"></i>
            <p class="text">兑换积分</p>
          </router-link>
        </li>
        <li>
          <router-link to="/home/trade">
            <i class="fa fa-gg"></i>
            <p class="text">交易</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="banner swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="../assets/images/banner-1.svg" alt=""></div>
        <div class="swiper-slide"><img src="../assets/images/banner-2.svg" alt=""></div>
        <div class="swiper-slide"><img src="../assets/images/banner-3.svg" alt=""></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  	<div class="notice">
  		<div class="left">
  			<i class="fa fa-volume-up"></i>
  			<span class="text">公告：</span>
  		</div>
      <div class="list swiper-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide swiper-no-swiping" v-for="item in newsList"><router-link to="/mine/notice">{{item.announcement_title}}</router-link></li>
        </ul>
      </div>
  	</div>
    <div class="detail">
      <ul class="title">
        <li v-for="(item,index) in detailClass" @click="toggle(index)" :class="{active:activeIndex===index}">{{item}}</li>
      </ul>
      <div class="content">
        <div class="money" v-show="activeIndex===0">
          <table>
            <thead>
              <tr>
                <th>类型</th>
                <th>金额</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in moneyRecord" v-if="index<showNumber">
                <td>{{item.type}}</td>
                <td>{{item.number}}</td>
                <td>{{item.time}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="integral"  v-show="activeIndex===1">
          <table>
            <thead>
              <tr>
                <th>类型</th>
                <th>数量</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in moneyRecord" v-if="index<showNumber">
                <td>{{item.type}}</td>
                <td>{{item.number}}</td>
                <td>{{item.time}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="more">
        <a href="#" @click="showMore()">点击加载更多</a>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import Swiper from 'swiper';
export default {
  name: 'Home',
  data () {
    return {
      userBalance:0, //余额
      userIntegral:0,  //积分
      userName:'',
      userId:'',
      newsList:null,
      detailClass:['余额明细','积分明细'],
      activeIndex:0,
      moneyRecord:[{
        type:'转出',
        number:1000,
        time: '2018/8/8'
      },{
        type:'转入',
        number:1000,
        time: '2018/8/8'
      },{
        type:'转出',
        number:1000,
        time: '2018/8/8'
      },{
        type:'转入',
        number:1000,
        time: '2018/8/8'
      },{
        type:'转出',
        number:1000,
        time: '2018/8/8'
      },{
        type:'转入',
        number:1000,
        time: '2018/8/8'
      }],
      showNumber:3 //默认显示条数
    }
  },
  methods:{
    toggle(index){
      this.activeIndex=index;
    },
    showMore(){
      this.showNumber+=5;
    },
    getBalance(){
      //获取余额 积分
      let that = this;
      let data = that.$store.state;
      that.$axios({
        url:data.domain+'/finance/index',
        method:'get',
        headers:{
          'X-Requested-With': 'XMLHttpRequest'
        },
        params:{
          _dc: new Date().getTime(),
          page: 1,
          start: 0,
          limit: 25
        }
      }).then((res)=>{
//      console.log('余额积分',res);
        if(res.data.finance.length>0){
          that.$store.commit('setMoney',res.data.finance);
          that.userBalance = data.userMoney[0].finance_award;
          that.userIntegral = data.userMoney[1].finance_award;
        }
      });
    }
  },
  created(){
    let that = this;
    //获取用户信息
    let data = that.$store.state;
    that.$axios({
      url:data.domain+'/start/index?my=true',
      headers:{
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then((res)=>{
      console.log( '用户信息',res);
      if(res.data.memberinfo){
        that.$store.commit('setUserInfo',res.data.memberinfo);
        that.userName = data.userInfo.memberinfo_nickname;
        that.userId = data.userInfo.memberinfo_id;
      }else{
        setTimeout(function(){
          that.$store.commit('tips','登录已失效，请重新登录！');
          that.$router.push('/');
        },1500)
      }

    }).catch(error=>{
      console.log(error);
      /*if(error.response.status === 403){
        that.$router.push('/login');
      }*/
    });
    //获取公告
    that.$axios({
      url:data.domain+'/announcement/list',
      method:'get',
      headers:{
        'X-Requested-With':'XMLHttpRequest'
      }
    }).then((res)=>{
//      console.log(res);
      that.newsList = res.data;
      this.$nextTick(() => {
        // 下一个UI帧再初始化swiper  新闻滚动
        new Swiper('.swiper-container.list', {
          direction: 'vertical',
          loop: true,
          noSwiping: true,
          autoplay: true,
        });
      });
    }).catch((err)=>{
//      console.log(err);
    });
    //获取余额 积分
    that.getBalance();
    // 获取明细
    that.$axios({
      url:data.domain+'/awardPeriodSum/index',
      method:'get',
      headers:{
        'X-Requested-With': 'XMLHttpRequest'
      },
      params:{
        _dc:new Date().getTime(),
        curSumType: 1,
        isVerifyType: 1,
        page: 1,
        start: 0,
        limit: 25
      }
    }).then((res)=>{
        console.log('明细',res);
      /*let data = res.data.deal.data;
      let id = that.$store.state.userInfo.memberinfo_id;
      that.orderList = data;
      for(let i in data){
        if(data[i].dealBuy.buy_member_id === id){
          that.saleList.push(data[i])
        }else{
          that.buyList.push(data[i])
        }
      }*/
    });
  },
  mounted(){
    new Swiper('.swiper-container.banner', {
      loop: true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 4000,
      },
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.home{ overflow:auto;/* winphone8和android4+ */
    -webkit-overflow-scrolling: touch; /* ios5+ */}
	.header{ background: url(../assets/images/bg.jpg) no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: top center;overflow: hidden;}
	.header .qrcode { position: absolute;
    top:0.5rem;
    right: 0.5rem; color:#fff; }
	.header .qrcode i.fa{font-size: 0.55rem; }
	.header .portrait{width:1.3rem; height:1.3rem; border-radius: 50%; overflow: hidden;margin:0.8rem auto;  }
	.header .my-info{ display: flex; }
	.header .my-info li{width:33.33%; flex: auto; color:#fff; border-right: 1px solid #FFF; }
	.header .my-info li:last-child{ border-right: none; }
	.header .my-info li .con{ margin-top: 0.26rem; }
	.header .handle{ display: flex; margin : 0.4rem 0.2rem 0.1rem;padding:0.1rem 0;
    background: #ffffff; border-radius: 10px;}
	.header .handle li{ width:25%; flex: auto; }
	.header .handle li a {  display: block; color:#82cc1b; }
	.header .handle li a i.fa{ font-size: 0.55rem; }
	.header .handle li a .text{ margin-top: 0.2rem; }
	/*.banner{ margin-top: 0.9rem; }*/
	.banner img{ display: block; }
	.notice { border-bottom: 1px solid #aaa; font-size: 0.24rem;}
	.notice .left{ float: left;  padding:0 0.26rem;
    line-height:0.9rem;}
	.notice .left i.fa{ font-size: 0.32rem; color:#286519; margin-right: 0.05rem; }
  .notice .list ul{ height:0.9rem; }
	.notice .list li{ text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .notice .list li a{ display: block; height:0.9rem; line-height: 0.9rem;}
	.detail .title { display: flex; line-height: 0.84rem; }
	.detail .title li{ flex: auto; background: #f5f5f5; color:#000;}
	.detail .title li.active{ background: #fff; color:#286519;}
	.detail .content table{ width: 100%; }
  .detail .content table tr th,.detail .content table tr td{ padding:0.2rem 0; }
	.detail .more{ line-height: 1rem; }
	.detail .more a{ display: block; }
</style>
