/*
=========================================================
* PT短网址- v1.0.0
=========================================================
* Product Page: https://github.com/xuhuai66/pt-dwz
* Copyright 2020 Xuhuai (https://www.zhai78.com)
* Coded by Xuhuai
*/
function getBoard() {
    navigator.clipboard.readText().then(text => {
        $("#inputContent").val(text);
    }).catch(err => {
        document.getElementById('errorTips').innerHTML = '您未授予权限获取您的剪切板内容';
        $('#errPop').modal('show')
    });
}

function initial() {
    document.getElementById('copyLink').innerText = '复制链接';　　
    $('#resultBox').css('display', 'none');
    $('#desBox').css('display', 'block');
    $('#loadingBox').css('display', 'block');
}

function checkUrl(url, type) {
    var url_test = /^(http|https):\/\/.*$/i.test(url);
    if (!url_test) {
        document.getElementById('errTip').innerText = '链接有误请检查后再提交';
        $('#errPop').modal('show');
    } else {
        initial()
        urlType = $('input[name=urlType]:checked').val();
        $.post('/api.php', { type: type, kind: urlType, url: url }, function(data) {
            $('#loadingBox').css('display', 'none');
            if (data.status == 1) {
                document.getElementById('resultLink').innerText = data.url;
                $('#resultBox').css('display', 'block');
                $('#desBox').css('display', 'none');
            } else {
                document.getElementById('errTip').innerText = '转换失败';
                $('#errPop').modal('show');
            }
        });
    }
}

function setBoard() {
    var clipboard = new ClipboardJS("#copyLink");
    clipboard.on("success", function(element) { //复制成功的回调
        document.getElementById('copyLink').innerText = '复制成功';　　
        console.info("复制成功，复制内容： " + element.text);
    });
    clipboard.on("error", function(element) { //复制失败的回调
        console.info(element);
    });
}
$(function() {
    setBoard();
});