/**
 * Created by rrbao on 2016/6/3.
 */
var jsBridgeNative = {
    isAndroid: false,   //Android系统
    isIos: false,   //IOS系统
    bri_showActionSheet_items: [],
    isPageInsetApp: false,  //判断页面是在app内打开（true），还是在浏览器打开（false）
    init: function () {
        var self = this;
        self.phoneSystem();
        self.initSetupWebViewJavascriptBridge();
    },
    handleResponseDataType: function(responseData){
        if (responseData.constructor !== Object) {
            responseData = eval("(" + responseData + ")");
        }
        return responseData;
    },
    handleErrorStatus: function (status) {
        var result = '';
        if (status === -1) {
            result = '操作失败';
        } else if (status === 2001) {
            result = '传递参数错误';
        } else if (status === 2002) {
            result = '不支持的类型';
        } else if (status === 2003) {
            result = '不存在的方法';
        }
        return result;
    },
    onlyStatusReturn: function (responseData) {
        if (responseData.status === 0) {
        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status), '', '', false, '');
        }
    },

    //1. Alert 方法
    bri_showAlert: function (type, content, title, confirmName, isUpdate, confirmMethod,responseCallback, mark) {
        var self = this,
            _param = {
                "type": type,
                "content": content,
                "title": title,
                "confirmName": confirmName,
                "isUpdate": isUpdate,
                "confirmMethod": confirmMethod
            };
        self.setupWebViewJavascriptBridge(function (bridge) {
            self.initCreateJsCallNative(bridge, 'bri_showAlert', _param, responseCallback, mark);
        })
    },

    //2. getConfig方法
    bri_getConfig: function (key, isCustom, isUpdate, responseCallback, mark) {
        var self = this,
            _param = {
                "key": key,
                "isCustom": isCustom,
                "isUpdate": isUpdate
            };
        self.setupWebViewJavascriptBridge(function (bridge) {
            self.initCreateJsCallNative(bridge, 'bri_getConfig', _param, responseCallback, mark, key);
        })
    },

    //3. onLoaded 方法
    bri_onLoaded: function (title, backUrl, backTitle, operateTitle, operateImage, operateMethod, showClose, bounces, selectable, showsVerticalScrollIndicator, responseCallback) {
        var self = this,
            _param = {
                "title": title || 'mdj://close',
                "backUrl": backUrl,
                "backTitle": backTitle,
                "operateTitle": operateTitle,
                "operateImage": operateImage,
                "operateMethod": operateMethod,
                "showClose": showClose,
                "bounces": bounces,
                "selectable": selectable,
                "showsVerticalScrollIndicator": showsVerticalScrollIndicator
            };
        self.setupWebViewJavascriptBridge(function (bridge) {
            self.initCreateJsCallNative(bridge, 'bri_onLoaded', _param, responseCallback);
        })
    },

    //4. onFullscreenLoaded 方法
    bri_onFullscreenLoaded: function (showClose, bounces, selectable, showsVerticalScrollIndicator, responseCallback) {
        var self = this,
            _param = {
                "showClose": showClose,
                "bounces": bounces,
                "selectable": selectable,
                "showsVerticalScrollIndicator": showsVerticalScrollIndicator
            };
        self.setupWebViewJavascriptBridge(function (bridge) {
            self.initCreateJsCallNative(bridge, 'bri_onFullscreenLoaded', _param, responseCallback);
        })
    },

    //5. callMethod 方法
    bri_callMethod: function (methodName, params, isUpdate, responseCallback, mark) {
        var self = this,
            _param = {
                "methodName": methodName,
                "params": params,
                "isUpdate": isUpdate
            };
        self.setupWebViewJavascriptBridge(function (bridge) {
            self.initCreateJsCallNative(bridge, 'bri_callMethod', _param, responseCallback, mark);
        })
    },

    //6. openModal 方法
    bri_openModal: function (modalName, params, isUpdate, responseCallback, mark) {
        var self = this,
            _param = {
                "modalName": modalName,
                "params": params,
                "isUpdate": isUpdate
            };
        self.setupWebViewJavascriptBridge(function (bridge) {
            self.initCreateJsCallNative(bridge, 'bri_openModal', _param, responseCallback, mark, modalName);
        })
    },

    //7. fetchFile 方法
    bri_fetchFile: function (sourceType, type, isFront, isUpdate, ratio, makeBeauty, responseCallback, mark) {
        var self = this,
            _param = {
                "sourceType": sourceType,
                "type": type,
                "isFront": isFront,
                "isUpdate": isUpdate,
                "ratio": ratio,
                "makeBeauty": makeBeauty
            };
        self.setupWebViewJavascriptBridge(function (bridge) {
            document.getElementById("nativeLoading").style.display = 'block';
            self.initCreateJsCallNative(bridge, 'bri_fetchFile', _param, responseCallback, mark);
        })
    },

    //8. showActionSheet 方法
    bri_showActionSheet: function (title, items, cancel, responseCallback, mark) {
        var self = this,
            _param = {
                "title": title,
                "items": items,
                "cancel": cancel
            };
        self.bri_showActionSheet_items = items;
        self.setupWebViewJavascriptBridge(function (bridge) {
            self.initCreateJsCallNative(bridge, 'bri_showActionSheet', _param, responseCallback, mark);
        })
    },

    //9. redirect 方法
    bri_redirect: function (type, extra, isUpdate, responseCallback, mark) {
        var self = this,
            _param = {
                "type": type,
                "extra": extra,
                "isUpdate": isUpdate
            };
        self.setupWebViewJavascriptBridge(function (bridge) {
            self.initCreateJsCallNative(bridge, 'bri_redirect', _param, responseCallback, mark);
        })
    },

    /**
     * 注册所有js方法,供native调用
     * @param bridge
     */
    registerAllJsFun: function (bridge) {
        bridge.registerHandler("bri_showAlert_confirmMethod", function (data, responseCallback) {

            var responseData = jsBridgeNativeHandle.bri_showAlert_confirmMethod(data);
            responseCallback(responseData);

        });
        bridge.registerHandler("bri_onLoaded_operateMethod", function (data, responseCallback) {

            var responseData = jsBridgeNativeHandle.bri_onLoaded_operateMethod(data);
            responseCallback(responseData);

        });
    },

    /**
     * 在此方法内，注册调用native方法的入口
     * @param bridge
     * @param event
     * @param jsCallNativeFunName   将要调用的native方法名
     * @param param     js传给native方法的参数
     */
    initCreateJsCallNative: function (bridge, jsCallNativeFunName, param, responseDataCallback, mark, modalNameOrKey) {
        var self = this;

        if (self.isAndroid) {
            window.WebViewJavascriptBridge.callHandler(
                jsCallNativeFunName
                , param
                , function (responseData) {

                    var _responseData = self.handleResponseDataType(responseData);
                    if(responseDataCallback){
                        responseDataCallback(_responseData, mark, modalNameOrKey);
                    }else{
                        jsBridgeNative.onlyStatusReturn(_responseData);
                    }

                //    self.judgeFunCallBack(jsCallNativeFunName, responseData, mark, modalNameOrKey);
                }
            );
        } else if (self.isIos) {
            bridge.callHandler(jsCallNativeFunName
                , param
                , function (responseData) {
                    self.judgeFunCallBack(jsCallNativeFunName, responseData, mark, modalNameOrKey);
                });
        }

    },

    /**
     * 若调用native方法后，有返回值
     * 判断回调函数
     * @param briName   native方法名
     * @param responseData  native返回给js的值
     */
    judgeFunCallBack: function (briName, responseData, mark, modalNameOrKey) {
        if (responseData.constructor !== Object) {
            responseData = eval("(" + responseData + ")");
        }
        switch (briName) {
            case "bri_showAlert":
                jsBridgeNativeHandle.bri_showAlert_handle_result(responseData, mark);
                break;
            case "bri_getConfig":
                jsBridgeNativeHandle.bri_getConfig_handle_result(responseData, mark, modalNameOrKey);
                break;
            case "bri_onLoaded":
                jsBridgeNativeHandle.bri_onLoaded_handle_result(responseData);
                break;
            case "bri_onFullscreenLoaded":
                jsBridgeNativeHandle.bri_onFullscreenLoaded_handle_result(responseData);
                break;
            case "bri_callMethod":
                jsBridgeNativeHandle.bri_callMethod_handle_result(responseData, mark);
                break;
            case "bri_openModal":
                jsBridgeNativeHandle.bri_openModal_handle_result(responseData, mark, modalNameOrKey);
                break;
            case "bri_fetchFile":
                jsBridgeNativeHandle.bri_fetchFile_handle_result(responseData, mark);
                break;
            case "bri_showActionSheet":
                jsBridgeNativeHandle.bri_showActionSheet_handle_result(responseData, mark);
                break;
            case "bri_redirect":
                jsBridgeNativeHandle.bri_redirect_handle_result(responseData, mark);
                break;
        }
    },


    /**
     * native调用js方法的入口
     * @param bridge
     */
    initRegisterAllJsFun: function (bridge) {
        var self = this;
        if (self.isAndroid) {
            bridge.init(function (message, responseCallback) {
                var data = {
                    'Javascript Responds': 'bridgeInit'
                };
                responseCallback(data);
            });
        }
        self.registerAllJsFun(bridge);
    },

    /**
     * 页面初始化，WebViewJavascriptBridge入口
     * 注册js调用native、native调用js的方法
     */
    initSetupWebViewJavascriptBridge: function () {
        var self = this;
        self.setupWebViewJavascriptBridge(function (bridge) {
            //注册native调用js方法

            //注册js调用native方法
            self.initRegisterAllJsFun(bridge);
        })
    },
    /**
     * 注册WebViewJavascriptBridge
     * @param callback
     * @returns {*}
     */
    setupWebViewJavascriptBridge: function (callback) {
        var self = this;
        if (self.isAndroid) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady'
                    , function () {
                        callback(WebViewJavascriptBridge)
                    },
                    false
                );
            }
        } else if (self.isIos) {
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
        }
    },

    /**
     * 识别手机系统 Android | IOS
     */
    phoneSystem: function () {
        var self = this;
        var u = navigator.userAgent,
            app = navigator.appVersion; //版本信息
        self.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        self.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    }
}

window["jsBridgeNative"] = jsBridgeNative;
jsBridgeNative.init();