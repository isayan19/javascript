let input=document.getElementById('inputBox')
let buttons=document.querySelectorAll('button')

let string="";
let arr=Array.from(buttons);

function isValid(expr){
    let invalidOperator=/([+\-*/%]{2,})/;
    let invalidStart=/^[*/%]/;
    let invalidEnd=/[+\-*^/]$/;

    return !(invalidOperator.test(expr) || invalidStart.test(expr) || invalidEnd.test(expr))
}

function preprocess(expr) {
    // Replace percentages (like 50%) with (50/100)
    expr = expr.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
    return expr;
}

arr.forEach(button => {
    button.addEventListener('click',(e)=>{
        e.target.blur();
        if(e.target.innerHTML == '='){
            try{
                if(isValid(string)){
                    let expr=preprocess(string);
                    string=math.evaluate(expr).toString();
                    input.value=string;
                }else{
                    input.value="Error";
                    string="";
                }
            }catch(err){
                input.value="Error";
                string="";
            }
        }
        else if(e.target.innerHTML== 'AC'){
            string="";
            input.value=string;
        }else if(e.target.innerHTML== 'DEL'){
            string=string.substring(0,string.length-1);
            input.value=string;
        }
        else{
            string+=e.target.innerHTML;
            input.value=string;
        }
    })
})

document.addEventListener("keydown",(evt)=>{
    let key=evt.key;

    if(!isNaN(key) || ["+","-","*","/","%","."].includes(key)){
        string+=key;
        input.value=string;
    }else if(key == 'Enter'){
        try{
            if(isValid(string)){
                let expr=preprocess(string);
                string=math.evaluate(expr).toString();
                input.value=string;
            }else{
                input.value="Error"
            }
        }catch(err){
            input.value="Error";
            string="";
        }
    }else if(key == "Backspace"){
        string=string.substring(0,string.length-1);
        input.value=string;
    }else if(key == "Escape"){
        string="";
        input.value=string;
    }
});