//封装本地存储操作模块快

//存储
export const setItem =(key,value)=>{
  if(typeof value==='object'){
    value=JSON.stringify(value)
  }
  localStorage.setItem(key,value)
}
//获取
export const getItem =(key)=>{
  const data= localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
//删除
export const removeItem = name => {
  window.localStorage.removeItem(name)
}