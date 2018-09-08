<template>
  <div class="addition" >
    <div class="head">
        <i class="fa fa-arrow-left" @click="back()"></i>
        <span class="text">添加银行卡</span>
    </div>
    <div class="textbox">*请绑定持卡本人的银行卡，姓名一经填写不可修改！</div>
    <div class="input"  >
        <div class="form crace">
           <span>持卡人姓名</span>
           <input type="text" placeholder="持卡人姓名" v-model="userName">
        </div>
      <div class="form crace  account"  >
        <span>开户银行</span>
        <select name="" id="select-v" v-model="bankId">
            <option disabled value="">请选择开户银行</option>
            <option v-for="item in items" :value="item.bank_id">{{item.bank_name}}</option>
        </select>
      </div>
      <div class="form crace">
        <span>银行卡号</span>
        <input type="text" class="input1" placeholder="请输入开户银行的卡号" v-model="cardNumber">
      </div>
      <div class="form crace">
        <span>开户支行</span>
        <input type="text" class="input1" placeholder="请输入开户银行的支行分行" v-model="branch">
      </div>
      <div class="chicbox">
          <input type="checkbox"  v-model="defaul">
          <p>设置为默认银行卡</p>
      </div>
    </div>
    <div class="btn">
        <button @click="addItion()">创建订单</button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'addition',
  data () {
    return {
       items:[],
       bankId:'',
       userName:'',
       cardNumber:'',
       branch:'',
       defaul:false,

    }
  },
  created() {

      let that = this;
      //选择银行接口
        that.$axios.get(that.$store.state.domain+'/bank/index',{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-Requested-With': 'XMLHttpRequest'
            },
        })
        .then(res=>{
//          console.log(res);
          that.items=res.data.bank;

        }).catch(err=>{
           console.log(err);
        })
  },

  methods:{
    back(){
      this.$router.back(-1);
    },
     addItion () {
        let that = this;
        let data = {
          'Mybank[mybank_bank_id]': this.bankId ,
          'Mybank[mybank_name]': this.userName,
          'Mybank[mybank_account]': this.cardNumber,
          'Mybank[mybank_memberinfo_id]':'',
          'Mybank[mybank_is_default]':this.defaul?1:0,
          'Mybank[mybank_address]':this.branch ,
          'Mybank[mybank_memo]':"" ,
          // 'ajax': 'mybank-form'
        };
        if(that.username!==''&&that.cardNumber!==''){
          that.$axios({
            url:that.$store.state.domain+'/mybank/create',
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
            }],
          }).then(res=>{
            console.log(res);
            that.$store.commit('tips',res.data.success);
            setTimeout(()=>{
              that.$router.push('/mine/bankcard');
            },1500)
          }).catch(err=>{
            console.log(err);
          })
        }else{
          that.$store.commit('tips','开户名和卡号不可为空！');
        }

     }
   }
}
</script>


<style scoped>
.addition{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: #ffffff;
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
.textbox{
    width:100%;
    height:0.8rem;
    line-height: 0.8rem;
    color:#4DB232;
    background:#F5F5F5;
}
.input{
    width:90%;
    height:auto;
    margin: 0 auto;
}
.form{
    background: #ffffff;
    padding:0.4rem;
    font-size: 0.3rem;
    text-align: left;
    border-bottom:2px solid #DDDDDD;
  }
.form span{
    margin-right: 0.2rem;
  }
.form .input1{
    padding-left: 0.2rem;
}
.body .form input{
    width: 70%;
    padding:  0.6rem;
    font-size: 0.5rem;
    color: #000;
    border-bottom: 1px solid #DEDEDE;
  }
.chicbox{
    width:100%;
    height:1rem;
    line-height: 1rem;
    font-size:0.3rem;
    float: left;
}
.chicbox input{
    width:0.4rem;
    height:0.4rem;
    float: left;
    line-height: 1rem;
    margin: 0.3rem 0.3rem;
}
.chicbox p{
    float: left;
    color:#C8C8C8;
}
.addition .account{
    /*width:90%;*/
    height:1.3rem;

}
.addition .account span{
    float: left;
}
.addition .account select{
  font-size: 0.28rem;
    outline: none;
    margin-left: 0.3rem;
    border:none;
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
