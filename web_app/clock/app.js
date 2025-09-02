const time=document.getElementById('time');
const timeformat=document.getElementById('timeformat');
const toggle=document.getElementById('toggle');

let is24=true;

document.addEventListener('DOMContentLoaded',()=>{
    setInterval(showTime,1000);

    toggle.addEventListener("click",()=>{
        is24=!is24;
        showTime();
    });
});


const showTime=()=>{
    let date=new Date();

    let hr=date.getHours();
    let min=date.getMinutes();
    let sec=date.getSeconds();
    let session="";

    if(!is24){
        session=hr>12? "PM" : "AM";
        hr=hr%12;
        hr=hr?hr:12;
    }

    hr=hr<10? `0${hr}` : hr;
    min=min<10? `0${min}` : min;
    sec=sec<10? `0${sec}` : sec;

    time.innerHTML=`${hr}:${min}:${sec}`;
    timeformat.innerHTML=is24? "24h" : session;
}


let ahr=document.getElementById('ahour')
let amin=document.getElementById('amin')
let asec=document.getElementById('asec')

function displayTime(){
    let date=new Date();

    let hr=date.getHours();
    let min=date.getMinutes();
    let sec=date.getSeconds();

    let hRotation=30*hr+min/2;
    let mRotation=6*min;
    let sRotation=6*sec;

    ahr.style.transform=`rotate(${hRotation}deg)`;
    amin.style.transform=`rotate(${mRotation}deg)`;
    asec.style.transform=`rotate(${sRotation}deg)`;
}

setInterval(displayTime,1000)

const timer=document.querySelector('.timer');
const startBtn=document.getElementById('startBtn')
const stopBtn=document.getElementById('stopBtn')
const resetBtn=document.getElementById('resetBtn')

let msec=0;
let sec=0;
let min=0;

let timerId=null;

startBtn.addEventListener("click",function(){
    if(timerId!==null){
        clearInterval(timerId);
    }
    timerId=setInterval(startTimer,10)
})

stopBtn.addEventListener("click",function(){
    clearInterval(timerId);
});

resetBtn.addEventListener("click",function(){
    clearInterval(timerId);
    timer.innerHTML=`00:00:00`;
    msec=sec=min=0;
});

function startTimer(){
    msec++;
    if (msec == 100){
        msec=0;
        sec++;
        if(sec == 60){
            sec=0;
            min++;
        }
    }
    let msecString=msec<10? `0${msec}` : msec;
    let secString=sec<10? `0${sec}` : sec;
    let minString=min<10? `0${min}` : min;

    timer.innerHTML=`${minString}:${secString}:${msecString}`;

}