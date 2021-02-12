$(document).ready(function(){

    function arcMove(c ,canvas, percentInit, percent_area, onePercent, result,posX, posY, fps, color){
        /*
        var gradient = c.createLinearGradient(0, 0, 170, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5" ,"blue");
        gradient.addColorStop("0.8" ,"green");
        gradient.addColorStop("1.0", "#fff");
        */
        var deegres = 0;
        var acrInterval = setInterval (function() {
            deegres += 1;
            c.clearRect( 0, 0, canvas.width, canvas.height );
            percentInit = deegres / onePercent;
        
            percent_area.html(percentInit.toFixed());
        
            c.beginPath();
            c.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
            c.strokeStyle = '#00000000';
            c.lineWidth = '10';
            c.stroke();
        
            c.beginPath();

            c.strokeStyle = color;
            //c.strokeStyle = gradient;

            c.lineWidth = '10';
            c.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + deegres) );
            c.stroke();
            if( deegres >= result ) clearInterval(acrInterval);
        }, fps);
    }

    $('.canvas-wrap-skill').each(function(){
        var canvas = $(this).find('canvas');
        var percent_area = $(this).find('.percent-skill');
        var percent = $(this).data('percent');
        var percentInit = 0;
        var onePercent = 360/100;
        var result = onePercent * percent;
        var color = $(this).data('color');
        var posX = canvas.width()/2;
        var posY = canvas.height()/2;
        var fps = 1;
        var c = canvas.get(0).getContext('2d');
        percent_area.css("color",color);
        c.lineCap = 'round';
        arcMove(c ,canvas, percentInit, percent_area, onePercent, result,posX, posY, fps, color)
    });

});