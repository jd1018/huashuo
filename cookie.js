/*
      name=value;[expires=date];[path=path];[domain=somewhere.com];[secure]，
    */
//通过ES6的语法对外暴露
// export default $_cookie
export {
  $_cookie,
  setCookie,
  getCookie,
  removeCookie
}

//可以直接通过一个函数调用三个功能。

function $_cookie(name){
  let argus = [...arguments];
  switch(argus.length){
    case 1:
      return getCookie(name);
    case 3:
      setCookie(...argus);
      break;
    default:
      if(argus[1] === null){
        removeCookie(name);
      }else{
        setCookie(...argus, {});
      }
      break;
  }
}

function setCookie(name, value, { expires, path, domain, secure }) {
  var cookieStr = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  if (expires) {
    cookieStr += ";expires=" + afterOfDate(expires);
  }
  if (path) {
    cookieStr += ";path=" + path;
  }
  if (domain) {
    cookieStr += ";domain=" + domain;
  }
  if (secure) {
    cookieStr += ";secure";
  }
  //设置
  document.cookie = cookieStr;
}

//生成n天后的事件
function afterOfDate(n) {
  var d = new Date();
  var day = d.getDate();
  d.setDate(day + n);
  return d;
}

function getCookie(name) {
  //通过字符串处理，将我们需要的name对应value值获取到
  let cookieStr = decodeURIComponent(document.cookie);
  let arr = cookieStr.split("; ");
  for (let i = 0, len = arr.length; i < len; i++) {
    var newArr = arr[i].split("=");
    if (newArr[0] === name) {
      return newArr[1];
    }
  }
  return null;
}

function removeCookie(name) {
  document.cookie = encodeURIComponent(name) + "=;expires=" + new Date(0);
}
