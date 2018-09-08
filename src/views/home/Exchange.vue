<template>
  <div class="integral-page">
    <div class="head">
      <i class="fa fa-arrow-left" @click="backHome()"></i>
      <span class="text">兑换积分</span>
      <span class="record-btn" @click="toRecord()">兑换记录</span>
    </div>
    <div class="body">
      <div class="userinfo">
        <div class="balance">
          <i class="fa fa-hourglass-half "></i>
          <p class="text">我的余额</p>
          <p class="num">{{userBalance}}</p>
        </div>
        <div class="integral">
          <i class="fa fa-credit-card"></i>
          <p class="text">我的积分</p>
          <p class="num">{{userIntegral}}</p>
        </div>
      </div>
      <div class="form">
        <span>数量</span>
        <input type="text" placeholder="请输入兑换数量" v-model="number">
      </div>
      <div class="notice">
        提示：请输入10.0的整数倍
      </div>
      <div class="btn">
        <button @click="transfer()">确定兑换</button>
      </div>
    </div>
    <div class="record" v-if="recordShow">
      <div class="head">
        <i class="fa fa-arrow-left" @click="recordBack()"></i>
        <span class="text">兑换记录</span>
      </div>
      <div class="record-body">
        <table>
          <thead>
          <tr>
            <th>时间</th>
            <th>兑换金额</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in recordList">
            <td>{{item.transfer_add_date}}</td>
            <td>{{item.transfer_currency}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        userBalance:this.$store.state.userMoney[0].finance_award, //余额
        userIntegral:this.$store.state.userMoney[1].finance_award,  //积分
        number:null,
        recordShow:false,
        recordList:null
      }
    },
    inject:['reload'],
    created(){
      let that = this;
      let data = that.$store.state;
      //获取转账(积分)记录
      that.$axios({
        url:data.domain+'/transfer/index',
        method:'get',
        headers:{
          'X-Requested-With': 'XMLHttpRequest'
        },
        params:{
          _dc:new Date().getTime(),
          page: 1,
          start: 0,
          limit: 25,
          'Transfer[transfer_src_finance_type]':2,
          'Transfer[transfer_dst_finance_type]':1
        }
      }).then((res)=> {
//        console.log('兑换记录', res);
        if(res.status === 200){
          that.recordList = res.data.transfer.data;
        }else{
          that.$store.commit('tips','获取记录失败');
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    methods:{
      backHome(){
        this.$router.go(-1);
      },
      toRecord(){
        this.recordShow = true;
      },
      recordBack(){
        this.recordShow = false;
      },
      transfer() {
        let that = this;
        let data = {
          'Transfer[transfer_src_finance_type]':2,
          'Transfer[transfer_currency]':that.number,
          'Transfer[transfer_dst_finance_type]':1,
          'Transfer[transfer_remark]':''
        };
        that.$axios({
          url: that.$store.state.domain + '/transfer/createSelf',
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
          if(res.data.success){
            that.$store.commit('tips','兑换成功！');
            setTimeout(()=>{
              that.$router.push('/home');
              that.reload();
            },1500)
          }else{
            that.$store.commit('tips',res.data.transfer_currency[0]);
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  .integral-page{
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
  .head .record-btn{
    font-size: 0.2rem;
    float: right;
    margin-right: 0.2rem;
  }
  .userinfo{
    display: flex;
    background: #167703;
    color: #ffffff;
    font-size: 0.3rem;
    padding:0.6rem 0 0.2rem;
  }
  .userinfo>div{
    flex:auto;
  }
  .userinfo i.fa{
    font-size: 0.5rem;
    margin-bottom: 0.1rem;
  }
  .userinfo .num{
    margin-top: 0.3rem;
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
    padding: 0 0.2rem;
    font-size: 0.32rem;
    color: #000;
  }
  .notice{
    font-size: 0.28rem;
    color: #919191;
    padding:0.4rem;
    text-align: left;
  }
  .btn button{
    width:90%;
    height:0.8rem;
    border-radius: 5px;
    font-size: 0.3rem;
    color:#fff;
    background: -webkit-linear-gradient(#01ff49, #167703); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#01ff49, #167703); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#01ff49, #167703); /* Firefox 3.6 - 15 */
    background: linear-gradient(#01ff49, #167703); /* 标准的语法 */
  }
  .record{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    background: #ffffff;
  }
  .record .record-body{
    position: absolute;
    top: 1.16rem;
    left: 0;
    width: 100%;
    bottom: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .record-body table{
    width: 100%;
    border-spacing: 0;
    font-size: 0.28rem;
  }
  table thead{
    background: #f5f5f5;
  }
  table th,td{
    padding:0.2rem 0;
  }
</style>
