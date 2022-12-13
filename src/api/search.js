//频道请求模块
import request from "@/utils/requset";

export const getSearchSuggestions=q=>{
  return request({
    url:'/app/v1_0/suggestion',
    params:{
      q
    }
  })
}

export const getSearchResult=obj=>{
  return request({
    url:'/app/v1_0/search',
    params:obj
  })
}