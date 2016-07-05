/**
 * Created by rrbao on 2016/6/7.
 */

var jsBridgeNativeHandle = {
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


    /** 以下是native调用h5的内部方法，最好是有返回值，该返回值时返回给native的， start */

    /**
     * @param data  native传给h5的值
     * @returns {string}    返回给native的值
     */
    bri_showAlert_confirmMethod: function (data) {    //调用native的bri_showAlert()方法，点击确定后，会走到该方法
        //your code...
        return '';
    },
    bri_onLoaded_operateMethod: function (data) {    //调用native的bri_onLoaded()方法且参数operateMethod不为空，即定义了右上角操作，会调用该方法；
        //your code...
        return '';
    },

    /** 以上是native调用h5的内部方法，最好是有返回值，该返回值是返回给native的， end */


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
            if (modalNameOrKey === _key) { //防止同时发起多次请求，造成key不对应的情况

                //your code...

            }
        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status));
        }
    },
    bri_onLoaded_handle_result: function (responseData) {
        var self = this;
        if (responseData.status === 0) {
            jsBridgeNative.isPageInsetApp = true; //是在app内调取页面

            //your code...

        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status));
        }
    },
    bri_onFullscreenLoaded_handle_result: function (responseData) {
        var self = this;
        if (responseData.status === 0) {
            jsBridgeNative.isPageInsetApp = true; //是在app内调取页面

            //your code...

        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status));
        }
    },
    bri_callMethod_handle_result: function (responseData, mark) {
        var self = this;
        self.onlyStatusReturn(responseData);
    },
    bri_openModal_handle_result: function (responseData, mark, modalNameOrKey) {
        var self = this;
        if (responseData.status === 0) {
            if (modalNameOrKey === 'native_city_choose') {

                //your code...

            }
        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status));
        }
    },
    bri_fetchFile_handle_result: function (responseData, mark) {
        var self = this;
        if (responseData.status === 0) {
            if (responseData.image) {

                //your code...

                //responseData.image是native返回的一个base64的字符串,在h5展现时，应该在responseData.image前添加‘data:image/jpg;base64,’
                //var imgUrl = 'data:image/jpg;base64,' + responseData.image;

            }
        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status));
        }
        document.getElementById("nativeLoading").style.display = 'none';
    },
    bri_showActionSheet_handle_result: function (responseData, mark) {
        var self = this;
        if (responseData.status === 0) {

            //your code...

            // 当type=0时，用户选择了“取消”;
            //当type=1时，jsBridgeNative.bri_showActionSheet_items[responseData.index]获取到item名称;
            //jsBridgeNative.bri_showActionSheet_items是一个数组，存放页面传递进来的item列表；

        } else {
            jsBridgeNative.bri_showAlert(1, self.handleErrorStatus(responseData.status));
        }

    },
    bri_redirect_handle_result: function (responseData, mark) {
        var self = this;
        self.onlyStatusReturn(responseData, mark);
    },

    /** 以上是当h5调用native方法后，native会返回值，h5拿到值后，在这里做处理，end */




    /** 以上是定义native和h5交互的回调方法和h5处理返回值的方法  end*/
    /** =============================================================================  end*/

}