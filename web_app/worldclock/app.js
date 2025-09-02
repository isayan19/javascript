const time=document.getElementById('time')
const nyk=document.getElementById('nyk')
const moscow=document.getElementById('moscow')
const tokyo=document.getElementById('tokyo')
const london=document.getElementById('london')
const paris=document.getElementById('paris')
const sydney=document.getElementById('sydney')
const shanghai=document.getElementById('shanghai')
const utc=document.getElementById('utc')
const angel=document.getElementById('angel')

function getZone(ms,timeZone){
    let date=new Date(ms);
    let time=date.toLocaleString("en-US",{
        timeZone,
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit",
        hour12:false,
    });
    return time;
}

function setTime(){
    let ms=Date.now();
    nyk.innerHTML=getZone(ms,"America/New_York");
    time.innerHTML=getZone(ms,"Asia/Kolkata");
    moscow.innerHTML=getZone(ms,"Europe/Moscow");
    tokyo.innerHTML=getZone(ms,"Asia/Tokyo");
    london.innerHTML=getZone(ms,"Europe/London");
    paris.innerHTML=getZone(ms,"Europe/Paris");
    sydney.innerHTML=getZone(ms,"Australia/Sydney");
    shanghai.innerHTML=getZone(ms,"Asia/Shanghai");
    utc.innerHTML=getZone(ms,"UTC")
    angel.innerHTML=getZone(ms,"America/Los_Angeles")
}

document.addEventListener('DOMContentLoaded',()=>{
    setInterval(setTime,1000);
    setTime();
})

function setAnalogClock(timeZone, hourEl, minEl, secEl) {
  let now = new Date();
  let options = { timeZone };
  let localTime = new Date(now.toLocaleString("en-US", options));

  let seconds = localTime.getSeconds();
  let minutes = localTime.getMinutes();
  let hours = localTime.getHours();

  let secDeg = seconds * 6; // 360/60
  let minDeg = minutes * 6 + seconds * 0.1;
  let hourDeg = (hours % 12) * 30 + minutes * 0.5;

  secEl.style.transform = `rotate(${secDeg}deg)`;
  minEl.style.transform = `rotate(${minDeg}deg)`;
  hourEl.style.transform = `rotate(${hourDeg}deg)`;
}

setInterval(() => {
  setAnalogClock(
    "UTC",
    document.getElementById("hour"),
    document.getElementById("minute"),
    document.getElementById("second")
  );
  setAnalogClock(
    "Asia/Kolkata",
    document.getElementById("kolkata-hour"),
    document.getElementById("kolkata-minute"),
    document.getElementById("kolkata-second")
  );
  setAnalogClock(
    "America/New_York",
    document.getElementById("nyk-hour"),
    document.getElementById("nyk-minute"),
    document.getElementById("nyk-second")
  );
  setAnalogClock(
    "Europe/Moscow",
    document.getElementById("moscow-hour"),
    document.getElementById("moscow-minute"),
    document.getElementById("moscow-second")
  );
  setAnalogClock(
    "Asia/Tokyo",
    document.getElementById("tokyo-hour"),
    document.getElementById("tokyo-minute"),
    document.getElementById("tokyo-second")
  );
  setAnalogClock(
    "Europe/London",
    document.getElementById("london-hour"),
    document.getElementById("london-minute"),
    document.getElementById("london-second")
  );
  setAnalogClock(
    "Europe/Paris",
    document.getElementById("paris-hour"),
    document.getElementById("paris-minute"),
    document.getElementById("paris-second")
  );
  setAnalogClock(
    "Australia/Sydney",
    document.getElementById("sydney-hour"),
    document.getElementById("sydney-minute"),
    document.getElementById("sydney-second")
  );
  setAnalogClock(
    "Asia/Shanghai",
    document.getElementById("shanghai-hour"),
    document.getElementById("shanghai-minute"),
    document.getElementById("shanghai-second")
  );
  setAnalogClock(
    "America/Los_angeles",
    document.getElementById("angel-hour"),
    document.getElementById("angel-minute"),
    document.getElementById("angel-second")
  );
}, 1000);