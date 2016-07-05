/**
 * Created by rrbao on 2016/6/7.
 */

var jsBridgeNativeHandle = {
    judgeKeyForGetConfig: function (key, value) {
        var result = value;
        if (key === 'isLogin') {
            if (value) {
                result = '您已经登录';
            } else {
                result = '未登录';
            }
        } else if (key === 'gender') {
            if (value === 1) {
                result = '男';
            } else {
                result = '女';
            }
        }
        return result;
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
        var self = this;
        if (responseData.status === 0) {
        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status));
        }
    },


    /** =============================================================================  start*/
    /** 以下定义native和h5交互的回调方法和h5处理返回值的方法  start*/



    /** 以下是native调用h5的内部方法，最好是有返回值，该返回值时返回给native的， start */
    /**
     * @param data  native传给h5的值
     * @returns {string}    返回给native的值
     */
    bri_showAlert_confirmMethod: function (data) {    //调用native的bri_showAlert()方法，点击确定后，会走到该方法
        jsBridgeNative.bri_showAlert(1, "confirm框点击确定后方法被调用了...jsBridgeNativeHandle");
        return '';
    },
    bri_onLoaded_operateMethod: function (data) {    //调用native的bri_onLoaded()方法且参数operateMethod不为空，即定义了右上角操作，会调用该方法；

        window.location.href = "https://t.meidaojia.com/makeup/jsCallNative.html";
        //jsBridgeNative.bri_showAlert(1, "顶部右上角操作方法调用了....jsBridgeNativeHandle");
        return '';
    },

    /** 以上是native调用h5的内部方法，最好是有返回值，该返回值时返回给native的， end */


    /** ===========================*/


    /** 以下是当h5调用native方法后，native会给h5返回一个值，h5拿到值后，在这里做处理，start */
    /**
     * 方法名格式：h5调用native的方法名 +下划线 + handle_result   如：bri_showAlert_handle_result
     * @param responseData  h5调用native方法后，native返回值
     */

    bri_showAlert_handle_result: function (responseData, mark) {
        var self = this;
        self.onlyStatusReturn(responseData);
    },
    bri_getConfig_handle_result: function (responseData, mark, modalNameOrKey) {
        var self = this;
        if (responseData.status === 0) {
            var _key = responseData.key,
                _value = responseData.value;
            if (modalNameOrKey === _key) { //防止请求频繁，造成key不对应的情况
                var _value = self.judgeKeyForGetConfig(_key, _value);
                jsBridgeNative.bri_showAlert(3, _value, _key, '', 'I know', false);
            }
        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status));
        }
    },
    bri_onLoaded_handle_result: function (responseData) {
        var self = this;
        if (responseData.status === 0) {
            jsBridgeNative.isPageInsetApp = true; //是在app内调取页面
        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status));
        }
        console.log("是否在App内打开: " + jsBridgeNative.isPageInsetApp);
    },
    bri_onFullscreenLoaded_handle_result: function (responseData) {
        var self = this;
        if (responseData.status === 0) {
            jsBridgeNative.isPageInsetApp = true; //是在app内调取页面
        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status));
        }
        console.log("是否在App内打开: " + jsBridgeNative.isPageInsetApp);
    },
    bri_callMethod_handle_result: function (responseData, mark) {
        var self = this;
        self.onlyStatusReturn(responseData);
    },
    bri_openModal_handle_result: function (responseData, mark, modalNameOrKey) {
        var self = this;
        if (responseData.status === 0) {
            if (modalNameOrKey === 'native_city_choose') {
                jsBridgeNative.bri_showAlert(1, '城市选择回调函数');
            }
        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status));
        }
    },
    bri_fetchFile_handle_result: function (responseData, mark) {
        var self = this;
        if (responseData.status === 0) {
            if (responseData.image) {
                var imgUrl = 'data:image/jpg;base64,' + responseData.image;

                document.getElementById("bridgeCapture_show").style.display = 'block';
                document.getElementById("bridgeCapture_show").setAttribute('src', imgUrl);
            }
        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status));
        }
        document.getElementById("nativeLoading").style.display = 'none';
    },
    bri_showActionSheet_handle_result: function (responseData, mark) {
        var self = this;
        if (responseData.status === 0) {

            if (mark === 'markBook') {

                var _choice = '';
                if (responseData.type === 0) {
                    _choice = '取消';
                } else if (responseData.type === 1) {
                    _choice = jsBridgeNative.bri_showActionSheet_items[responseData.index];
                }
                document.getElementById("bridgeOpenMenu_show").innerText = '您选择了..' + _choice;

            } else if (mark === 'markAddress') {

                var _choice = '';
                if (responseData.type === 0) {
                    _choice = '取消';
                } else if (responseData.type === 1) {
                    _choice = jsBridgeNative.bri_showActionSheet_items[responseData.index];
                }
                document.getElementById("bridgeOpenMenu_show2").innerText = '您选择了..' + _choice;

            }

        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status));
        }

    },
    bri_redirect_handle_result: function (responseData, mark) {
        var self = this;
        self.onlyStatusReturn(responseData);
    },

    /** 以上是当h5调用native方法后，native会返回值，h5拿到值后，在这里做处理，end */




    /** 以上是定义native和h5交互的回调方法和h5处理返回值的方法  end*/
    /** =============================================================================  end*/

}