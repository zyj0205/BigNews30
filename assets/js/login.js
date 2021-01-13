$(function () {
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if (($(".reg-box [name=password]").val() )!== value) {
               return '两次密码不一致！'
            }
        }
    })
    $('#reg_form').submit(function (e) {
        e.preventDefault();
        // $(this).serialize();
        var data = {
            username: $('#reg_form [name=username]').val(),
            password: $('#reg_form [name=password]').val()
        }
        
        $.post("/api/reguser", data, function (res) {
            if (res.status !== 0) {
              return  layui.layer.msg(res.message); 
            }
           
           layui.layer.msg("注册成功，请登录"); 
        //    $('#link_login').click()
        $('.login-box').show();
        $('.reg-box').hide();
            
        })
        
    })
    $('#login_form').submit(function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            method:'post',
            url: '/api/login',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return  layui.layer.msg(res.message); 
                }
                layui.layer.msg('登录成功！')
                

                localStorage.setItem('token',res.token)
                location.href='../home/index.html'
             }
            
        })
    })
})