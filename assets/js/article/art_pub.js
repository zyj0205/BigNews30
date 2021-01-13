initcate()
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