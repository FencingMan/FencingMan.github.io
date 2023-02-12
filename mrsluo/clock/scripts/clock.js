var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var nowDate = new Date();
var second = nowDate.getSeconds();
var minute = nowDate.getMinutes();
var hour = nowDate.getHours();
draw()

function draw() {
	var hourNum = Math.round(Math.random()*12 + 1)
	var minuteNum = Math.round(Math.random()*12 + 1)*5;
	if(minuteNum == 60){
		minuteNum =0;
	}
    nowDate = new Date(2022,05,14,hourNum,minuteNum,00);
    second = nowDate.getSeconds();
    minute = nowDate.getMinutes();
    hour = nowDate.getHours();
    ctx.clearRect(0, 0, 800, 800);
    ctx.beginPath();
	
        ctx.arc(400, 400, 370, 0, 360 * Math.PI / 180);
    ctx.lineCap = "round";
    for (var i = 0; i < 60; i++) {
        if ((i + 5) % 5 === 0) {
            continue;
        }
        ctx.moveTo(Math.cos((i * 6) / 180 * Math.PI) * 350 + 400, Math.sin((i * 6) / 180 * Math.PI) * 350 + 400);
        ctx.lineTo(Math.cos((i * 6) / 180 * Math.PI) * 335 + 400, Math.sin((i * 6) / 180 * Math.PI) * 335 + 400);
    }
    ctx.save();
    ctx.closePath();
    // ctx.shadowOffsetX=-5;
    // ctx.shadowOffsetY=2;
    // ctx.shadowBlur = 20;
    // ctx.shadowColor = "#000";
    ctx.lineWidth = 7;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    ctx.beginPath();
    ctx.lineCap = "round";
    for (var i = 1; i < 13; i++) {
        ctx.moveTo(Math.cos((i * 30) / 180 * Math.PI) * 350 + 400, -Math.sin((i * 30) / 180 * Math.PI) * 350 + 400);
        ctx.lineTo(Math.cos((i * 30) / 180 * Math.PI) * 320 + 400, -Math.sin((i * 30) / 180 * Math.PI) * 320 + 400);
        ctx.font = "50px Arial";
        if (i > 9) {
            ctx.fillText(i, Math.cos((i * 30 - 90) / 180 * Math.PI) * 280 + 400 - 25, Math.sin((i * 30 - 90) / 180 * Math.PI) * 280 + 400 + 25);
        } else {
            ctx.fillText(i, Math.cos((i * 30 - 90) / 180 * Math.PI) * 280 + 388, Math.sin((i * 30 - 90) / 180 * Math.PI) * 280 + 400 + 20);
        }
    }
    ctx.lineWidth = 11;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    ctx.beginPath();
    ctx.font = "24px Arial";
    ctx.font = "18px Arial";
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(Math.cos((hour * 30 + minute / 2 - 90) / 180 * Math.PI) * 180 + 400, Math.sin((hour * 30 + minute / 2 - 90) / 180 * Math.PI) * 180 + 400);
    ctx.lineTo(400, 400);
    ctx.save();
    ctx.lineCap = "round";
    ctx.closePath();
    ctx.shadowOffsetX = -5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#000";
    ctx.lineWidth = 24;
    ctx.strokeStyle = '#222';
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.moveTo(Math.cos((minute * 6 + second * 0.1 - 90) / 180 * Math.PI) * 250 + 400, Math.sin((minute * 6 + second * 0.1 - 90) / 180 * Math.PI) * 250 + 400);
    ctx.lineTo(400, 400);
    ctx.save();
    ctx.closePath();
    ctx.shadowOffsetX = -5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#000";
    ctx.lineWidth = 13;
    ctx.strokeStyle = '#222';
    ctx.stroke();
    ctx.restore();



    ctx.save();
    ctx.arc(400, 400, 20, 0, Math.PI * 2);
    ctx.shadowOffsetX = -5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#000";
    ctx.fillStyle = 'rgb(213, 153, 0)';
    ctx.fill();
    ctx.restore();
}

