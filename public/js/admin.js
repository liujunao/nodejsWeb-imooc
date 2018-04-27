$(function(){
    $('.del').click(function(e){
        let target = $(e.target)
        var id = target.data('id')
        var tr = $('.item-id-' + id)

        $.ajax({
            type: 'DELETE',
            url: '/admin/delete?id=' + id
        })
        .done(function(result){
            if(result.success === 1){
                if(tr.length > 0){
                    tr.remove()
                }
            }
        })
    })
})