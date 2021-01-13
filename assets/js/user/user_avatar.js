// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比 是一个正方形的裁剪区域 长方形16/9 4/3 是来指定裁剪框是什么形状的
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)
$('#passBtn').on('click',function () {
    $('#imgFile').click()
})

$('#imgFile').on('change', function () {
    var filelist = $(this)[0].files
    console.log(filelist);
    if (filelist.length === 0) {
        return layui.layer.msg('请选择您要更改的图片！')
    }
    var myfile = filelist[0];
    var fileUrl = URL.createObjectURL(myfile);
    $image
        .cropper('destroy')
        .attr('src', fileUrl)
        .cropper(options)
})

$('#okBtn').on('click',function () {
    var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
        .toDataURL('image/png')
    $.ajax({
        method: 'post',
        url: '/my/update/avatar',
        data: { avatar: dataURL },
        success:function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('上传图片失败！')
            }
            layui.layer.msg('上传图片成功！')
            window.parent.getUserInfo()
        }
    })
})

