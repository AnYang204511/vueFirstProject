<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button  class="check-button" @click.native="checkClick" :is-checked="isSelectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="cacluate" @click="calcClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from "@/components/content/checkButton/CheckButton";

  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {CheckButton},
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '¥'+this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) =>{
          return preValue + item.lowNowPrice * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        //if(this.cartList.length === 0)return false
        //return !(this.cartList.filter(item => !item.checked).length)

        // if(this.cartList.length === 0) return false
        // for(let item of this.cartList){
        //   if(!item.checked){
        //     return  false
        //   }
        // }
        // return true
        if(this.cartList.length === 0)return false
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    width: 100%;
    height: 40px;
    background: #eee;
    position: absolute;
    bottom: 49px;
    display: flex;
    align-items: center;
  }
  .check-content{
    width: 100px;
    padding: 0 10px;
    height: 40px;
    display: flex;
    align-items: center;
  }
  .check-button{
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }
  .price{
    width: 120px;
    margin-left: 30px;
  }
  .cacluate{
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-weight: bold;
    flex: 1;
    align-items: center;
    text-align: center;
    margin:0 0 0 20px;
    background: orangered;
  }
</style>
