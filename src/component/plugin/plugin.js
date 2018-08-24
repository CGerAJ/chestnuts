(function (root, factory) {
   if( typeof define === "function" && define.amd ){
     define([],factory);
   }else if(typeof module === "object" && module.exports ){
    module.exports = factory();
   }else{
     root.returnExports = factory();
   }
}(typeof self !== "undefined" ? self : this,function(){
/* start */
  function extend(o,n,override){
    for(let p in n){
      if(n.hasOwnProperty(p)&&(!o.hasOwnProperty(p) || override )){
        o[p] = n[p]
      }
    }
  }

  var EventUtil = {
    // 添加事件
    addEvent(element,type,handler){
      if(element.addEventListener){
        element.addEventListener(type,handler,false)
      }else if(element.attachEvent){
        element.attachEvent("on"+type,handler)
      }else{
        element["on"+type] = handler
      }
    },
     // 移除事件
    removeEvent(element,type,handler){
       if(element.addEventListener){
        element.removeEventListener(type,handler,false)
      }else if(element.attachEvent){
        element.detachEvent("on"+type,handler)
      }else{
        element["on"+type] = handler
      }
    },
    // 返回事件对象引用
    getEvent(event){
      return event ? event:window.event; 
    },
    // 获取mouseover和mouseout相关元素
    getRelatedTarget(){
     if(event.relatedTarget){
        return event.relatedTarget;
     }else if(event.toElement){
      //  兼容ie8-
      return event.toElement;
     }else if(event.formElement){
       return event,formElement;
     }else{
       return null;
     }
    },
     //返回事件源目标
    getTarget(event){
      return event.target || event.srcElement;
    },
    // 取消默认事件
    preventDefault(event){
      if(event.preventDefault){
        event.preventDefault();
      }else[
        event.returnValue = false;
      ]
    },
    //阻止事件流
    stoppropagation(event){
      if(event.stoppropagation){
        event.stoppropagation();
      }else{
        event.canceBubble = false;
      }
    },
    // 获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个
    getButton(){
      if(document.implementation.hasFeature("MouseEvents","2.0")){
        return event.button;
      }else{
        //将IE模型下的button属性映射为DOM模型下的button属性
        switch (event.button) {
          case 0:
          case 1:
          case 3:
          case 5:
          case 7:
            //按下的是鼠标主按钮（一般是左键）
            return 0;
          case 2:
          case 6:
            //按下的是中间的鼠标按钮
            return 2;
          case 4:
            //鼠标次按钮（一般是右键）
            return 1;
        }
      }
    },
    //获取表示鼠标滚轮滚动方向的数值
    getWheelDelta(event){
    if(event.wheelDelta){
        return event.wheelDelta;
    }else{
      return -event.detail*40;
    }
    },
    // 以跨浏览器取得相同的字符编码，需在keypress事件中使用
    getCharCode(event){
      if(typeof event.charCode == "number"){
        return event.charCode;
      }else{
        return  event.keyCode;
      }
      // if typeof(event.charCode == "number") ? event.charCode : event.keyCode;
    }
  };

// plugin construct function
function plugin(selector,userOptions){
  // Plugin() or new Plugin()
  if(!(this instanceof Plugin)) return new Plugin(selector,userOptions);
  this.init(selector,userOptions);
}

Plugin.prototype = {
  construtor: Plugin,
  // 默认参数
  options:{},
  init(selector,userOptions){
    extend(this.options.userOptions,true)
  }
}

return plugin;

/* end */
}));