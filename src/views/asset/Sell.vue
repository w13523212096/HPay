<template>
  <div class="page">
    <div class="head">
      <i class="fa fa-arrow-left" @click="backHome()"></i>
      <span class="text">Hpay</span>
    </div>
    <div class="body">
      <div class="top">
        <div>
          <p class="text">Hpay</p>
          <p class="num">0.00</p>
        </div>
        <div>
          <p class="text">积分</p>
          <p class="num">0000</p>
        </div>
      </div>
      <div class="box">
        <ul>
          <li>当前价格：<span>{{currentPrice}}</span></li>
          <li>出售价格：{{myPrice}} <input type="range" :max="currentPrice+1" :min="currentPrice" step="0.0001" v-model="myPrice"></li>
          <li>出售数量：<input type="text" placeholder="请输入数量" v-model="sellNumber"></li>
          <li>卖出金额：<span>{{(myPrice*sellNumber).toFixed(4)}}</span></li>
        </ul>
        <div class="btn">
          <button @click="confirm()">发布订单</button>
        </div>
      </div>
    </div>
    <div class="dialog" v-if="tradePwdShow">
      <div class="dialog-inner">
        <div class="text">交易密码</div>
        <div class="pwd">
          <input type="password" v-model="tradePwd">
        </div>
        <div class="btn">
          <button @click="sell()">确认</button>
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
        currentPrice:2.8888,
        myPrice:this.currentPrice,
        sellNumber:null,
        tradePwd:'',
        tradePwdShow:false
      }
    },
    methods:{
      backHome(){
        this.$router.go(-1);
      },
      confirm(){
//        this.$store.commit('loading',true);
        this.tradePwdShow = true;
      },
      sell(){
        let that = this;
        let data = {
          'Sale[sale_currency]':that.sellNumber,
          'Sale[sale_type]':0,
          'Sale[trade_password]':that.tradePwd
        };
        that.$axios({
          url:that.$store.state.domain+'/buy/create',
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
          headers:{
            'X-Requested-With':'XMLHttpRequest'
          }
        }).then((res)=>{
          console.log(res);
        }).catch((err)=>{
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
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }
  .dialog .dialog-inner{
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
    background: linear-gradient(#0098fb, #0050bf); /* 标准的语法 */
  }
  .dialog .dialog-inner .close{
    position: absolute;
    top:0;
    left:0;
    font-size: 0.36rem;
    padding:0.1rem 0.2rem;
  }
  .page{
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
  .head i.fa{
    float: left;
    padding:0.35rem 0.4rem;
    font-size: 0.4rem;
    position: relative;
  }
  .head .text{
    margin-left: -1rem;
  }

  .top{
    padding:0.45rem 0;
    font-size: 0.36rem;
    color: #ffffff;
    line-height: 0.6rem;
    background: #4db232;
    display: flex;
  }
  .top>div{
    flex:auto;
  }
  .top>div:first-child{
    border-right: 1px solid #ffffff;
  }
  .box{
    width:7rem;
    margin:0.25rem auto 0;
    border-radius: 0.4rem;
    box-shadow: #666 0 0 0.3rem;
    padding:0.2rem;
    background: #ffffff;
  }
  .box ul li{
    padding:0.35rem 0.3rem 0.2rem;
    border-bottom: 1px solid #ccc;
    text-align: left;
    font-size: 0.26rem;
  }
  .box ul li span{
    color: #4db232;
  }
  input[type=range]{
    float: right;
    margin-top: 0.1rem;
  }
  input[type=range] {
    -webkit-appearance: none;
    width: 2.4rem;
    border-radius: 0.3rem; /*这个属性设置使填充进度条时的图形为圆角*/
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #197700;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 0.3rem;
    margin-top: -0.1rem;
  }
  input[type=range]::-webkit-slider-runnable-track {
    height: 0.08rem;
    border-radius: 0.1rem; /*将轨道设为圆角的*/
    background: #77c361;
  }
  input::-webkit-input-placeholder{

  }
  .btn button{
    width:90%;
    height:0.8rem;
    margin-top: 0.4rem;
    border-radius: 5px;
    font-size: 0.3rem;
    color:#fff;
    background: -webkit-linear-gradient(#01ff49, #167703); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#01ff49, #167703); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#01ff49, #167703); /* Firefox 3.6 - 15 */
    background: linear-gradient(#01ff49, #167703); /* 标准的语法 */
  }
</style>
