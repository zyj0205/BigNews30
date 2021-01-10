$.ajaxPrefilter(function (options) {
    
    options.url='http://api-breakingnews-web.itheima.net'+options.url
    if (options.url.indexOf('/my/') !== -1) {
        // if(options.url.includes('/my/'))
        options.headers = {
          Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete=function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '../home/login.html'
          }
    }

})