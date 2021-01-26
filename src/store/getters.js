export default {
  //如何把store里的getters 在计算属性里继承 用vuex 里的 mapGetters
  cartLength(state){
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  }
}
