var jsBridgeNative={isAndroid:false,isIos:false,bri_showActionSheet_items:[],isPageInsetApp:false,init:function(){var a=this;a.phoneSystem();a.initSetupWebViewJavascriptBridge()},bri_showAlert:function(e,d,g,i,f,c,b){var h=this,a={type:e,content:d,title:g,confirmName:i,isUpdate:f,confirmMethod:c};h.setupWebViewJavascriptBridge(function(j){h.initCreateJsCallNative(j,"bri_showAlert",a,b)})},bri_getConfig:function(e,d,a,f){var b=this,c={key:e,isCustom:d,isUpdate:a};b.setupWebViewJavascriptBridge(function(g){b.initCreateJsCallNative(g,"bri_getConfig",c,f,e)})},bri_onLoaded:function(h,f,b,l,g,a,d,i,k,c){var j=this,e={title:h||"mdj://close",backUrl:f,backTitle:b,operateTitle:l,operateImage:g,operateMethod:a,showClose:d,bounces:i,selectable:k,showsVerticalScrollIndicator:c};j.setupWebViewJavascriptBridge(function(m){j.initCreateJsCallNative(m,"bri_onLoaded",e)})},bri_onFullscreenLoaded:function(c,b,f,a){var d=this,e={showClose:c,bounces:b,selectable:f,showsVerticalScrollIndicator:a};d.setupWebViewJavascriptBridge(function(g){d.initCreateJsCallNative(g,"bri_onFullscreenLoaded",e)})},bri_callMethod:function(d,e,a,f){var b=this,c={methodName:d,params:e,isUpdate:a};b.setupWebViewJavascriptBridge(function(g){b.initCreateJsCallNative(g,"bri_callMethod",c,f)})},bri_openModal:function(c,e,a,f){var b=this,d={modalName:c,params:e,isUpdate:a};b.setupWebViewJavascriptBridge(function(g){b.initCreateJsCallNative(g,"bri_openModal",d,f,c)})},bri_fetchFile:function(i,f,a,g,e,d,c){var h=this,b={sourceType:i,type:f,isFront:a,isUpdate:g,ratio:e,makeBeauty:d};h.setupWebViewJavascriptBridge(function(j){document.getElementById("nativeLoading").style.display="block";h.initCreateJsCallNative(j,"bri_fetchFile",b,c)})},bri_showActionSheet:function(e,c,a,f){var b=this,d={title:e,items:c,cancel:a};b.bri_showActionSheet_items=c;b.setupWebViewJavascriptBridge(function(g){b.initCreateJsCallNative(g,"bri_showActionSheet",d,f)})},bri_redirect:function(e,b,a,f){var c=this,d={type:e,extra:b,isUpdate:a};c.setupWebViewJavascriptBridge(function(g){c.initCreateJsCallNative(g,"bri_redirect",d,f)})},registerAllJsFun:function(a){a.registerHandler("bri_showAlert_confirmMethod",function(d,c){var b=jsBridgeNativeHandle.bri_showAlert_confirmMethod(d);c(b)});a.registerHandler("bri_onLoaded_operateMethod",function(d,c){var b=jsBridgeNativeHandle.bri_onLoaded_operateMethod(d);c(b)})},initCreateJsCallNative:function(c,b,e,f,d){var a=this;if(a.isAndroid){window.WebViewJavascriptBridge.callHandler(b,e,function(g){a.judgeFunCallBack(b,g,f,d)})}else{if(a.isIos){c.callHandler(b,e,function(g){a.judgeFunCallBack(b,g,f,d)})}}},judgeFunCallBack:function(briName,responseData,mark,modalNameOrKey){if(responseData.constructor!==Object){responseData=eval("("+responseData+")")}switch(briName){case"bri_showAlert":jsBridgeNativeHandle.bri_showAlert_handle_result(responseData,mark);break;case"bri_getConfig":jsBridgeNativeHandle.bri_getConfig_handle_result(responseData,mark,modalNameOrKey);break;case"bri_onLoaded":jsBridgeNativeHandle.bri_onLoaded_handle_result(responseData);break;case"bri_onFullscreenLoaded":jsBridgeNativeHandle.bri_onFullscreenLoaded_handle_result(responseData);break;case"bri_callMethod":jsBridgeNativeHandle.bri_callMethod_handle_result(responseData,mark);break;case"bri_openModal":jsBridgeNativeHandle.bri_openModal_handle_result(responseData,mark,modalNameOrKey);break;case"bri_fetchFile":jsBridgeNativeHandle.bri_fetchFile_handle_result(responseData,mark);break;case"bri_showActionSheet":jsBridgeNativeHandle.bri_showActionSheet_handle_result(responseData,mark);break;case"bri_redirect":jsBridgeNativeHandle.bri_redirect_handle_result(responseData,mark);break}},initRegisterAllJsFun:function(b){var a=this;if(a.isAndroid){b.init(function(d,c){var e={"Javascript Responds":"bridgeInit"};c(e)})}a.registerAllJsFun(b)},initSetupWebViewJavascriptBridge:function(){var a=this;a.setupWebViewJavascriptBridge(function(b){a.initRegisterAllJsFun(b)})},setupWebViewJavascriptBridge:function(b){var a=this;if(a.isAndroid){if(window.WebViewJavascriptBridge){b(WebViewJavascriptBridge)}else{document.addEventListener("WebViewJavascriptBridgeReady",function(){b(WebViewJavascriptBridge)},false)}}else{if(a.isIos){if(window.WebViewJavascriptBridge){return b(WebViewJavascriptBridge)}if(window.WVJBCallbacks){return window.WVJBCallbacks.push(b)}window.WVJBCallbacks=[b];var c=document.createElement("iframe");c.style.display="none";c.src="wvjbscheme://__BRIDGE_LOADED__";document.documentElement.appendChild(c);setTimeout(function(){document.documentElement.removeChild(c)},0)}}},phoneSystem:function(){var a=this;var b=navigator.userAgent,c=navigator.appVersion;a.isAndroid=b.indexOf("Android")>-1||b.indexOf("Linux")>-1;a.isIos=!!b.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)}};window.jsBridgeNative=jsBridgeNative;jsBridgeNative.init();