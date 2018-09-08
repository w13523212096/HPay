<template>
  <div class="bankcard">
    <div class="head">
        <i class="fa fa-arrow-left" @click="$router.back(-1)"></i>
        <span class="text">银行卡管理</span>
    </div>
    <div class="body">
      <div class="bank" v-for="(item,index) in items">
        <div class="logo">
          <img src="../../assets/images/bankcard.jpg" alt="">
        </div>
        <div class="text" >
          <p class="" >{{item.mybankBank.bank_name}}</p>
          <p class="card">{{item.mybank_account}}</p>
        </div>
        <div class="delete">
          <a href="#" @click=" deleteCard (index,item.mybank_id)">
            <img src="../../assets/images/shanchu.png" alt="">
            <p >删除</p>
          </a>
        </div>
      </div>
      <div class="btn">
        <router-link  to="/mine/addition">
          <button>
            <img src="../../assets/images/katu.png" alt="">
            <p>添加银行卡</p>
          </button>
        </router-link>
      </div>
    </div>
    <div class="confirm" v-show="confirmShow">
      <div class="confirm-inner">
        <h4>确认删除？</h4>
        <div class="btn clearfix"><a href="#" @click="confirm()">确认</a><a href="#" @click="cancel()">取消</a></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
 name:'bankcard',
 data(){
     return{
       items:[],
       confirmShow:false,
       willDeleteIndex:null,
       willDeleteId:null
     }
 },
 mounted() {
    this.getCard()

 },
 methods: {
    getCard () {
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
//          console.log(res);
          that.items=res.data.mybank.data;
        }).catch(err=>{
           console.log(err);
        })
     },
    deleteCard (index,id) {
      this.confirmShow = true;
      this.willDeleteIndex = index;
      this.willDeleteId = id;
     },
    confirm(){
      let that = this;
      that.$axios({
        url:that.$store.state.domain+'/mybank/delete/'+that.willDeleteId,
        method:'post',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).then(function(res){
//        console.log(res);
        if(res.data.success){
          that.$store.commit('tips',res.data.success);
          that.confirmShow = false;
          for(let i in that.items){
            if(that.items[i].mybank_id === that.willDeleteId){
              that.items.splice(i,1);
            }
          }
        }
      }).catch(function(err){
        console.log(err);
      })
    },
   cancel(){
      this.confirmShow = false;
   }
 },
}
</script>


<style scoped>
.bankcard{
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
    padding-left:2rem;
    left: 0rem;
}
.body{
  overflow:auto;/* winphone8和android4+ */
  -webkit-overflow-scrolling: touch; /* ios5+ */
  position: absolute;
  top: 1.16rem;
  left:0;
  width:100%;
  bottom:0;
}
.bank{
    width:95%;
    height:1.7rem;
    border:1px solid #fff;
    border-radius: 10px;
    background:#fff;
    box-shadow: #E3E3E3 0px 3px 4px 0px ;
    margin: 0.4rem auto 0;
}
.bank .logo{
    float: left;
    /*line-height: 2.3rem;*/
    margin: 0.4rem 0.2rem;
}
.bank .text{
  text-align: left;
  float: left;
}
.bank .text p{
    font-size:0.33rem;
    margin: 0.3rem 0  0  0.3rem ;
}
.bank .delete {
   float: right;
   margin-right: 0.3rem;
   margin-top: 0.5rem;
}

.btn button{
    width:90%;
    height:0.8rem;
    line-height: 0.8rem;
    margin-top: 0.4rem;
    border-radius: 5px;
    font-size: 0.3rem;
    color:#fff;
    background: -webkit-linear-gradient(#01ff49, #167703); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#01ff49, #167703); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#01ff49, #167703); /* Firefox 3.6 - 15 */
    background: linear-gradient(#01ff49, #167703); /* 标准的语法 */
  }
.btn button p{
    float:left;

    line-height: 0.8rem;
}
.btn button img{
    float: left;
    margin: 0.2rem 0.4rem;
}
.confirm{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
}
.confirm-inner{
  position: absolute;
  top:50%;
  left:50%;
  width:50%;
  transform: translate(-50%,-50%);
  background: #ffffff;
  border-radius: 0.2rem;
  /*box-shadow: 0 0 0.3rem 0.05rem #999;*/
  padding: 0.5rem;
}
.confirm h4{
  font-size: 0.3rem;
}
.confirm .btn{
  margin-top: 0.5rem;
  font-size: 0.28rem;
  clear: both;
  border:1px solid #ccc;
  border-radius: 0.3rem;
}
.confirm .btn a{
  display: block;
  width: 50%;
  float: left;
  padding:0.1rem 0.2rem;
}
.confirm .btn a:first-child{
  border-right: 1px solid #ccc;
}
</style>
