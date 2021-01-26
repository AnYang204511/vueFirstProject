import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'
export default {
  addCart(constext,payload){
    return new Promise((resolve , reject) =>{
      //数组常用函数 push/pop/unshift/shift/sort/reverse/map/filter/reduce/join
      // let oldProduct = null;
      // for(let item of state.cartList){
      //   if(item.iid === payload.iid){
      //     oldProduct = item;
      //   }
      // }
      // if(oldProduct){
      //   oldProduct.count += 1;
      // }else {
      //   payload.count = 1;
      //   state.cartList.push(payload)
      // }
      // let index = state.cartList.indexOf(payload);
      // if(index === -1){
      //   let oldProduct = state.cartList[index];
      //   oldProduct.count += 1;
      // }else{
      //   payload.count = 1;
      //   state.cartList.push(payload)
      // }
      let oldProduct = constext.state.cartList.find( item => item.iid === payload.iid)
      if(oldProduct){
        constext.commit(ADD_COUNTER,oldProduct)
        resolve('当前的商品数量+1')
      }else {
        payload.count = 1;
        constext.commit(ADD_TO_CART,payload);
        resolve('当添加了新的商品')
      }
    })
  }
}
