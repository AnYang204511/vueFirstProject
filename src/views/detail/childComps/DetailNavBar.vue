<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg"  alt/>
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             @click="itemClik(index)" :class="{active:index===currentIndex}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    itemClik(index){
      this.currentIndex = index;
      this.$emit('titleCilck',index)
    },
    backClick(){
      //this.$router.go(-1)
      this.$router.back();
    }
  }
}
</script>

<style scoped>
  .detail-nav-bar{
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    background: #fff;
  }
  .title{
    display: flex;
    font-size: 13px;
  }
  .title-item{
    flex: 1;
    text-align: center;
  }
  .active{
    color: var(--color-tint);
  }
  .back img{
    margin-top: 10px;
  }
</style>
