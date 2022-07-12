import { postData } from './component/fetchUtil.js';
import { getData } from './component/fetchUtil.js';

(function ($) {
    'use strict';


	 // 1.禁止鼠标选中
    // selectstart   开始选中
    document.addEventListener('selectstart', function (e) {
        e.preventDefault(); //阻止默认行为
    });
	// 2.禁止鼠标右键
	document.addEventListener('contextmenu', function (e) {
        e.preventDefault(); //阻止默认行为
    });


    var browserWindow = $(window);
    // :: 1.0 Preloader Active Code
    browserWindow.on('load', function () {
        $('.preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });
  

    // :: 8.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        browserWindow.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="fa fa-angle-up"></i>'
        });
    }


    // :: 11.0 Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip()
    }


    // :: 13.0 prevent default a click
    $('a[href="#"]').on('click', function ($) {
        $.preventDefault();
    });

    // :: 14.0 wow Active Code
	new WOW().init();


		function GetQueryValue(queryName) {
			var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
			// 获取url中"?"符后的字符串并正则匹配
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return decodeURI(r[2]);
			} else {
				return null;
			}
		}


		let init=false;
		let code=null;
		let alertTitle=$('#alertModalLabel');
		let alertMsg=$('#alertModalBody');
		let alertModal=$('#alertModal');
		let alertModalHiddenFun=null;
		

		let confData={
			"user":null,
			"home":"https://car.jdzckj.com",
			"getCode":"https://car.jdzckj.com/code",
			"callUrl":"https://car.jdzckj.com/call",
			"smsUrl":"https://car.jdzckj.com/sms",
			"msgUrl":"https://car.jdzckj.com/msg"
		}
		
		//展示提醒框
		function showAlert(title,msg,func){
				if(null==title){
					title="";
				}
				alertTitle.html(title);
				alertMsg.html(msg);
				alertModalHiddenFun=func;
				alertModal.modal();
		}


		//消息框关闭后回调
		alertModal.on('hidden.bs.modal', function () {
			if(null!=alertModalHiddenFun){
				alertModalHiddenFun();
			}
			alertModalHiddenFun=null;
		});


		//初始化数据与状态
		code=GetQueryValue('code');
		if(null==code){
				showAlert("提示","请重新扫码或NFC",function(){
					window.location.href=confData.home;
				});
		}

		//呼叫车主
		$('#callMobile').on("click",function(e){
			getData(confData.callUrl, {code: code},function (loadData){
				if(null==loadData){
					return;
				}
				if("undefined" ==typeof loadData.code ||  loadData.code!=0){
					showAlert("错误！",loadData.msg);
					return;
				}
				window.location.href="tel:"+loadData.data;
			});
		});

		//消息提醒挪车
		$('#sendMSG').on("click",function(e){
			getData(confData.msgUrl, {code: code},function (loadData){
				if(null==loadData){
					return;
				}
				if("undefined" ==typeof loadData.code ||  loadData.code!=0){
					alertTitle.html("错误！");
					alertMsg.html(loadData.msg);
					showAlert("错误！",loadData.msg);
					return;
				}
				showAlert(null,loadData.msg);
			});
		});

		//短信通知挪车
		$('#sendSMS').on("click",function(e){
			getData(confData.smsUrl, {code: code},function (loadData){
				if(null==loadData){
					return;
				}
				if("undefined" ==typeof loadData.code ||  loadData.code!=0){
					alertTitle.html("错误！");
					alertMsg.html(loadData.msg);
					showAlert("错误！",loadData.msg);
					return;
				}
				showAlert(null,loadData.msg);
			});
		});

})(jQuery);