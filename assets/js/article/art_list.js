$(function () {
  // 定义美化时间格式的过滤器
    // 如何定义过滤器函数   不用记，需要知道的是过滤器是一个函数，有参数。最终的值由函数的返回值决定，这里面一定要有return 
    template.defaults.imports.dataFormat = function (date) {
    //    换种写法 date是字符串，可以用splice分割
    //   date.splt('.')[0]
       const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
       return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
      }


    // 定义一个查询的参数对象，将来请求数据的时候，需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1,//页码值，默认请求第一条
        pagesize: 2,//显示条数，默认两条
        cate_id: '',//文章分类的id
        state:''//文章的发布状态
    }
    initSelect();
    initTable()
    // 获取文章列表数据方法
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章列表数据失败')
                }
                var htmlStr = template('tpl-table', res)
                $("tbody").html(htmlStr)

                // 在这调用渲染分页
                renderPage(res.total);
            }
        })
    }

    // 获取文章分类的方法
    function initSelect() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    layui.layer.msg('获取分类数据失败！')
                }              
                var htmlStr = template('tpl-select', res)
                $('[name=cate_id]').html(htmlStr);
                layui.form.render()
                
            }
        })
    }

    $('#form-search').submit(function (e) {
        e.preventDefault();
        var iddate = $('[name=cate_id]').val()
        var namedate = $('[name=state]').val()
        q.cate_id = iddate
        q.state = namedate
        initTable();
    }
    
    
    )

    // 分页  表格渲染完以后才能去调用分页
    function renderPage(date) {

        layui.laypage.render({
            elem: 'pageBox',
            count: date,
            limit:q.pagesize,//每页显示的条数
            curr: q.pagenum, //获取起始页
            layout: ['count', 'limit','prev', 'page', 'next', 'skip'],
            limits:[2,3,5,10],

            // 触发jump回调方式，1、点击页码的时候 
            // 2、调用了laypage.render方法
            jump: function (obj, first) {
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr
                // 通过first的值判断是哪一种方式触发
                q.pagesize=obj.limit
                if (!first) {
                    initTable()
                }
            }
          });      
    }

    $('tbody').on('click','.btn-delete',function() {
       var len=$('.btn-delete').length
        var id=$(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'get',
                url: '/my/article/delete/'+id,
                success:function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('获取数据列表失败！')
                    }   
                    layui.layer.msg('删除数据列表成功！')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum-1;
                    }

                    initTable();
                }
                
            })
            
            layer.close(index);
          });
          
    })
})
