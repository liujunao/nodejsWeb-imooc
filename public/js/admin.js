$(function () {
    $('.del').click(function (e) {
        let target = $(e.target)
        var id = target.data('id')
        var tr = $('.item-id-' + id)

        $.ajax({
            type: 'DELETE',
            url: '/admin/movie/delete?id=' + id
        })
            .done(function (result) {
                if (result.success === 1) {
                    if (tr.length > 0) {
                        tr.remove()
                    }
                }
            })
    })

    $('#douban').blur(function () {
        let douban = $(this)
        let id = douban.val()

        if (id) {
            $.ajax({
                url: 'https://api.douban.com/v2/movie/subject/' + id,
                cache: true,
                type: 'get',
                dataType: 'jsonp',
                crossDomain: true,
                jsonp: 'callback',
                success: function (data) {
                    $('#inputTitle').val(data.title)
                    $('#inputDoctor').val(data.directors[0].name)
                    $('#inputCountry').val(data.countries[0])
                    $('#inputPoster').val(data.images.large)
                    $('#inputYear').val(data.year)
                    $('#inputSummary').val(data.summary)
                }
            })
        }
    })
})