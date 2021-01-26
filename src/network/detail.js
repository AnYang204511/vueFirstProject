import {request} from "@/network/request";
export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
export function getRecommend(){
  return request({
    url:'/recommend'
  })
}
export class Goods{
  constructor(itemInfo,columns,service) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.price = itemInfo.price;
    this.lowNowPrice = itemInfo.lowNowPrice;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.service = service;
  }
}
export class GoodsParam {
  constructor(info,rule) {
    this.image = info.image ? info.images[0] : ''
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
