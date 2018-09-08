<template>
    <div class="tips" v-show="tips">{{tips}}</div>
</template>

<script>
  export default {
    name: 'tips',
    computed:{
      tips(){
        return this.$store.state.tipsInfo;
      }
    }
    /*data() {
      return {
        tips: ''
      }
    },*/
    /*created(){
      this.$store.commit('tips',{show:true,content:this.content});
    },*/
    /*watch: {
      // 检测tips变化
      tips: function () {
        if (this.tips.show) {
          setTimeout(() => {
            this.tips.show = false;
          }, 2000)
        }
      }
    }*/
  };
</script>

<style scoped>
  .tips{
    padding:0.5rem;
    background: rgba(0,0,0,0.6);
    border-radius: 5px;
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    color: #fff;
    text-align: center;
    z-index:9999;
  }
</style>
