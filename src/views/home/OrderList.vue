<template>
  <div class="page">
    <ul class="tabs">
      <li v-for="(item,index) in tabs" :class="{active:index === activeTabs}" @click="shift(index)">{{item}}</li>
    </ul>
    <div class="content">
      <div class="buy-list" v-show="activeTabs === 0">
        <div class="item" v-for="item in buyList">
          <div>时间：{{item.dealBuy.buy_date}}</div>
          <div>金额：{{item.dealBuy.buy_currency}}</div>
          <div>收款人账户：{{item.dealBuy.buyMember.memberinfo_account}}</div>
          <div>收款人姓名：{{item.dealBuy.buyMember.memberinfoMybank.mybank_name}}</div>
          <div>收款人卡号：{{item.dealBuy.buyMember.memberinfoMybank.mybank_account}}</div>
          <div>收款人银行：{{item.dealBuy.buyMember.memberinfoMybank.mybankBank.bank_name}}</div>
          <div>收款人支行：{{item.dealBuy.buyMember.memberinfoMybank.mybank_address}}</div>
          <div class="status">
            <div class="pic" v-if="item.deal_status === 0">上传图片
              <input type="file" @change="fileImage($event,item.deal_id)" class="change"></div>
            <div v-else-if="item.deal_status === 1">待确认</div>
            <div v-else>已完成</div>
          </div>
        </div>
      </div>
      <div class="sell-list" v-show="activeTabs === 1">
        <div class="item" v-for="item in saleList">
          <div>时间：{{item.dealSale.sale_date}}</div>
          <div>金额：{{item.dealSale.sale_currency}}</div>
          <div>打款人：{{item.dealSale.saleMember.memberinfo_nickname}}</div>
          <div class="status">
            <div v-if="item.deal_status === 0">已匹配</div>
            <div v-else-if="item.deal_status === 1">
              <div>
                <div @click="openPic()">
                  <i class="fa fa-picture-o"></i>点击查看
                </div>
                <button @click="confirm(item.deal_id)">确认订单</button>
              </div>
              <div class="picture" v-if="picOpen">
                <i class="fa fa-times" @click="closePic()"></i>
                <img :src="picUrl+item.deal_image" alt="">
              </div>
            </div>
            <div v-else>已完成</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        tabs:['我的买入','我的卖出'],
        activeTabs:0,
        buyList:[],
        saleList:[],
        orderList:null,
        picUrl:'http://192.168.31.31:9214',
        picOpen:false,
        setImg:false
      }
    },
    inject:['reload'],
    created(){
      this.getDeal();
    },
    methods:{
      backHome(){
        this.$router.back(-1);
      },
      openPic(){
        this.picOpen = true;
      },
      closePic(){
        this.picOpen = false;
      },
      shift(index){
        this.activeTabs = index;
      },
      getDeal(){
        let that = this;
        let data = that.$store.state;
        //获取成交列表
        that.$axios({
          url:data.domain+'/deal/index',
          method:'get',
          headers:{
            'X-Requested-With': 'XMLHttpRequest'
          },
          params:{
            _dc:new Date().getTime(),
            page: 1,
            start: 0,
            limit: 25
          }
        }).then((res)=>{
          console.log('成交',res);
          let data = res.data.deal.data;
          let id = that.$store.state.userInfo.memberinfo_id;
          that.orderList = data;
          for(let i in data){
            if(data[i].dealBuy.buy_member_id === id){
              that.saleList.push(data[i])
            }else{
              that.buyList.push(data[i])
            }
          }
        });
      },
      fileImage(e,id){
        let that = this;
        let file = e.target.files[0];
        let data = new FormData();
        data.append('Deal[deal_image]', file, file.name);
        data.append('Deal[deal_id]', id);
        that.$axios({
          url:that.$store.state.domain+'/deal/upload',
          method:'post',
          data:data,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': null
          }
        }).then(res=>{
//          console.log(res)
            that.$store.commit('tips','上传完成！');
            that.reload();
        });

      },
      confirm(id){
        let that = this;
        that.$axios({
          url:that.$store.state.domain+'/deal/verify/'+id,
          params:{
            _dc:new Date().getTime()
          },
          headers:{
            'X-Requested-With': 'XMLHttpRequest',
          }
        }).then(res=>{
//          console.log(res)
          if(res.success){
            that.$store.commit('tips','确认完成！');
            that.reload();
          }
        })
      }
    }
  }
</script>

<style scoped>
  .pic{
    position: relative;
    /*border: 1px solid #999;*/
  }
  .pic .change{
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .page{
    background: #ffffff;
    overflow: hidden;
    /*position: relative;*/
  }
  .tabs{
    width:5.8rem;
    height:0.7rem;
    line-height:0.7rem;
    margin:0.2rem auto 0.3rem;
    border:1px solid #197700;
    border-radius:0.7rem ;
    overflow: hidden;
    background: #ffffff;
    display: flex;
  }
  .tabs li{
    flex:auto;
    width: 50%;
    background: #ffffff;
    color: #197700;
    font-size: 0.3rem;
  }
  .tabs li.active{
    background: #197700;
    color: #ffffff;
  }
  .content{
    padding:0.3rem;
    position: fixed;
    top: 3rem;
    left: 0;
    width: 100%;
    bottom: 0;
    text-align: left;
    overflow:auto;/* winphone8和android4+ */
    -webkit-overflow-scrolling: touch; /* ios5+ */
  }
  .item{
    font-size: 0.28rem;
    padding:0.2rem 0.3rem;
    background: #ffffff;
    /*border-bottom: 1px solid #ccc;*/
    margin-bottom: 0.3rem;
    border-radius: 0.3rem;
    box-shadow: 0 0 0.1rem 0.03rem #ccc;
    line-height:0.5rem;
    position: relative;
    overflow: hidden;
  }
  .item .status{
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    border:1px solid #197700;
    color: #197700;
    padding:0 0.2rem;
    border-radius: 0.2rem;
  }
  .item .status button{
    padding:0.1rem 0.3rem;
    color: #ffffff;
    border-radius: 0.2rem;
    position: absolute;
    right:0;
    bottom:-0.8rem;
  }
  .item .picture{
    position: fixed;
    left:50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 70%;
    padding:0.2rem;
    border:1px solid #ccc;
    border-radius: 0.2rem;
    background: #ffffff;
  }
  .item .picture .fa{
    float: right;
    padding:0.2rem;
  }
</style>
