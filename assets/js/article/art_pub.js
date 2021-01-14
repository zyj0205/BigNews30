initcate()
initEditor()
// 定义加载文章分类的方法
function  initcate() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('初始化文章分类失败')
            }
            var strhtml = template('tpl-option', res)
            $('[name=cate_id]').html(strhtml);
            layui.form.render();
        }
    })
}
 // 1. 初始化图片裁剪器
 var $image = $('#image')
  
 // 2. 裁剪选项
 var options = {
   aspectRatio: 400 / 280,
   preview: '.img-preview'
 }
 
 // 3. 初始化裁剪区域
$image.cropper(options)
 
$('#btnChooseImage').on('click',function () {
    $('#coverFile').click()
})
$('#coverFile').change(function () {
    var file = $(this)[0].files
    if (file.length === 0) {
        return 
    }
    var newImgURL = URL.createObjectURL(file[0])
    $image
     .cropper('destroy')      // 销毁旧的裁剪区域
     .attr('src', newImgURL)  // 重新设置图片路径
     .cropper(options)        // 重新初始化裁剪区域
})
var art_state = '已发布'
$('#btnSave2').on('click',function () {
    art_state='草稿'
})
$('#form-pub').on('submit',function (e) {
    e.preventDefault()
    var fd = new FormData($(this)[0])
    fd.append('state', art_state)
    $image
     .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 400,
      height: 280
    })
     .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
         fd.append('cover_img', blob)
         publicAppend(fd)
  })
})
function publicAppend(data) {
    $.ajax({
        method: 'POST',
        url: '/my/article/add',
        data: data,
        contentType: false,
      processData: false,
        success:function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('上传文章失败！')
            }
            layui.layer.msg('上传文章成功！')
            location.href='../article/art_list.html'
        }
    })
}
