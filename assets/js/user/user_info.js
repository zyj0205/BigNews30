$(function() {
    layui.form.verify({
        nickname:function (value) {
            if (value.length > 6) {
              return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                  return  layui.layer.msg('获取用户信息失败！')
                }
                console.log(res.data);
                // 快速为表单赋值
                layui.form.val('formUserInfo',res.data)
            }
        })
    }
$('#btnReset').on('click',function (e) {
    e.preventDefault();
    initUserInfo();
})
    $('.layui-form').submit(function (e) {
        
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data:data,
            success:function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户数据失败！')
                }
                layui.layer.msg('更新用户数据成功！')

                window.parent.getUserInfo();
            }
        })
    })
})