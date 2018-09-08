<template>
  <div class="notice">
    <div class="head">
      <i class="fa fa-arrow-left" @click="back()" v-if="!currentNews"></i>
      <i class="fa fa-arrow-left" @click="exit()" v-else></i>
      <span class="text">公告</span>
    </div>
    <ul class="list" v-if="!currentNews">
      <li v-for="item in newsList" @click="detail(item)">
          <h4 v-html="item.announcement_title"></h4>
          <div class="text" v-html="item.announcement_content"></div>
          <i class="fa fa-chevron-right"></i>
      </li>
    </ul>
    <div class="detail" v-else>
      <h4 v-html="currentNews.announcement_title"></h4>
      <div class="content" v-html="currentNews.announcement_content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        newsList:null,
        currentNews:null
      }
    },
    created(){
      let that = this;
      that.$axios({
        url:that.$store.state.domain+'/announcement/list',
        method:'get',
        headers:{
          'X-Requested-With':'XMLHttpRequest'
        }
      }).then((res)=>{
//        console.log(res);
        that.newsList = res.data;
      }).catch((err)=>{
        console.log(err);
      })
    },
    methods:{
      back(){
        this.$router.back(-1);
      },
      exit(){
        this.currentNews = null;
      },
      detail(item){
        this.currentNews = item;
      }
    }
  }
</script>

<style scoped>
  .notice{
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
  .list {
    position: absolute;
    top: 1.16rem;
    left:0;
    width:100%;
    bottom:0;
    overflow:auto;/* winphone8和android4+ */
    -webkit-overflow-scrolling: touch; /* ios5+ */
  }
  .list li{
    background:#fff;
    margin-bottom: 0.2rem;
    position: relative;
    text-align: left;
    padding: 0.3rem 1rem 0.3rem 0.5rem;
    line-height: 0.5rem;
  }
  .list h4{
    border-bottom: 1px solid #F5F5F5;
    font-size: 0.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .list .text{
    font-size: 0.28rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height:0.5rem;
  }
  .list i.fa{
    position: absolute;
    top:0.7rem;
    right:0.4rem;
    color: #999;
  }
  .detail{
    background: #ffffff;
    position: absolute;
    top: 1.16rem;
    left:0;
    width:100%;
    bottom:0;
    overflow:auto;/* winphone8和android4+ */
    -webkit-overflow-scrolling: touch; /* ios5+ */
  }
  .detail h4{
    font-size: 0.5rem;
    line-height: 0.8rem;
    border-bottom:1px solid #ddd;
  }
  .detail .content{
    text-align: left;
    padding: 0.3rem;
    font-size: 0.28rem;
    line-height: 0.5rem;
  }
</style>
