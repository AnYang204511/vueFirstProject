<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommond-view :recommends="recommends"></recommond-view>
    <FeatureView/>
    <tab-control :titles="['流行','新款','精选']"></tab-control>
    <ul>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommondView from "@/views/home/childComps/RecommondView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";

import {getHomeMultidata} from "@/network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommondView,
    FeatureView,
    NavBar,
    TabControl
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    //1.请求多个数据
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  background: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}
</style>
