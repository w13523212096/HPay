<template>
  <div id="app">
    <div class="footer">
      <ul>
        <li>
          <router-link to='/home'>
            <i class="fa fa-home"></i>
            <p class="text">首页</p>
          </router-link>
        </li>
        <li>
          <router-link to='/asset'>
            <i class="fa fa-usd"></i>
            <p class="text">资产</p>
          </router-link>
        </li>
        <li>
          <router-link to='/application'>
            <i class="fa fa-location-arrow"></i>
            <p class="text">应用</p>
          </router-link>
        </li>
        <li>
          <router-link to='/mine'>
            <i class="fa fa-user"></i>
            <p class="text">我的</p>
          </router-link>
        </li>
      </ul>

    </div>
    <router-view v-if="isRouterAlive"></router-view>
    <loading></loading>
    <tips></tips>
  </div>
</template>

<script>
  import Loading from '@/components/Loading'
  import Tips from '@/components/Tips'
export default {
  name: 'App',
  components:{
    loading:Loading,
    tips:Tips,
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  height: 100%;
  padding-bottom: 0.9rem;
  overflow:auto;/* winphone8和android4+ */
  -webkit-overflow-scrolling: touch; /* ios5+ */
}
.footer{position: fixed;bottom:0;left:0; z-index: 999; width:100%; background: #f5f5f5;}
.footer ul{ display: flex;  height:0.9rem; border-top: 1px solid #aaa; padding:0.08rem 0.2rem;}
.footer ul li{ flex: auto;  text-align: center;font-size: 0.22rem; }
.footer ul li a{ display: block; color: #707070; }
.footer ul li a.router-link-active{ color:#82cc1b; }
.footer ul li a i.fa{ font-size: 0.4rem }
</style>
