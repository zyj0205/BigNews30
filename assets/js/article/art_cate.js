initArtCateList()
function initArtCateList() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success:function (res) {
            var htmlStr = template('tmp-article', res)
            $('tbody').html(htmlStr)
        }
    })
}
// 添加点击事件
var indexAdd=null
$('#btnAddCate').on('click',function () {
  indexAdd=  layer.open({
        type: 1, 
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#add-edit').html()
      });
})

// 通过代理添加表单提交事件
$('body').on('submit','#form-add',function (e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('添加分类失败')
            }
            initArtCateList();
            layui.layer.msg('添加图书成功！')
            layui.layer.close(indexAdd);
            
        }
  })
})
var editAdd=null
$('tbody').on('click','.btn-edit',function () {
    editAdd=layer.open({
        type: 1, 
        area: ['500px', '250px'],
        title: '修改文章分类',
        content: $('#change-edit').html()
    });
    
    // 绘制出点击层之后需要获取对应数据渲染到文本框中
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-name');
    var alias = $(this).attr('data-alias');
    // 快速给表单赋值
    layui.form.val('form-edit', {
        Id: id,
        name: name,
        alias:alias,
    })
})
$('body').on('submit','#form-edit',function (e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('更新分类数据失败')
            }
            initArtCateList();
            layui.layer.msg('更新分类数据成功！')
            layui.layer.close(editAdd);
            
        }
  })
})

$('tbody').on('click','.btn-delete',function () {
    var id = $(this).attr('data-id')
   layui.layer.confirm('是否要删除?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/'+id,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('删除分类数据失败')
                }
                initArtCateList();
                layui.layer.msg('删除分类数据成功！')
                
            }
      })
        
        layer.close(index);
      });
   
})

