const modules={
    calculator:"../calculator/index.html",
    clock:"../clock/index.html",
    worldclock:"../worldclock/index.html"
}

async function loadModule(moduleName){
    const file=modules[moduleName];
    if(!file) return;
    try{
        const res=await fetch(file);
        if (!res.ok) throw new Error("Failed to load file");

        const html=await res.text();

        document.getElementById("content").innerHTML=
        `<iframe src="${file}" style="width:100%;height:100vh;border:none;overflow: hidden"></iframe>`;

        document.getElementById("mainMenu").style.display="none";
        document.getElementById("backBtn").style.display="block";

    }catch(err){
        document.getElementById("content").innerHTML="<h2>Error<h2>";
        console.error(err);
    }
}

function goBack(){
    document.getElementById("content").innerHTML="";
    document.getElementById("mainMenu").style.display="block";
    document.getElementById("backBtn").style.display="none"
}
