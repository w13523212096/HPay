<template>
  <div class="page">
    <div class="title">请选择卖出数量</div>
    <ul class="list">
      <li v-for="(item,index) in numberList" :class="{active:index===activeIndex}" @click="chooseNum(index)">{{item}}</li>
    </ul>
    <div class="choose-card">
      <div class="choose">
        <span class="text">收款银行卡</span>
        <i class="fa fa-angle-right"></i>
      </div>
      <div class="card">
        <select name="bankcard">
          <option value="" v-for="(item,index) in bankList" >
            {{item.mybankBank.bank_name}} &nbsp {{item.mybank_account}}
          </option>
        </select>
      </div>
    </div>
    <div class="btn">
      <button @click="confirm()">创建订单</button>
    </div>
    <div class="dialog" v-if="tradePwdShow">
      <div class="box">
        <div class="text">交易密码</div>
        <div class="pwd">
          <input type="password" v-model="tradePwd" autofocus="autofocus">
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
        numberList:[500,1000,3000,5000,10000,30000],
        activeIndex:0, //选中的项
        tradePwd:'',
        tradePwdShow:false,
        bankList:null,  //银行卡
      }
    },
    created(){
      let that = this;
      that.$axios.get(that.$store.state.domain+'/mybank/index',{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        },
        params:{
          _dc:new Date().getTime(),
          page: 1,
          start: 0,
          limit: 25
        }
      }).then(res=>{
//        console.log(res);
        that.bankList = res.data.mybank.data;
      }).catch(err=>{
        console.log(err);
      })
    },
    inject:['reload'],
    methods:{
      backHome(){
        this.$router.go(-1);
      },
      chooseNum(index){
        this.activeIndex = index;
      },
      chooseCard(){
        this.activeCard  = true;
      },
      confirm(){
        //this.$store.commit('loading',true);
        this.tradePwdShow = true;
        this.tradePwd = '';
      },
      sell(){
        let that = this;
        let data = {
          'Buy[buy_currency]':that.numberList[that.activeIndex],
          'Buy[buy_type]':0,
          'Buy[trade_password]':that.tradePwd
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
//          console.log(res);
          if(!res.data.trade_password){
            if(!res.data.error){
              that.$store.commit('tips',res.data.success);
              setTimeout(()=>{
                that.$router.push('/home/trade/buying')
                that.reload();
              },1500)
            }else{
              that.$store.commit('tips',res.data.error);
            }
          }else{
            that.$store.commit('tips',res.data.trade_password[0])
          }
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
  }
  .title{
    font-size: 0.3rem;
    line-height: 0.7rem;
    text-align: left;
    padding-left: 0.4rem;
  }
  .list{
    height: 2.5rem;
    display: flex;
    padding:0.35rem 0;
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #ccc;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-between;
  }
  .list li{
    width:2.15rem;
    height:0.68rem;
    line-height: 0.68rem;
    border-radius: 0.68rem;
    flex:none;
    color: #4db232;
    border:1px solid #4db232

  }
  .list li.active{
    color: #ffffff;
    border:none;
    background: -webkit-linear-gradient(#01ff49, #167703); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#01ff49, #167703); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#01ff49, #167703); /* Firefox 3.6 - 15 */
    background: linear-gradient(#01ff49, #167703); /* 标准的语法 */
  }
  .choose-card{
    padding:0.2rem 0.36rem;
    text-align: left;
  }
  .choose{
    border:1px solid #ccc;
    background: #eeeeee;
    color: #666;
    border-radius: 5px;
    padding:0.2rem;
  }
  .choose i.fa{
    float: right;
    font-size: 0.3rem;
  }
  .card{

    color: #222;
    margin-top: 0.2rem;
  }
  .card select{
    width: 100%;
    padding:0.36rem 0.2rem;
    border:1px solid #ccc;
    border-radius: 5px;
    font-size: 0.28rem;
  }
  .btn button{
    width:80%;
    height:0.8rem;
    margin-top: 0.4rem;
    border-radius: 5px;
    font-size: 0.3rem;
    color:#fff;
  }
</style>
