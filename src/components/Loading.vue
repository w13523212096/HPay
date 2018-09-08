<template>
  <div class="loading" v-show="showLoading">
    <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
  </div>
</template>

<script>
    export default {
      name:'loading',
      computed:{
        showLoading(){
          return this.$store.state.loadingShow;
        }
      }
    }
</script>

<style scoped>
  .loading{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.5);
    z-index:9999;
  }
  .loading i.fa{
    position: absolute;
    top:45%;
    left:45%;
  }
</style>
