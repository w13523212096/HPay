<template>
  <div class="about">
    <div class="head">
        <i class="fa fa-arrow-left" @click="$router.back(-1)"></i>
        <span class="text">关于我们</span>
    </div>
    <div class="body">
      <p>
          全球顶尖的区块链技术团队，支付结合市场八大优势，融入成一个系统，实现完全去中心化，会员间点对点流通，
          打造全球跨境支付平台以及全球数字货币交易平台.
      </p>
      <ul>
        <li>1 ．拆分（原始发行 1000 万）</li>
        <li>2 ．互助（买进卖出点对点匹配打款）</li>
        <li>3 ．分红（每天最底 2 ％。释放）</li>
        <li>4 ．复利（放大倍增） </li>
        <li>5 ．虚拟币（区块链挖矿机制）</li>
        <li>6 ．数字资产（低进高出炒币）</li>
        <li>7 ．资产证券化（最高释放完再复投）</li>
        <li>8 ．消费返利（落地商家扫码支付）</li>
      </ul>
      <h4>核心</h4>
      <p>
          基于区块链分布式智能合约技术，实现货币的去中心化，点对点无损无痕流通，让流通产生价值，让快速流通增加哈希算力，最终加速价值的释放。
      </p>
      <p>名词释意:</p>
      <p>
          【余额】: 法定货币现金，也可以称之为现金币，简称钱。
      </p>
      <p>
         【积分】: 余额每流通(转出、支付)一次，系统会赠送80%的积分，积分是余额流通产生的价值。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {

    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.about{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: #f5f5f5;
    z-index: 1000;
    font-family:"微软雅黑";

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
  background: #ffffff;
  padding: 0.35rem;
  text-align: left;
  font-size: 0.28rem;
  line-height: 0.4rem;
  position: absolute;
  top: 1.16rem;
  bottom: 0;
}
  .body p{
    margin-top: 0.2rem;
  }
  .body li{
    margin-top: 0.2rem;
  }
  .body h4{
    font-size: 0.32rem;
    margin-top: 0.5rem;
  }
</style>
