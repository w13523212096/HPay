<template>
  <div class="moneyto">
    <div class="head">
      <i class="fa fa-arrow-left" @click="backHome()" v-if="accountShow"></i>
      <i class="fa fa-arrow-left" @click="last()" v-else></i>
      <span class="text">转账</span>
      <span class="record-btn" @click="toRecord()">转账记录</span>
    </div>
    <div class="body">
      <div class="account" v-if="accountShow">
        <span>对方账户</span>
        <input type="text" placeholder="请输入对方账户" v-model="account">
      </div>
      <div class="other" v-if="!accountShow">
        <div class="number">
          <span>金额</span>
          <input type="number" placeholder="请输入金额" v-model="number">
        </div>
        <div class="remark">
          <span>留言</span>
          <input type="text" placeholder="请输入留言内容" v-model="remark">
        </div>
      </div>
      <div class="btn">
        <button @click="next()" v-if="accountShow">下一步</button>
        <button @click="transfer()" v-if="!accountShow">确认</button>
      </div>
    </div>
    <div class="record" v-if="recordShow">
      <div class="head">
        <i class="fa fa-arrow-left" @click="recordBack()"></i>
        <span class="text">转账记录</span>
      </div>
      <div class="record-body">
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th>金额</th>
              <th>转出账户</th>
              <th>转入账户</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in recordList">
              <td>{{item.transfer_add_date}}</td>
              <td>{{item.transfer_currency}}</td>
              <td>{{item.transferSrcMember.memberinfo_account}}</td>
              <td>{{item.transferDstMember.memberinfo_account}}</td>
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
        account:'', //对方账户
        accountShow:true,
        number:null,//金额
        remark:'', //留言,
        recordShow:false,
        recordList:null
      }
    },
    inject:['reload'],
    created(){
      let that = this;
      let data = that.$store.state;
      //获取转账记录
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
          'Transfer[transfer_dst_finance_type]':2
        }
      }).then((res)=> {
//        console.log('转账记录', res);
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
      last(){
        this.accountShow = true;
      },
      next(){
        let that = this;
        if(that.account!==''){
          let data = {
            'Transfer[transfer_src_finance_type]':2,
            'Transfer[transfer_currency]':0,
            'Transfer[transfer_dst_member_id]':that.account,
            'Transfer[transfer_dst_finance_type]':2,
            'Transfer[transfer_remark]':that.remark
          };
          that.$axios({
            url: that.$store.state.domain + '/transfer/create',
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
//            console.log(res);
            if(res.data.transfer_dst_member_id){
              that.$store.commit('tips',res.data.transfer_dst_member_id[0]);
            }else{
              this.accountShow = false;
            }
          }).catch((err) => {
            console.log(err);
          })
        }else{
          that.$store.commit('tips','请输入对方账户');
        }
      },
      transfer() {
        let that = this;
        let data = {
          'Transfer[transfer_src_finance_type]':2,
          'Transfer[transfer_currency]':that.number,
          'Transfer[transfer_dst_member_id]':that.account,
          'Transfer[transfer_dst_finance_type]':2,
          'Transfer[transfer_remark]':that.remark
        };
        that.$axios({
          url: that.$store.state.domain + '/transfer/create',
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
            that.$store.commit('tips',res.data.success);
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
  .moneyto{
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
  .account,.other>div{
    background: #ffffff;
    padding:0.4rem;
    font-size: 0.3rem;
    text-align: left;
  }
  .account span,.other>div span{
    margin-right: 0.2rem;
  }
  .account input,.other>div input{
    width: 70%;
    padding: 0 0.2rem;
    font-size: 0.32rem;
    color: #000;
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
