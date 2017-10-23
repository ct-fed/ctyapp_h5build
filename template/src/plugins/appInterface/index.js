/**
 * @index
 * @author  stylehuan
 * @create  2017-03-14 15:06
 */
let isIos = !!navigator.appVersion.match(/(iphone|ipad|ipod)/gi);

let getVersion = (sVersion) => {
  return parseInt(sVersion.replace(/\./g, ""), 10)
};
let _coreBridge = function (method) {
  var len = arguments.length;
  let paramsArray = [];
  //没参数的
  if (len === 1) {
    try {
      console.log('app接口:' + method);
      return HtmlInterface[method]();
    } catch (e) {
      console.log(e);
    }
  }
  /*带参数的*/
  for (var i = 0; i < len - 1; i++) {
    paramsArray[i] = arguments[i + 1];
  }
  try {
    console.log('app接口:' + method + '参数' + paramsArray);
    return (i = window.HtmlInterface)[method].apply(i, paramsArray);
  } catch (e) {
    console.log('---error---:' + e);
    return null;
  }
};
export default {
  install(vue, a) {
    const appInterFace = {
      isLogined: function () {
        return _coreBridge('isLogined');
      },
      getUserId: function () {
        return _coreBridge('getUserId');
      },
      getUserName: function () {
        return _coreBridge('getUserName');
      },
      getHeaderInfo: function () {
        try {
          let _header = _coreBridge('getHeaderInfo');
          return JSON.parse(_header);
        } catch (e) {
          return null;
        }
      },
      setPageName: function (method) {
        _coreBridge('setPageName', method);
      },
      isInstallGame: function (method) {
        return _coreBridge('isInstallGame', method);
      },
      isGameNeedUpdate: function (method) {
        return _coreBridge('isGameNeedUpdate', method);
      },
      location: function () {
        return _coreBridge('location');
      },
      getTcyVersionName: function () {
        return _coreBridge('getTcyVersionName');
      },
      getTcyChannel: function () {
        return _coreBridge('getTcyChannel');
      },
      isBindMobile: function () {
        return _coreBridge('isBindMobile');
      },
      isNetConnect: function () {
        return _coreBridge('isNetConnect');
      },
      getGameDownloadProgress: function (method) {
        return _coreBridge('getGameDownloadProgress', method);
      },
      startAppDetail: function (method) {
        _coreBridge('startAppDetail', method);
      },
      startDownloadList: function () {
        _coreBridge('startDownloadList');
      },
      openMyGame: function () {
        _coreBridge('openMyGame');
      },
      shareToWX: function (options) {
        var type = options.type || 1;
        var title = options.title || "";
        var content = options.content || "";
        var imageUrl = options.image || "";
        var shareUrl = options.shareUrl || "";
        var bigImageUrl = options.bigImage || "";
        var backFn = options.backFn || function () {
        };
        let _headerInfo = this.getHeaderInfo();
        let isSupper = false;
        let ios = "3.1.0";
        let android = "5.1.0";
        if (isIos) {
          if (getVersion(_headerInfo.tcyVersion) >= getVersion(ios)) {
            isSupper = true;
          }
        } else {
          if (getVersion(_headerInfo.tcyVersion) >= getVersion(android)) {
            isSupper = true;
          }
        }
        window.isShareToWx = function (result) {
          backFn(result);
        };
        window.share = function (result) {
          var code = -1;
          switch (result) {
            case '分享成功':
              code = 1;
              break;
            case '分享失败':
              code = 2;
              break;
            default:
              code = 3;
          }
          backFn(code);
        };
        switch (type) {
          case 1:
            bigImageUrl = "";
            break;
          case 2:
            if (isSupper) {
              title = "";
              content = "";
              imageUrl = "";
              shareUrl = "";
              break;
            }
        }
        if (isSupper) {
          _coreBridge('shareToWX', title, content, imageUrl, shareUrl, bigImageUrl, type);
          return;
        }
        _coreBridge('shareToWX', title, content, imageUrl, shareUrl);
      },
      openLogin: function () {
        _coreBridge('openLogin');
      },
      openActivity: function (className, extraString, extraInt, boolean) {
        _coreBridge('openActivity', className, extraString, extraInt, boolean);
      },
      openHallhome: function (method) {
        _coreBridge('openHallhome', method);
      },
      openSettingActivity: function () {
        _coreBridge('openSettingActivity');
      },
      gameInstalledSuccess: function () {
        _coreBridge('gameInstalledSuccess');
      },
      openVC: function (method) {
        _coreBridge('openVC', method);
      },
      openVCFromStoryboardName: function (method) {
        _coreBridge('openVCFromStoryboardName', method);
      },
      openLocalstarActivity: function () {
        _coreBridge('openLocalstarActivity');
      },
      openAccountSafeActivity: function () {
        _coreBridge('openAccountSafeActivity');
      },
      isWebHasError: function (isError, url) {
        isError = typeof isError === 'undefined' ? true : isError;
        url = url || window.location.href;
        _coreBridge('isWebHasError', isError, url);
      },
      installedGame: function (method) {
        _coreBridge('installedGame', method);
      },
      startCamera: function (backFn) {
        _coreBridge('startCamera');
        window.showImg = function (result) {
          backFn(result);
        };
      },
      startPhoto: function (backFn) {
        _coreBridge('startPhoto');
        window.showImg = function (result) {
          backFn(result);
        };
      },
      downloadFile: function (link, appName) {
        _coreBridge('downloadFile', link, appName);
      },
      getTcyVersionCode: function (method) {
        _coreBridge('getTcyVersionCode', method);
      },
      copyText: function (method) {
        _coreBridge('copyText', method);
      },
      updateDuiHuan: function (method) {
        _coreBridge('updateDuiHuan', method);
      },
      updateTongbao: function (method) {
        _coreBridge('updateTongbao', method);
      },
      getArea: function (backFn) {
        _coreBridge('getArea');
        window.setArea = function (result) {
          backFn(result);
        };
      },
      payForProduct: function (payInfo, backFn) {
        window.payForProductResult = function (result) {
          backFn(result);
        };
        _coreBridge('payForProduct', payInfo);
      },
      getProvinceNameById: function (provinceNo) {
        return _coreBridge('getProvinceNameById', provinceNo);
      },
      getCityNameById: function (provinceNo, cityNo) {
        return _coreBridge('getCityNameById', provinceNo, cityNo);
      },
      getdistrictNameById: function (provinceNo, cityNo, countyNo) {
        return _coreBridge('getdistrictNameById', provinceNo, cityNo, countyNo);
      },
      setCornerState: function (method, boolean) {
        _coreBridge('setCornerState', method, boolean);
      },
      openGame: function (method) {
        _coreBridge('openGame', method);
      },
      setIsRefresh: function (method) {
        _coreBridge('setIsRefresh', method);
      },
      getGamePackageName: function (method) {
        _coreBridge('getGamePackageName', method);
      }
    };
    if (!vue.$bee) {
      vue.$bee = {
        appInterface: appInterFace
      };
    } else {
      vue.$bee.appInterface = appInterFace;
    }
    vue.mixin({
      created: function () {
        this.$appInterface = vue.$bee.appInterface;
      }
    });
  }
};
