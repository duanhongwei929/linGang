var path = 'http://192.168.3.14:8081';
// 用户头像/商品分类/钢厂logo图片路径
var photoPath = 'http://192.168.3.14:8081/upload/head';
// 营业执照图片
var zzhPath = 'http://192.168.3.14:8081/upload/license';
 function isEmpty(obj) {
  if (obj == '' || obj == 'null' || obj == 'undefined' || obj == undefined)
   return true;
  else
   return false;
 };
 // 购物车数量
 $(function(){
 	var tkn = getCookie(tk);
 	$.ajax({
 		url: path + '/linA/listgwc',
 		type:'GET',
 		data:{},
 		beforeSend: function (XMLHttpRequest) {
 			XMLHttpRequest.setRequestHeader("token", tkn);
 		},
 		dataType:'json', //后台返回的数据类型是json文本
 		success:function(result) {
 			if(result != "" && result.code == 1){
 				var shopCart = result.data;  //购物车商品
 				$('.fix-num').html(shopCart.length);
 			}
 		}
 	})
 });
 // 点击验证是否登录
  function uOnLine(url){
 	var tkn = getCookie(tk);
 	if(isEmpty(tkn)){
 		window.location.href = 'login.html';
 		return;
 	}
 	window.location.href = url;
  };
  $(function(){
 	 var tkn = getCookie(tk);
 	 if(!isEmpty(tkn)){
 	 	$.ajax({
 	 		url: path + '/linA/getyh',
 	 		type:'GET',
 	 		beforeSend: function (XMLHttpRequest) {
 	 			XMLHttpRequest.setRequestHeader("token", tkn);
 	 		},
 	 		data:{},
 	 		dataType:'json', //后台返回的数据类型是json文本
 	 		success:function(result) {
 	 			if(result != "" && result.code == 1){
 	 				$('.noLogin').addClass('hidden');
 	 				$('.rLogin').removeClass('hidden');
 	 				var btnType = result.user;
 	 				$('.rLogin span').html(btnType.cUsername);
 	 			}
 	 		}
 	 	})
 	 }
  })
 // 退出
  function logout() {
 	 delCookie(tk);
 	 // console.log(getCookie(tk))
 	 window.location.href = 'login.html';
  }
