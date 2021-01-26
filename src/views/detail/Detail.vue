<template>
  <div id="detail">
    <detail-nav-bar @titleCilck="titleCilck" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages" @swiperImageLoad="swiperImageLoad"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info ref="params" :param-info="paramInfo"></detail-params-info>
      <detail-comment-info ref="commentInfo" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommends" :goods="recommends"></goods-list>
    </scroll>
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
  import DetailParamsInfo from "@/views/detail/childComps/DetailParamsInfo";
  import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
  import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

  import Scroll from "@/components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {getDetail,Goods,GoodsParam,getRecommend} from "@/network/detail";
  import {backTopMixin, itemLitenerMixin} from '@/common/mixins'

  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailBottomBar,
      GoodsList,
      DetailCommentInfo,
      DetailParamsInfo,
      DetailGoodsInfo,
      DetailShopInfo,
      Scroll,
      DetailBaseInfo,
      DetailSwiper,
      DetailNavBar
    },
    mixins:[itemLitenerMixin,backTopMixin],
    data (){
      return {
        iid:null,
        topImages:[],
        goodsInfo:{},
        shopInfo:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        currentIndex:null
      }
    },
    created() {
      this.iid = this.$route.params.iid;
      getDetail(this.iid).then(res =>{
        const data = res.result;
        this.topImages = data.itemInfo.topImages
        this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        this.shopInfo = data.shopInfo;
        this.detailInfo = data.detailInfo;
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
        }
      })
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

    },
    methods:{
      ...mapActions(['addCart']),
      swiperImageLoad(){
        this.$refs.scroll.refresh();
      },
      imageLoad(){
        this.refresh();
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
      },
      titleCilck(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
      },
      contentScroll(position){
        const positionY = -position.y;
        let length = this.themeTopYs.length;
        for(let i=0;i<length-1;i++){
          // if(this.currentIndex !== i && (i<length - 1 && positionY>= this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) ||
          //   (i === length -1 && positionY>= this.themeTopYs[i])){
          //   this.currentIndex = i;
          //   console.log(this.currentIndex)
          //   this.$refs.nav.currentIndex = this.currentIndex;
          // }
          if(this.currentIndex !== i && (positionY>=this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
        this.listenShowBackTop(position)
      },
      addToCart(){
        //1.获取购物车展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goodsInfo.title;
        product.desc = this.goodsInfo.desc;
        product.lowNowPrice = this.goodsInfo.lowNowPrice;
        product.iid = this.iid;
        //任何修改store 里state的东西，都通过mutations来修改,不要直接push
        //this.$store.cartList.push(product)
        //this.$store.commit('addCart',product) 这是在mutations里写方法的时候用
        // this.addCart(product).then(res =>{ mapActions用法
        //   console.log(res);
        // });
        this.$store.dispatch('addCart',product).then(res =>{
          console.log(this.$toast);
          this.$toast.show(res,2000)
        });
        //dispatch会返回一个promiss
      }
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
  }
</script>

<style scoped>
  #detail{
    height: 100vh;
    position: relative;
    z-index: 1;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
    background: #fff;
  }
</style>
