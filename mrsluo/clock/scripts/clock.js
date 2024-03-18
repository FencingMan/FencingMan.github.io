var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var hour = Math.round(Math.random() * 23)
var minute = Math.round(Math.random() * 12) * 5;
var second = 0;
minute = minute == 60 ? 0 : minute;

drawDial();

/**
 * 画钟盘
 */
function drawDial() {
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


    if (!document.getElementById("hiddenHour").checked) {
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
    }

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

    document.getElementById("currentTime").value = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
}

/**
 * 重新生成
 * @param isZhiDing 是否指定时间
 */
function fresh(isZhiDing) {

    if (isZhiDing) {
        const currentTime = document.getElementById("currentTime").value;
        if (currentTime == null || currentTime == "") {
            alert("请输入时间");
            return;
        }
        //根据：或者:分割时间
        const time = currentTime.split(":");
        if (time.length != 2) {
            alert("时间输入有误，需要英文冒号哦");
            return;
        }
        hour = parseInt(time[0]);
        minute = parseInt(time[1]);
        if (hour > 23 || hour < 0 || minute > 59 || minute < 0) {
            alert("时间输入有误");
            return;
        }

    } else {
        hour = Math.round(Math.random() * 23)
        if (document.getElementById("is5").checked) {
            minute = Math.round(Math.random() * 12) * 5;
        } else {
            minute = Math.round(Math.random() * 60);
        }
        minute = minute == 60 ? 0 : minute;
    }

    drawDial();
}

//使钟表前进指定的小时数
async function goHours() {
    var hours = document.getElementById("goHours").value;
    if (hours == null || hours == "") {
        alert("请输入小时数");
        return;
    }
    let nums = 60 * hours;
    for (let i = 0; i < nums; i++) {
        if (++minute == 60) {
            minute = 0;
            if (++hour == 24) {
                hour = 0;
            }
        }
        await sleep(10);
        drawDial();
    }
}

function sleep(time){
    return new Promise((resolve) => setTimeout(resolve, time));
}



    // function sleep(time){
    //     var timeStamp = new Date().getTime();
    //     var endTime = timeStamp + time;
    //     while(true){
    //         if (new Date().getTime() > endTime){
    //             return;
    //         }
    //     }
    // }

