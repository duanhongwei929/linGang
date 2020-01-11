$(".loginBtn").click(function(){
	var user = new Object();
	 // $.trim删除字符串开始末尾的空格
	logPhone = $.trim($(".logPhone").val());
	logPass = $.trim($(".logPass").val());
	var mylog = /^[1][3,4,5,7,8][0-9]{9}$/;
	var mypass = /^[a-zA-Z0-9_-]{6,16}$/;
	//前台的非空验证
	if(logPhone == "" || logPhone == null){
		$(".logPhone").focus;
		$(".login-tip").show();
		$(".login-tip").css("color","red");
		$(".login-tip").html("对不起，登录账号不能为空。");
	}else if(!mylog.test(logPhone)){
		$(".login-tip").show();
		$(".login-tip").css("color","red");
		$(".login-tip").html("对不起，请填写正确的手机号。");
	}else if(logPass == "" ||logPass == null){
		$(".logPass").focus;
		$(".login-tip").show();
		$(".login-tip").css("color","red");
		$(".login-tip").html("对不起，登录密码不能为空。");
	}else if(!mypass.test(logPass)){
		$(".login-tip").show();
		$(".login-tip").html("请输入6~16位密码");
	}else{
		$(".logTip").html("");
		//如果账号和密码都不为空，就进行 ajax 异步提交
		var json = JSON.stringify({
			// username: "",
			password: logPass,
			// code: "",		//验证码
			phone: logPhone
		})
		// console.log(json)
		$.ajax({
			// url:path + '/linU/login', //请求的路径
			url: path + '/linU/login',
			type:'POST',  //提交方法是POST
			data:json, //以JSON字符串形式把 user 传到后台
			contentType: 'application/json;charset=utf-8',
			dataType:'json', //后台返回的数据类型是json文本
			// timeout:1000,  //请求超时时间，毫秒
			error:function(){  //请求失败的回调方法
				// $(".login-tip").css("color","red");
				$(".login-tip").html("登录失败！请重试。");
			},
			success:function(result){	//请求成功的回调方法
				// console.log(result)
				if(result != "" && result.code == 1){
					addCookie(tk, result.token, 24)
					// if(result.user.cUsername == ''){
					// 	//若没有设置昵称，跳转到"/user-set.html"
					// 	window.location.href='./user-person.html';				
					// }else{
						//跳转到个人信息"/user-person.html"
						window.location.href='./user-person.html';				
					// }
				}else{
					$(".login-tip").show();
					$(".login-tip").html(result.msg);
				}
				// else if(result == "failed"){						//if里面条件由后台提供
				// 	// $(".login-tip").css("color","red");
				// 	$(".login-tip").html("登录失败！请重试。");
				// 	$(".logPhone").val('');
				// 	$(".logPass").val('');
				// }else if(result == "nologincode"){
				// 	// $(".login-tip").css("color","red");
				// 	$(".login-tip").html("登录账号不存在！请重试。");
				// }else if(result == "pwderror"){
				// 	// $(".login-tip").css("color","red");
				// 	$(".login-tip").html("登录密码错误！请重试。");
				// }else if("nodata" == result){
				// 	$(".login-tip").css("color","red");
				// 	$(".login-tip").html("对不起，没有任何数据需要处理！请重试。");
				// }
			}
		});
	}
});

// 验证码
$('.registText').click(function () {
	var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
	regPhone = $.trim($(".regPhone").val());
	if(regPhone == "" || regPhone == "undefined" || regPhone == null || regPhone == "null" || !myreg.test(regPhone)){
		$(".regTip").show();
		$(".regTip").css("color","red");
		$(".regTip").html("请填写正确的手机号");
	}else{
		$.ajax({
			type:'POST',
			url:path + "/linU/sendCode",
			data:{
				phone: regPhone
			}, //以JSON字符串形式把 user 传到后台
			// contentType: 'application/json;charset=utf-8',
			dataType:'json', //后台返回的数据类型是json文本
			// timeout:1000,  //请求超时时间，毫秒
			error:function(){  //请求失败的回调方法
				// $(".login-tip").css("color","red");
				$(".regTip").show();
				$(".regTip").css("color","red");
				$(".regTip").html("验证码发送失败!");
			},
			success:function(result){
				// console.log(result)
					if(result != "" && result.code == 1){
						var time = 60;
						var timer = setInterval(function(){
						    time--;
						   $('.registText').html(time+"秒重发");
							$('.registText').css({'background':'#ccc','pointer-events':'none'});
							if(time==0){
						        clearInterval(timer);
								$('.registText').html("获取验证码");
								$('.registText').css({'background':'#6aaff7','pointer-events':'auto'});
							}
						},1000);				//若登录成功，跳转到"/main.html"
					}else{
						$(".login-tip").show();
						$(".login-tip").html(result.msg);
					}
			}
		})
	}
	
	    
	});
// 注册
$('.regBtn').click(function(){
	var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
	var mypass =/^[a-zA-Z0-9_-]{6,16}$/;
	var user = new Object();
	regPhone = $.trim($(".regPhone").val());
	regPass = $.trim($(".regPass").val());
	codeNum =  $.trim($(".regNote").val());
	//前台的非空验证
	if(regPhone == "" || regPhone == "undefined" || regPhone == null || regPhone == "null"){
		$(".regPhone").focus;
		$(".regTip").show();
		$(".regTip").css("color","red");
		$(".regTip").html("对不起，账号不能为空。");
	}else if(codeNum == "" ||codeNum == null){
		$(".regTip").show();
		$(".regTip").css("color","red");
		$(".regTip").html("对不起，请填写验证码。");
	}else if(!myreg.test(regPhone)){
		$(".regTip").show();
		$(".regTip").css("color","red");
		$(".regTip").html("对不起，请填写正确的手机号。");
	}else if(regPass == "" ||regPass == null){
		$(".regPass").focus;
		$(".regTip").show();
		$(".regTip").css("color","red");
		$(".regTip").html("对不起，密码不能为空。");
	}else if(!mypass.test(regPass)){
		$(".regTip").show();
		$(".regTip").css("color","red");
		$(".regTip").html("对不起，密码格式错误。");
	}else if(!$("#helpNote").prop('checked')){
		$(".regTip").show();
		$(".regTip").css("color","red");
		$(".regTip").html("请勾选服务协议");
	}else{
		$(".regTip").html("");
		var json = JSON.stringify({
			// username: "",
			phone: regPhone,
			code: codeNum,		//验证码
			password: regPass
		});
		$.ajax({
			type:'POST',
			url:path + "/linU/register",
			data:json, //以JSON字符串形式把 user 传到后台
			contentType: 'application/json;charset=utf-8',
			dataType:'json', //后台返回的数据类型是json文本
			// timeout:1000,  //请求超时时间，毫秒
			error:function(){  //请求失败的回调方法
				// $(".login-tip").css("color","red");
				$(".regTip").show();
				$(".regTip").css("color","red");
				$(".regTip").html("注册失败请重试!");
			},
			success:function(result){
				// console.log(result)
					if(result != "" && result.code == 1){
						alert(result.msg)
						// addCookie(tk, result.token, 2);
						window.location.href='./login.html';				//若登录成功，跳转到"/main.html"
					}else{
						$(".login-tip").show();
						$(".login-tip").html(result.msg);
					}
			}
		})
	}
})

