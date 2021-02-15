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


    $(document).on('change','#color-picker',function(){
        //Colors is #hex

        let newColor = $(this).val();
        //let newColor = '#ccc';
        let max = 15*16+15;
        let min = 0*16+0;

        let delta = 20;

        let a;
        let b;
        let c;
        console.log(newColor.length);

        if((newColor.length)<5){
            a = newColor[1]+newColor[1];
            b = newColor[2]+newColor[2];
            c = newColor[3]+newColor[3];        
        }else{
            a = newColor[1]+newColor[2];
            b = newColor[3]+newColor[4];
            c = newColor[5]+newColor[6];
        }
        

        a = parseInt(a, 16);
        b = parseInt(b, 16);
        c = parseInt(c, 16);

        if(a+delta >= max){
            a = a-delta;
        }
        if(b+delta >= max){
            b = b-delta;
        }
        if(c+delta >= max){
            c = c-delta;
        }

        if(a-delta <= min){
            a = a+delta;
        }
        if(b-delta <= min){
            b = b+delta;
        }
        if(c-delta <= min){
            c = c+delta;
        }

        
        let mainColor ='#'+getHex(a.toString(16))+getHex(b.toString(16))+getHex(c.toString(16));
        let lightColor ='#'+getHex((a-delta).toString(16))+getHex((b-delta).toString(16))+getHex((c-delta).toString(16));
        let darkColor ='#'+getHex((a+delta).toString(16))+getHex((b+delta).toString(16))+getHex((c+delta).toString(16));
        
        
     

        /*
        console.log(mainColor);
        console.log('a= '+a.toString(16));
        console.log('b= '+b.toString(16));
        console.log('c= '+c.toString(16));
        console.log('a= '+getHex(a.toString(16)));
        console.log('b= '+getHex(b.toString(16)));
        console.log('c= '+getHex(c.toString(16)));
        */

        $('body').css("background",mainColor);
        $('.txt-drop').css("color",mainColor);
        $('.inner-circle').css("box-shadow","3px 3px 3px "+lightColor+", -3px -3px 3px "+darkColor);
        $('.outer-circle').css("box-shadow","inset 3px 3px 3px "+lightColor+",inset -3px -3px 3px "+darkColor);
        $('.skill-name').css("box-shadow","3px 3px 3px "+lightColor+", -3px -3px 3px "+darkColor);
    });

    function getHex(a){
        if(a.length < 2){
            return '0'+a;
        }else{
            return a;
        }
    }
});