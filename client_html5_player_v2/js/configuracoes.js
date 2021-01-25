// DOCUMENT READY

$(document).ready(function () {
    radioKeep();
    $('.locutor, .scrolling, .ouvintes, .avatar').css('opacity', '0.5');
    $('.locutor, .scrolling, .ouvintes').click(function () {
        $('.locutor, .scrolling, .ouvintes, .avatar').css('opacity', '0.5');
        radioUpdate();
    });
});

// CONFIGURAÇÕES AREA

var configsAtivo = true;
function toggleConfigs() {
    if (configsAtivo) {
        $('.ativo').hide(2000);
        $('#changeIcon').html('<span class="iconify" data-icon="bi:arrow-right-circle-fill" data-inline="false"></span>');
        configsAtivo = false;
    } else {
        $('.ativo').show(2000);
        configsAtivo = true;
        $('#changeIcon').html('<span class="iconify" data-icon="bi:arrow-left-circle-fill" data-inline="false"></span>');
    }
}

// FULLSCREEN AREA

function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

// DISCORD AREA

function discordClick(){
    window.open("\/\/habborn.biz/discord", "targetWindow",
        "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=500");
}

//  FASTFOOD AREA
var fastfoodopen = false;
function fastfoodClick() {
    $("#fastfoodiframe").animate({height: 'toggle'});
    
    if(!fastfoodopen) {
        fastfoodopen = true;
        $("#clientbeta").css('zIndex', '-1');
        $("#fastfoodiframe").prop('src', '//habborn.biz/fastfood?ticket='+fastfoodticket); 
    } else {
        fastfoodopen = false;
        $("#clientbeta").css('zIndex', '1');
        $("#fastfoodiframe").prop('src', 'About:blank');
    }
}

// PLAYER BACKEND

var reproduzindo = true;
var audioElement = document.createElement('audio');

function togglePlayPause() {
    if (reproduzindo) {
        $('.controle').html('<span class="iconify" data-icon="fa-solid:play" data-inline="false"></span>');
        reproduzindo = false;
        player.setVolume(0);
    } else {
        $('.controle').html('<span class="iconify" data-icon="fa-solid:pause" data-inline="false"></span>');
        reproduzindo = true;
        player.setVolume($('#volume').val())
        player.play();
        radioUpdate();
    }
}


var liberado = false;
function radioUpdate() {
    if (liberado) {
        liberado = false;
        $.getJSON('https://idhabborn.com/inc/ajax/Status.php?op=View', function (data, success) {
            if (success) {
                $('.locutor').html((data.Locutor).substr(0,16)).animate({width: 'toggle'});
                $('.locutor').animate({width: 'toggle'});
                $('.avatar').css('background', 'url(https://habborn.biz/imager.php?user=' + data.Locutor + '&action=sit&direction=2&head_direction=2&img_format=png&gesture=std&headonly=0&size=s)');
                $('.programacao .scrolling').html((data.Programa)).animate({width: 'toggle'});
                $('.programacao .scrolling').animate({width: 'toggle'});
                var ouvintes = 0;
                if (data.Unicos < 100) {
                    ouvintes = "0" + data.Unicos
                } else if (data.Unicos < 10) {
                    ouvintes = "00" + data.Unicos
                } else { ouvintes = data.Unicos };
                $('.ouvintes').html(ouvintes).animate({width: 'toggle'});
                $('.ouvintes').animate({width: 'toggle'});

                $('.locutor, .scrolling, .ouvintes, .avatar').css('opacity', '1');
            }
            liberado = true;
        });
    }
}

function radioKeep() {
    liberado = true;
    radioUpdate();
    setTimeout(function () {
        radioKeep();
    }, 600000);
}

// TAWK AREA

var Tawk_show = false;
var Tawk_API = Tawk_API || {};

Tawk_API.visitor = {
    name: ''
};

Tawk_API.onLoad = function () {
    Tawk_API.hideWidget();

    Tawk_show = false;
    setInterval(function () {
        if (!Tawk_show) {
            Tawk_API.hideWidget();
        }
    }, 50)
};

Tawk_API.onChatMinimized = function () {
    Tawk_API.hideWidget();
    Tawk_show = false;
};

var Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/5e7430f28d24fc226588cc19/default';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

function helpBtn() {
    if (Tawk_show) {
        Tawk_API.hideWidget();
        Tawk_show = false;
    } else {
        Tawk_API.maximize();
        Tawk_API.showWidget();
        Tawk_show = true;
    }
}