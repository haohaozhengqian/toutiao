//频道请求模块
import request from "@/utils/requset";

export const getAllChannels=()=>{
  return request({
    url:'/app/v1_0/channels'
  })
}