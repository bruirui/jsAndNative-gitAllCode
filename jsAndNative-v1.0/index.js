/**
 * Created by rrbao on 2016/6/7.
 */
var capture = document.getElementById('capture'),
    bridgeCapture = document.getElementById('bridgeCapture'),
    bridgeModal = document.getElementById('bridgeModal'),

    showBigImg = document.getElementById("showBigImg"),

    modal = document.getElementById('modal');

var bridgeCaptureUpdate = document.getElementsByName('bridgeCaptureUpdate'),
    bridgePhotoUpdate = document.getElementsByName('bridgePhotoUpdate'),
    shareType = document.getElementsByName('shareType');

var showBigImgList = document.getElementsByClassName("showBigImg");

var _imgUrlList = [];

window.onload = function () {
    jsBridgeNative.bri_onLoaded('我是标题', 'mdj://close', '左上角文案', '右上角文案', '','bri_onLoaded_operateMethod', false, true, true, true);
}

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

capture.addEventListener('click', function () {
    var _index = bridgeCapture.selectedIndex,
        type = Number(bridgeCapture.options[_index].value);

    jsBridgeNative.bri_fetchFile(1, type, true, false, 0.8, true,'markCapture');
}, false)