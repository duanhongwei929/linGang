//按钮事件
var form_open_flat = 0;
function send_text_check (t) {
  var c = $(t).val();
  if (c) {
    $('#send_submit_btn').show();
    $('#send_form_btn').hide();
  } else {
    $('#send_submit_btn').hide();
    $('#send_form_btn').show();
  }
}

function send_form () {
  if (form_open_flat == 0) {
    $('#send_text').hide();
    $('#send_form').show();
    form_open_flat = 1;
  } else {
    $('#send_text').hide();
    $('#send_form').hide();
    form_open_flat = 0;
  }
}

function cancel_text () {
  $('#send_text').hide();
  $('#send_form').hide();
  form_open_flat = 0;
}

function send_text () {
  $('#send_text').show();
  $('#send_form').hide();
}

//图片上传事件
$('.upload_img').bind('click', function (ev) {
  //console.log(ev.currentTarget.dataset.id)
  var index = ev.currentTarget.dataset.id;
  if (index == 1) {
    $('#file1').click();
    $('#file1').unbind().change(function (e) {
      var index = e.currentTarget.dataset.id;
      if ($('#file').val() == '') {
        return false;
      }
      var filePath = $(this).val();
      changeImg(e, filePath, index);
    })
  }
})


var loading2 = null;

//图片上传
function changeImg (e, filePath, index) {
  fileFormat = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
  //检查后缀名
  if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
    layer.open({content: '文件格式必须为：png/jpg/jpeg', skin: 'msg', time: 2});
    return;
  }
  //获取并记录图片的base64编码
  var reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onloadend = function () {
    // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
    var dataURL = reader.result;
    // console.log(dataURL)
    //ajax上传图片

    //图片压缩
    compress(dataURL, 1600, 0.5).then(function (val) {

      dataURL = val;

      var data = {'dataURL': dataURL}

      $('.mui-loading').show();

      var access_token = getCookie('access_token');

      var to_mid = getQueryVariable('to_mid');

      $.ajax({
        type: 'POST',
        // url: host + '/api/message/sendimg?access_token=' + access_token + '&access_token_type=' + access_token_type + '&to_mid=' + to_mid,
        data: data,
        dataType: 'json',
        success: function (res) {
          mui.toast(res.msg, {duration: '2000', type: 'div'});
          load();
          $('.mui-loading').hide();
        }
      });
    });

  };

}

//图片压缩
function compress (base64String, w, quality) {
  var getMimeType = function (urlData) {
    var arr = urlData.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    // return mime.replace("image/", "");
    return mime;
  };
  var newImage = new Image();
  var imgWidth, imgHeight;

  var promise = new Promise(resolve => newImage.onload = resolve);
  newImage.src = base64String;
  return promise.then(() => {
    imgWidth = newImage.width;
    imgHeight = newImage.height;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    if (Math.max(imgWidth, imgHeight) > w) {
      if (imgWidth > imgHeight) {
        canvas.width = w;
        canvas.height = w * imgHeight / imgWidth;
      } else {
        canvas.height = w;
        canvas.width = w * imgWidth / imgHeight;
      }
    } else {
      canvas.width = imgWidth;
      canvas.height = imgHeight;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
    var base64 = canvas.toDataURL(getMimeType(base64String), quality);

    return base64;
  });
}

