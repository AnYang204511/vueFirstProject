<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import CartList from "@/views/cart/childComps/CartList";
  import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {CartBottomBar, CartList, NavBar},
    data(){
      return {
        num:0
      }
    },
    computed:{
      //两种写法
      ...mapGetters([
          'cartLength',
          'cartList'
        ])
      // ...mapGetters({
      //   length:'cartLength',
      //   list:'cartList'
      // })
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
    overflow: hidden;
  }
  .cart-nav{
    background: var(--color-tint);
    color: #fff;
  }
</style>
