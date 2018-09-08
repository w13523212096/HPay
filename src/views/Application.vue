<template>
	<div class="application">
		<div class="header">应用导航</div>
		<ul class="list">
			<li>
				<router-link to="/application/league">
					<i class="fa fa-share-alt"></i>
					商家联盟
        </router-link>
			</li>
			<li>
        <router-link to="/application/newretail">
					<i class="fa fa-paper-plane-o"></i>
					新零售
        </router-link>
			</li>
			<li>
        <router-link to="/application/entertainment">
					<i class="fa fa-ticket"></i>
					娱乐游戏
        </router-link>
			</li>
			<li>
        <router-link to="/application/qrcode">
					<i class="fa fa-qrcode"></i>
					扫一扫
        </router-link>
			</li>
		</ul>
    <router-view/>
	</div>
</template>

<script>
export default {
  name: 'application',
  data () {
    return {
      msg: '我是应用组件',
    }
  },
  methods:{

  }
}
</script>

<style scoped>
	.application{ height: 100%;background: #f5f5f5; }
  .header{ background: #4db232; color:#fff; line-height: 1rem; font-size: 0.36rem; }
  .list li{ font-size: 0.32rem; text-align: left; margin-bottom: 0.1rem; background: #fff;}
  .list li a{ display: block; padding:0.2rem 0.3rem; }
  .list li a i.fa{ font-size: 0.4rem; color:#4db232; margin-right: 0.2rem;}
</style>
