var keysnum = 0;
var minenum = 0;
var pressed = false

function buttonPressed(){
    if (!pressed){
    let button = document.getElementById("dont-click");
    button.src = "assets/chest_zerokeys.png"
    document.getElementById("creeper").style.display = "block";
    document.getElementById("balloon").style.display = "block";
    document.getElementById("pickaxe").style.display = "block";
    document.getElementById("small_chest").style.display = "block";
    }
}

function keys(){
    if(keysnum == 1){
        let button = document.getElementById("dont-click");
        button.src = "assets/chest_onekey.png"
    }
    if(keysnum == 2){
        let button = document.getElementById("dont-click");
        button.src = "assets/chest_twokeys.png"
    }
    if(keysnum == 3){
        let button = document.getElementById("dont-click");
        button.src = "assets/chest_threekeys.png"
        document.getElementById("popup").style.display = 'flex'
    }
}

function expload(){
    let creeper = document.getElementById("creeper");
    creeper.src = "assets/creeper_goingtoexpload.gif";
    setTimeout(() => {
        creeper.src ="assets/caboom.gif"
        setTimeout(() =>{
            keysnum = keysnum+1
            keys(keysnum);
            creeper.style.display = "none"
        }, 1000)
    }, 6960)
}

function balloonShow(){
    document.getElementById("balloonTP").style.display = "block";
}

function balloonPopping(){
    keysnum = keysnum+1;
    keys(keysnum)
    document.getElementById("balloonTP").style.display = 'none';
}

// function mine(){
//     document.getElementById("pickaxe").remove;
//     setTimeout(() => {
//         document.getElementById("cobblestone").remove;
//         setTimeout(() => {
//             document.getElementById("block_on_chest").remove;
//         }, 2000)
//     }, 2000)
//     keysnum = keysnum+1 
//         keys(keysnum)
// }
var picked = false
// function miningStages(){
//     document.getElementById("braking").src = `assets/braking_stages/destroy_stage_${minenum}.png`;
//     minenum = minenum+1
// }
function pickPickaxe(){
    picked = true
    window.addEventListener('mousemove', (event) => {
        const mouseX = event.pageX;
        const mouseY = event.pageY;
    
        const pickaxe = document.getElementById("pickaxe");
        pickaxe.style.position = "absolute";
        pickaxe.style.left = mouseX-50+"px";
        pickaxe.style.top = mouseY-50+"px";
        const cobblestone = document.getElementById("cobblestone");
    
    });
}
function mine(){
    if(picked === true){
        keysnum = keysnum+1
        setTimeout(keys(), 1000)
        document.getElementById("small_chest").remove()
        const pickaxe = document.getElementById("pickaxe");
        pickaxe.style.display = "none";
        
    }
   
}
