<template>
	<div class="asset">
		<div class="head">
			<ul>
				<li>
					<p class="num">{{userNumberAsset}}</p>
					<p class="tit">数字资产(个)</p>
				</li>
				<li>
					<p class="num">{{currentPrice}}</p>
					<p class="tit">当前价格(￥)</p>
				</li>
			</ul>
			<div class="address">钱包地址：{{walletAddress}}<a href="#" class="copy">复制地址</a></div>
		</div>
		<div class="handle">
			<ul>
				<li>
          <router-link to="/asset/moneyto">
            <i class="fa fa-send"></i>
            <p class="text">转出</p>
          </router-link>
				</li>
				<li>
          <router-link to="/asset/raise">
            <i class="fa fa-handshake-o"></i>
            <p class="text">众筹</p>
          </router-link>
				</li>
				<li>
          <router-link to="/asset/hbao">
            <i class="fa fa-puzzle-piece"></i>
            <p class="text">H宝</p>
          </router-link>
				</li>
				<li>
          <router-link to="/asset/transaction">
            <i class="fa fa-exchange"></i>
            <p class="text">交易</p>
          </router-link>
				</li>
			</ul>
		</div>
		<div class="currency-list">
			<ul>
				<li v-for="item in allMoney">
          <div class="name">
            <i class="fa" :class="item.iconClass" :style="{background:item.bgColor}"></i>
            <p>{{item.name}}</p>
          </div>
          <div class="number">
            <p class="num">{{item.number}}</p>
            <p class="text">当前持有</p>
          </div>
          <div class="price">
            <p class="num">{{item.price}}</p>
            <p class="text">当前价格</p>
          </div>
          <!--<div class="control">-->
            <!--<router-link to="/asset/transaction" class="yue">余额交易</router-link>-->
            <!--<router-link to="/asset/transaction" class="xianjin">现金交易</router-link>-->
          <!--</div>-->
				</li>
			</ul>
		</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Asset',
  data () {
    return {
      userNumberAsset:0,
      currentPrice:'default',
      walletAddress:'default',
      allMoney:[{
        name:'HPay',
        number:0,
        price:'default',
        bgColor:'#03a608',
        iconClass:'fa-header'
      },{
        name:'比特币',
        number:0,
        price:'default',
        bgColor:'#f89537',
        iconClass:'fa-btc'
      },{
        name:'莱特币',
        number:0,
        price:'default',
        bgColor:'#c1c1c1',
        iconClass:'fa-italic'
      },{
        name:'以太坊',
        number:0,
        price:'default',
        bgColor:'#5e68ab',
        iconClass:'fa-yoast'
      },{
        name:'狗狗币',
        number:0,
        price:'default',
        bgColor:'#9b7d49',
        iconClass:'fa-database'
      }]
    }
  },
  methods:{

  }
}
</script>

<style scoped>
	.head{ background: url(../assets/images/bg.jpg) center;
    -webkit-background-size: cover;
    background-size: cover; overflow: hidden;}
	.head ul { display: flex; margin:1.5rem 0 0.5rem; }
	.head ul li{ width:50%; flex:auto; color:#fff;  font-size: 0.3rem; }
  .head ul li:first-child{border-right: 1px solid #ffffff;}
	.head ul li .tit{ margin-top: 0.2rem;}
	.head .address{ padding:0.2rem 1.65rem 0.2rem 0.3rem; text-align: left; color:#fff;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; position: relative;}
	.head .address .copy{ display: block; width: 1.4rem;height: 0.6rem;line-height: 0.6rem;border-radius: 0.2rem;
    position: absolute;right: 0.2rem;top:0; color:#fff; text-align: center;
    background: -webkit-linear-gradient(#01ff49, #167703); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#01ff49, #167703); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#01ff49, #167703); /* Firefox 3.6 - 15 */
    background: linear-gradient(#01ff49, #167703); /* 标准的语法 */}
	.handle{ padding:0.26rem 0; border-bottom: 1px solid #aaa;}
	.handle ul{ display: flex; }
	.handle ul li{ width:25%; flex: auto; }
  .handle ul li a{
    display: block;}
	.handle ul li i.fa{ font-size: 0.6rem; color:#1a7800; }
  .handle ul li .text{ margin-top: 0.1rem; }
	.currency-list{  }
	.currency-list ul li{ padding:0.2rem 0.3rem; border-bottom: 1px solid #ccc;}
	.currency-list ul li .name{ font-size: 0.22rem;
    padding: 0;}
	.currency-list ul li .name i.fa{
    width: 0.9rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    border-radius: 0.2rem;
    color:#ffffff;
    font-size: 0.5rem;
  }
	.currency-list ul li { display: flex; }
	.currency-list ul li>div{ flex: auto; line-height: 0.45rem; padding-top: 0.15rem; }
	.currency-list ul li .text{ margin-top: 0.12rem; }
  .currency-list ul li .control{ padding:0.2rem 0.3rem;}
	.currency-list ul li .control>a{display: block; background: #1a7800; border-radius: 0.45rem; color:#fff; }
	.currency-list ul li .control>a.xianjin{ margin-top: 0.12rem; background: #2fdd00; }
</style>
