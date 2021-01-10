    getUserInfo();
    $('#btnLogout').on('click', function () {
        layer.confirm('确定要退出吗?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token');
            location.href='./login.html'
            layer.close(index);
          });
        
    })
    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                renderAvatar(res.data);
                
            }
        })
    }
    // 需要配置请求头
    //获取用户的基本信息
    // renderAvatar();
    function renderAvatar(user) {
        var name = user.nickname || user.username;
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        }
        else {
            $('.layui-nav-img').hide();
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first).show();
        }
    }
