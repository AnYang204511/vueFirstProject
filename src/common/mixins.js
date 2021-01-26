import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop";
import {BACK_POSIITON} from "@/common/const";

export const itemLitenerMixin = {
  data() {
    return {
      itemImgListener:null,
      refresh:null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop:false
    }
  },
  mounted() {
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop(position){
      this.isShowBackTop = -position.y>BACK_POSIITON
    }
  }
}
