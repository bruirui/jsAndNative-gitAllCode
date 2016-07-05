/**
 * Created by rrbao on 2016/6/7.
 */

//3.bri_onloaded方法
window.onload = function () {
    jsBridgeNative.bri_onLoaded('我是标题', 'mdj://close', '左上角文案', '右上角文案', '', 'bri_onLoaded_operateMethod', false, true, true, true, function (responseData) {

        if (responseData.status === 0) {
            jsBridgeNative.isPageInsetApp = true; //是在app内调取页面
        } else {
            jsBridgeNative.bri_showAlert(1, jsBridgeNative.handleErrorStatus(responseData.status), '', '', false, '');
        }

    });
}


//1、bri_showAlert()方法

var alertA = document.getElementById("alertA"),
    alertB = document.getElementById("alertB"),
    alertC = document.getElementById("alertC");

alertA.addEventListener('click', function () {
    jsBridgeNative.bri_showAlert(1, '我是toastaa', '', '', false, '')
})
alertB.addEventListener('click', function () {
    jsBridgeNative.bri_showAlert(2, 'content', 'title', '', true, 'bri_showAlert_confirmMethod')
})
alertC.addEventListener('click', function () {
    jsBridgeNative.bri_showAlert(3, 'alert_content', 'alert', '好的', false, '')
})


//2、bri_getConfig()方法

var configA = document.getElementById("configA"),
    configB = document.getElementById("configB"),
    configC = document.getElementById("configC"),
    configD = document.getElementById("configD");

configA.addEventListener('click', function () {
    jsBridgeNative.bri_getConfig('isLogin', true, true, function (responseData, mark, modalNameOrKey) {
        if (responseData.value) {
            jsBridgeNative.bri_showAlert(1, '您已经登录', '', '', false, '');
        } else {
            jsBridgeNative.bri_showAlert(1, '未登录', '', '', false, '');
        }
    });
})
configB.addEventListener('click', function () {
    jsBridgeNative.bri_getConfig('gender', true, true, function (responseData, mark, modalNameOrKey) {
        if (responseData.value === 1) {
            jsBridgeNative.bri_showAlert(3, '男', 'gender', '我知道了', false, '');
        } else {
            jsBridgeNative.bri_showAlert(3, '女', 'gender', '我知道了', false, '');
        }
    })
})
configC.addEventListener('click', function () {
    jsBridgeNative.bri_getConfig('userID', true, true, function (responseData, mark, modalNameOrKey) {
        if (responseData.value) {
            jsBridgeNative.bri_showAlert(3, value, 'userID', 'OK', false, '');
        }
    })
})
configD.addEventListener('click', function () {
    jsBridgeNative.bri_getConfig('VerUpdateIntervalDayCount', false, true, function (responseData, mark, modalNameOrKey) {
        if (responseData.value) {
            jsBridgeNative.bri_showAlert(3, value, 'VerUpdateIntervalDayCount', '好的', false, '');
        }
    })
})


//5、bri_callMethod()方法

var methodA = document.getElementById("methodA"),
    methodB = document.getElementById("methodB"),
    methodC = document.getElementById("methodC"),
    methodD = document.getElementById("methodD"),
    methodE = document.getElementById("methodA"),
    methodF = document.getElementById("methodB"),
    methodG = document.getElementById("methodC"),
    methodH = document.getElementById("methodD");

methodA.addEventListener('click', function () {
    jsBridgeNative.bri_callMethod('update_user_info', {}, true)
})
methodB.addEventListener('click', function () {
    jsBridgeNative.bri_callMethod('report_token', {}, true)
})
methodC.addEventListener('click', function () {
    jsBridgeNative.bri_callMethod('refresh_makeup_list', {}, true)
})
methodD.addEventListener('click', function () {
    jsBridgeNative.bri_callMethod('refresh_message_list', {}, true)
})
methodE.addEventListener('click', function () {
    jsBridgeNative.bri_callMethod('refresh_message_redPoint', {}, true)
})
methodF.addEventListener('click', function () {
    jsBridgeNative.bri_callMethod('mob_click', {
        'clickEvent': 'Event_User_Login_Success',
        'clickAttributes': {'orderId': '12345678', 'money': '$99'}
    }, true)
})
methodG.addEventListener('click', function () {
    jsBridgeNative.bri_callMethod('get_integral', {'count': 10, 'info': '获得**积分'}, true)
})
methodH.addEventListener('click', function () {
    jsBridgeNative.bri_callMethod('view_close', {}, true)
})


//6、bri_openModal()方法

var modal = document.getElementById('modal'),
    bridgeModal = document.getElementById('bridgeModal'),
    shareType = document.getElementsByName('shareType');

modal.addEventListener('click', function () {
    var _index = bridgeModal.selectedIndex,

        modalName = bridgeModal.options[_index].value,
        params = {},
        isUpdate = true;

    if (modalName === 'native_scan_image') {
        params = {
            "urls": _imgUrlList,
            "index": 0
        }
    } else if (modalName === 'native_share') {
        var _shareType = 1,
            _pageUrl = 'http://www.weibo.com';
        for (var i = 0; i < shareType.length; i++) {
            if (shareType[i].checked) {
                if (shareType[i].value === '2') {
                    _shareType = 2;
                    _pageUrl = 'http://www.baidu.com';
                }
            }
        }
        params = {
            "shareType": _shareType,
            "title": "this is title",
            "content": "this is content",
            "pageUrl": _pageUrl,
            "thumImage": "https://mdj.oss-cn-hangzhou.aliyuncs.com//6ebd5892dc5c1cc37520a5698f471f3a.png",
            "mobEvents": {
                "friendEvent": "",
                "friendEventParam": {},
                "timelineEvent": "",
                "timelineEventParam": {}
            }
        }
    } else if (modalName === 'native_pay') {
        params = {
            "payType": 1,
            "orderID": "5767a72d28b108c7ceb01810"
        }
    }
    jsBridgeNative.bri_openModal(modalName, params, isUpdate);
}, false)


//浏览图片
var showBigImg = document.getElementById("showBigImg"),
    showBigImgList = document.getElementsByClassName("showBigImg"),
    _imgUrlList = [];
showBigImg.addEventListener('click', function () {
    var _img = event.target,
        _imgIndex = Number(_img.dataset.index);

    for (var i = 0; i < showBigImgList.length; i++) {
        _imgUrlList[i] = showBigImgList[i].getAttribute("src");
    }

    var modalName = 'native_scan_image',
        params = {
            "urls": _imgUrlList,
            "index": _imgIndex || 0
        },
        isUpdate = true,
        callbackMethod = modalName + '_callbackMethod';

    jsBridgeNative.bri_openModal(modalName, params, callbackMethod, isUpdate);
}, false);


//7.bri_fetchFile()方法

var capture = document.getElementById('capture'),
    bridgeCapture = document.getElementById('bridgeCapture');

capture.addEventListener('click', function () {
    var _index = bridgeCapture.selectedIndex,
        type = Number(bridgeCapture.options[_index].value);

    jsBridgeNative.bri_fetchFile(1, type, true, false, 0.8, true, 'markCapture');
}, false)

var selectImg = document.getElementById('selectImg'),
    bridgeSelectImg = document.getElementById('bridgeSelectImg');

selectImg.addEventListener('click', function () {
    var _index = bridgeSelectImg.selectedIndex,
        type = Number(bridgeSelectImg.options[_index].value);
    jsBridgeNative.bri_fetchFile(2, type, true, false, 0.8, true, 'markSelectImg');
}, false)


//8、bri_showActionSheet()方法

var sheetA = document.getElementById("sheetA"),
    sheetB = document.getElementById("sheetB");

sheetA.addEventListener('click', function () {
    jsBridgeNative.bri_showActionSheet('前端书籍', ['JS高级程序设计', 'Html5一学就会'], '取消', 'markBook')
})
sheetB.addEventListener('click', function () {
    jsBridgeNative.bri_showActionSheet('北京区域', ['海淀区', '朝阳区', '顺义区'], 'cancel', 'markAddress')
})


//9、bri_redirect()方法

var redirectA = document.getElementById("redirectA");

redirectA.addEventListener('click', function () {
    jsBridgeNative.bri_redirect(10, {'id': '570dea180cf2d7830b5c0675'}, false)
})


//模拟登录场景
var startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', function () {
    jsBridgeNative.bri_getConfig("isLogin", true, true, function (responseData, mark, modalNameOrKey) {
        var _key = responseData.key,
            _value = responseData.value;
        if (_key === modalNameOrKey) {
            if (_value) {
                console.log("已经登录....");
                //用户已经登录，取到用户ID，拼接参数到url，跳转页面
                jsBridgeNative.bri_getConfig('userID', true, true, function (responseData, mark, modalNameOrKey) {
                    if (responseData.value) {
                        console.log("用户ID为：" + responseData.value);
                        window.location.href = "https://t.meidaojia.com/makeup/jsCallNative.html?userID="+responseData.value;
                    }
                })
            } else {
                console.log("未登录....");
                //用户未登录，打开登录窗口，登录成功后，拼接url直接跳转页面
                jsBridgeNative.bri_openModal("native_login", {}, true, function (responseData) {
                    if (responseData.status === 0) {
                        console.log("用户登录成功...");
                        //登录成功后，取得userID
                        jsBridgeNative.bri_getConfig('userID', true, true, function (responseData, mark, modalNameOrKey) {
                            if (responseData.key === modalNameOrKey) {
                                if (responseData.value) {
                                    console.log("用户ID为：" + responseData.value);
                                    window.location.href = "https://t.meidaojia.com/makeup/jsCallNative.html?userID="+responseData.value;
                                }
                            }
                        })
                    } else if (responseData.status === -1) {    //用户关闭登录窗口，不做任何操作
                        console.log("用户关闭了登录窗口...");
                    }
                })
            }
        }
    })
})
