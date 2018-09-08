<template>
  <div class="page">
    <div class="title">出售列表</div>
    <ul class="list">
      <li v-for="(item,index) in sellList">
        <div class="info">
          <div class="name">
            <i class="fa fa-user"></i>
            <span class="text">{{item.buyMember.memberinfo_nickname}}</span>
          </div>
          <div class="time">{{item.buy_date}}</div>
        </div>
        <div class="number">
          <p class="text">出售数量:</p>
          <p class="num">{{item.buy_money}}</p>
          <button @click="confirm(index,item.buy_member_id)">买入</button>
        </div>
      </li>
    </ul>
    <div class="dialog" v-if="tradePwdShow">
      <div class="box">
        <div class="text">交易密码</div>
        <div class="pwd">
          <input type="password" v-model="tradePwd" autofocus="autofocus">
        </div>
        <div class="btn">
          <button @click="buy()">确认</button>
        </div>
        <div class="close" @click="close()">
          <i class="fa fa-times"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        chooseIndex:null,
        tradePwd:'',
        tradePwdShow:false,
        sellList:null,
        sellMemberId:null
      }
    },
    created(){
      let that = this;
      //所有人出售列表
      that.$axios({
        url:that.$store.state.domain+'/buy/index',
        method:'get',
        headers:{
          'X-Requested-With': 'XMLHttpRequest'
        },
        params:{
          _dc: new Date().getTime(),
          page: 1,
          start: 0,
          limit: 25,
          all:1,
          selTab:0
        }
      }).then((res)=>{
        console.log('出售列表',res);
        that.sellList = res.data.buy.data;
      });
    },
    methods: {
      backHome() {
        this.$router.go(-1);
      },
      confirm(index,id) {
        if(id!==this.$store.state.userInfo.memberinfo_id){
          this.chooseIndex = index;
          this.tradePwdShow = true;
          this.tradePwd = '';
        }else{
          this.$store.commit('tips','不可购买自己的订单！');
        }

      },
      buy() {
        let that = this;
        let data = {
          'Sale[sale_currency]': that.sellList[that.chooseIndex].buy_currency,
          'Sale[sale_type]': 0,
          'Sale[trade_password]': that.tradePwd,
          'Sale[buy_id]':that.sellList[that.chooseIndex].buy_id
        };
        that.$axios({
          url: that.$store.state.domain + '/sale/create',
          method: 'post',
          data: data,
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = '';
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res) => {
//          console.log(res);
          if (!res.data.trade_password) {
            if (!res.data.error) {
              that.$store.commit('tips', res.data.success);
              setTimeout(() => {
                that.$router.push('/home/trade/orderlist')
              }, 1500)
            } else {
              that.$store.commit('tips', res.data.error);
            }
          } else {
            that.$store.commit('tips', res.data.trade_password[0])
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      close(){
        this.tradePwdShow = false;
      }
    }
  }
</script>

<style scoped>
  .dialog{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }
  .dialog .box{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding:0.5rem;
    background: #ffffff;
  }
  .dialog .text{
    font-size: 0.32rem;
  }
  .dialog .pwd{
    margin:0.5rem;
  }
  .dialog .pwd input{
    border:1px solid #ccc;
    padding:0.1rem 0.2rem;
    text-align: center;
  }
  .dialog .btn button{
    width:40%;
    height:0.6rem;
    border-radius: 5px;
    font-size: 0.3rem;
    color:#fff;
  }
  .dialog .box .close{
    position: absolute;
    top:0;
    left:0;
    font-size: 0.36rem;
    padding:0.1rem 0.2rem;
  }
  .page{
    background: #ffffff;
    position: absolute;
    top: 2rem;
    left: 0;
    width: 100%;
    bottom: 0;
    overflow:auto;/* winphone8和android4+ */
    -webkit-overflow-scrolling: touch; /* ios5+ */
  }
  .title{
    font-size: 0.3rem;
    line-height: 0.7rem;
    text-align: left;
    padding-left: 0.4rem;
  }
  .list{
    border-top: 1px solid #aaa;
  }
  .list li{
    border-bottom: 1px solid #ccc;
    display: flex;
    text-align: left;
    font-size: 0.28rem;
    line-height: 0.5rem;
    padding:0.2rem 0.3rem;
  }
  .list li .info{
    width:30%;
    flex:auto;
    /*border-right: 1px solid #ccc;*/

  }
  .info .name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info .name .text{
    margin-left: 0.1rem;
  }
  .info .time{
    color: #999;
    line-height:0.3rem;
  }
  .list li .number{
    width: 70%;
    flex:auto;
    padding-left: 0.3rem;
    position: relative;
  }
  .number .text{
    color: #999;
  }
  .number .num{
    padding-left: 0.4rem;
  }
  .number button{
    width: 1.2rem;
    height: 0.5rem;
    position: absolute;
    top: 0.2rem;
    right:0;
    border-radius: 0.2rem;
    color: #ffffff;
  }
</style>
