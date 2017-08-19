var bodyw;
var flakeColor = 1;

jQuery(document).ready(function($) {
    $('#comingsoon').hide();
    var r;
    bodyw = $('body').width();
    //alert(bodyw + " ========== ");
    init(bodyw);

    $(".nextpage a").smoothScroll({
        easing: 'easeInOutQuad',
        speed: 2000,
        afterScroll: function() {
            $('#comingsoon').show(500);
        }
    });
    /*.click(function(event) {
        event.preventDefault();
        var s = $(this).attr('href');
        alert(s);
        r = $(s).offset();
        alert(r.top + ' ---------- ' + r.left);
        $('#page-container').animate({
                'top': '-' + r.top,
                'left': '-' + r.left
            },
            2000, 'easeOutExpo');

    });*/

    var bodyh = $(window).height();
    var ch = bodyh - 720;
    if (ch > 0) {
        $('#footpor').height(ch);
    };

    $("#btt").click(function(event) {
        $("#nav").toggle(function() {
            $("#nav,#btt").animate({
                'left': '-300px'
            }, 500)
        }, function() {
            $("#nav").animate({
                'left': '0px'
            });
            $("#btt").animate({
                    'left': "2000px"
                },
                500);
        });

    });
    var bcolor;
    $('#sub-menu li').hover(function() {
        flakeColor = $(this).attr('num');
        if (flakeColor == 1) {
            bcolor = "#10a8ae";
        } else if (flakeColor == 2) {
            bcolor = "#3c5899";
        } else if (flakeColor == 3) {
            bcolor = "#27a9d6"
        } else if (flakeColor == 4) {
            bcolor = "#b03939"
        } else if (flakeColor == 5) {
            bcolor = "#007eae"
        };
        $('#sub-menu li').css({
            'top': '0px'
        });
        //$('#num2').css('background-color', '#3c5899');
        $(this).stop().animate({
                'top': '-10px',
            },
            500, function() {
                $('#num2,#footpor').animate({
                    'background-color': bcolor
                }, 500);
                $('#num1').animate({
                    'color': bcolor
                }, 500);
            });
    }, function() {
        flakeColor = 1;
        $(this).stop().animate({
                'top': '0px'
            },
            100, function() {
                $('#num2,#footpor').animate({
                    'background-color': '#10a8ae'
                }, 500);
                $('#num1').animate({
                    'color': '#10a8ae'
                }, 500);
            });
    });


    $(window).resize(function(event) {
        bodyw = $('body').width();
        init2(bodyw);
    });


    mousemove(function(event) {

    });









});


var timerend = 0;
var canvas = null;
var context = null;
var bufferCanvas = null;
var bufferCanvasCtx = null;
var flakeArray = [];
var flakeTimer = null;
var maxFlakes = 50;
var animinter;

function Flake() {
    this.x = Math.round(Math.random() * context.canvas.width);
    this.y = -10;
    this.drift = Math.random();
    this.speed = Math.round(Math.random() * 1);
    this.width = (Math.random() * 2) + 1;
    this.height = this.width;
}

function init(bodyw) {
    canvas = document.getElementById('testCanvas');
    context = canvas.getContext("2d");
    canvas.width = bodyw;
    bufferCanvas = document.createElement("canvas");
    bufferCanvasCtx = bufferCanvas.getContext("2d");
    bufferCanvasCtx.canvas.width = context.canvas.width;
    bufferCanvasCtx.canvas.height = context.canvas.height;

    // initialize the rects
    flakeTimer = setInterval(addFlake, 200);

    Draw();

    animinter = setInterval(animate, 30);
}

function init2(bodyw) {
    canvas.width = bodyw;
    bufferCanvasCtx.canvas.width = context.canvas.width;
    // initialize the rects

}


function addFlake() {
    flakeArray[flakeArray.length] = new Flake();
    if (flakeArray.length == maxFlakes)
        clearInterval(flakeTimer);
}

function blank() {
    bufferCanvasCtx.fillStyle = "transparent";
    bufferCanvasCtx.fillRect(0, 0, bufferCanvasCtx.canvas.width, bufferCanvasCtx.canvas.height);
}

function animate() {
    Update();
    Draw();
}

function Update() {
    for (var i = 0; i < flakeArray.length; i++) {
        if (flakeArray[i].y < context.canvas.height + 50) {
            flakeArray[i].y += flakeArray[i].speed;
            if (flakeArray[i].y > context.canvas.height)
                flakeArray[i].y = -50;
            flakeArray[i].x += flakeArray[i].drift;
            if (flakeArray[i].x > context.canvas.width)
                flakeArray[i].x = 0;
        }
    }
}

function Draw() {
    context.save();
    /*
                // create a clipping region
                bufferCanvasCtx.beginPath();
                bufferCanvasCtx.fillStyle="black";
                bufferCanvasCtx.fillRect(0,0,bufferCanvas.width,bufferCanvas.height);
                bufferCanvasCtx.arc(bufferCanvas.width/2,bufferCanvas.height/2,bufferCanvas.height/3,0,2*Math.PI);
                bufferCanvasCtx.clip();
*/
    //blank();
    init2(bodyw);
    timerend++;
    if (timerend > 100) {
        //clearInterval(animinter);
    };

    var textfill;
    for (var i = 0; i < flakeArray.length; i++) {


        if (flakeColor == 1) {
            bufferCanvasCtx.fillStyle = "#10a8ae";
            textfill = '\uF069';
        } else if (flakeColor == 2) {
            bufferCanvasCtx.fillStyle = "#3c5899";
            textfill = '\uF09a';
        } else if (flakeColor == 3) {
            bufferCanvasCtx.fillStyle = "#1cc5ff"
            textfill = '\uF099';
        } else if (flakeColor == 4) {
            bufferCanvasCtx.fillStyle = "#d34435"
            textfill = '\uF0d5';
        } else if (flakeColor == 5) {
            bufferCanvasCtx.fillStyle = "#007eae"
            textfill = '\uF0e1';
        };
        //textfill = \uf11l;
        bufferCanvasCtx.font = flakeArray[i].width * 3 + "px FontAwesome";
        bufferCanvasCtx.fillText(textfill, flakeArray[i].x, flakeArray[i].y);
        // bufferCanvasCtx.fillStyle = "#10a8ae";
        //bufferCanvasCtx.strokeStyle = "#fff";
        //bufferCanvasCtx.globalAlpha = 0.7;
        //bufferCanvasCtx.beginPath();
        //bufferCanvasCtx.arc(flakeArray[i].x, flakeArray[i].y, flakeArray[i].width, 0, 2 * Math.PI);
        // bufferCanvasCtx.fillRect(flakeArray[i].x, flakeArray[i].y, flakeArray[i].width, flakeArray[i].height);
        // stroke and fill a circle
        //bufferCanvasCtx.fill();
        //bufferCanvasCtx.stroke();

        //    bufferCanvasCtx.beginPath();
        //    ctx.arc(550,150,100,0,2*Math.PI);
        //    ctx.fill();

    }

    // copy the entire rendered image from the buffer canvas to the visible one
    context.drawImage(bufferCanvas, 0, 0, bufferCanvas.width, bufferCanvas.height);
    context.restore();
}