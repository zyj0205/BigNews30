layui.form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
        var pedVal=$('[name=newPwd]').val()
        if (value !== pedVal) {
            return ('两次密码不一致')
        }

    }
});      
$('.layui-form').submit(function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        method: 'POST',
        url: "/my/updatepwd",
        data: data,
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('更改密码失败！')
            }
            layui.layer.msg('更改密码成功！')
            $(".layui-form")[0].reset()
        }
       
    })
    
})
  