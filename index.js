(function(){
  var clickCallbacks = [];
  var clickCallbackId = 0;
  var scope = '__clickoutside__';

  document.addEventListener('click', function(e) {
    clickCallbacks.forEach(function(obj){
      obj.cb(e.target);
    });
  });

  var vueClickoutside = {
    install: function(Vue, options){
      Vue.directive('clickoutside', {
        bind: function(el, binding, vnode){
          var handler = function(target){
            var isIn = el.contains(target);
            if(!isIn) {
              binding.value && binding.value();
            }
          }
          var id = ++clickCallbackId;
          el[scope] = id //存入id到指令元素上，解绑需要用到
          clickCallbacks.push({
            id: id,
            cb: handler
          });
        },
        inserted: function(){},
        update: function(el, binding, vnode){},
        unbind: function(el, binding, vnode){
          var len = clickCallbacks.length;
          for(var i=0; i<len; i++) {
            if(clickCallbacks[i].id == el[scope]){
              clickCallbacks.splice(i, 1);
            }
          }
        }
      });
    }
  }
  if (typeof exports == "object") {
    module.exports = vueClickoutside
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return vueClickoutside })
  } else if (window.Vue) {
    window.vueClickoutside = vueClickoutside;
  }
})();