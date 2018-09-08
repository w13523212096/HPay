<template>
    <div class="page">
      <div class="head">
        <i class="fa fa-arrow-left" @click="backHome()"></i>
        <span class="text">众筹项目中心</span>
      </div>
      <div class="body">
        <ul class="tabs">
          <li v-for="(item,index) in allType">
            <i class="fa fa-qrcode"></i>
            <p class="text">{{item}}</p>
          </li>
        </ul>
        <ul class="item-list">
          <li v-for="item in allType">
            <div class="tit">
              <div class="icon"><i class="fa fa-qrcode"></i></div>
              <p>HPay币</p>
              <p>每个ID限购1000枚 <span>释放比例：100.00%</span></p>
              <p><span>接受币种：</span>余额</p>
              <p class="time"><i class="fa fa-clock-o"></i>2018-08-08</p>
            </div>
            <div class="con clearfix">
              <ul>
                <li>
                  <p class="text">众筹数量</p>
                  <p class="num">500000</p>
                </li>
                <li>
                  <p class="text">价格</p>
                  <p class="num">1HPay=2.70(余额)</p>
                </li>
                <li>
                  <p class="text">开启时间</p>
                  <p class="num">2018-09-02</p>
                </li>
              </ul>
              <div class="progress">
                <div class="bar"></div>
              </div>
              <div class="btn"><span>暂未开启</span></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default {
    data(){
      return{
        allType:['预热中','进行中','已结束']
      }
    },
    methods:{
      backHome(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
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
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    z-index:99;
  }
  .head i.fa{
    float: left;
    padding:0.35rem 0.4rem;
    font-size: 0.4rem;
    position: relative;
  }
  .body{
    height:100%;
    padding-top: 1.16rem;
    overflow:auto;/* winphone8和android4+ */
    -webkit-overflow-scrolling: touch; /* ios5+ */
  }
  .tabs{
    display: flex;
  }
  .tabs li{
    width:33%;
    flex:auto;
    background: #ffffff;
    padding:0.25rem 0;
    border-right: 2px solid #f5f5f5;
  }
  .tabs li:last-child{
    border:none;
  }
  .tabs li i.fa{
    font-size: 0.8rem;
  }
  .tabs li p.text{
    margin-top: 0.2rem;
  }
  .item-list>li{
    margin-top: 0.1rem;
    padding:0.28rem 0.45rem;
    background: #ffffff;
  }
  .item-list .tit{
    border-bottom: 1px solid #ccc;
    text-align: left;
    overflow: hidden;
    position: relative;
    padding-bottom: 0.2rem;
  }
  .item-list .tit .icon{
    width:1.1rem;
    height: 1.1rem;
    line-height:1.1rem;
    border-radius: 0.3rem;
    font-size: 0.6rem;
    color: #ffffff;
    text-align: center;
    float: left;
    margin-right: 0.25rem;
    background: -webkit-linear-gradient(#01ff49, #167703); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#01ff49, #167703); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#01ff49, #167703); /* Firefox 3.6 - 15 */
    background: linear-gradient(#01ff49, #167703); /* 标准的语法 */
  }
  .item-list .tit p{
    font-size: 0.26rem;
    margin-top: 0.05rem;
  }
  .item-list .tit p:nth-of-type(1){
    font-size: 0.32rem;
  }
  .item-list .tit p span{
    color: #aaa;
  }
  .item-list .tit p.time{
    position: absolute;
    top:0;
    right:0;
    color: #167703;
  }
  .item-list .tit p.time i.fa{
    margin-right: 0.1rem;
  }
  .item-list .con ul{
    display: flex;
  }
  .item-list .con li{
    flex:auto;
  }
  .item-list .con li p{
    margin-top: 0.1rem;
  }
  .item-list .con li p.text{
    color: #aaa;
  }
  .item-list .con .progress{
    width:3.9rem;
    height:0.35rem;
    border-radius: 0.35rem;
    background: #d2d2d2;
    float: left;
    margin-top: 0.2rem;
    overflow: hidden;
  }
  .item-list .con .progress .bar{
    width:50%;
    height:100%;
    border-radius: 0.35rem;
    background: -webkit-linear-gradient(#01ff49, #167703); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#01ff49, #167703); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#01ff49, #167703); /* Firefox 3.6 - 15 */
    background: linear-gradient(#01ff49, #167703); /* 标准的语法 */
  }
  .item-list .con .btn{
    width: 1.65rem;
    height: 0.4rem;
    line-height:0.4rem;
    background: #aaa;
    border-radius: 3px;
    float: right;
    margin-top: 0.2rem;
    color: #666;
  }
</style>
