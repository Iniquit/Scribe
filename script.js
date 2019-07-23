var showVariableTypes = document.getElementById("showVariableTypes").checked; 
        myFunction();

function checkShowVariableTypes() {
    showVariableTypes = document.getElementById("showVariableTypes").checked; 
    showVariableTypes = document.getElementById("showVariableTypes").checked; 
        myFunction();
}


function myFunction() {

let str = document.getElementsByClassName("test")[0].value;

if (str === ""){return;}

let final = Array.from(str.matchAll(/getConfig([^("]+)\(([^\)]+)\)/g));

let namereg = /class\s*(\S+)/
let quotereg = /(["'])(?:(?=(\\?))\2.)*?\1/g
let extendsreg = /package com\.nisovin\.magicspells\.spells(\.[a-z]+)/
let optionreg = /"(.*)",(.*$)/g

let spellname = ""
let spellextend = ""
let options = []



if ((str.match(namereg)) === null){
    spellname = "?"
}

else {
    spellname = Array.from(str.match(namereg))[1];
}



if ((str.match(extendsreg)) === null){
    spellextend = ""
}

else {
    spellextend = Array.from(str.match(extendsreg))[1];
}



//console.log(spellextend)

let temp = ""

//alert(final[0][3]);
let output = []

output.push('    spell-class: "' + spellextend + "." +spellname +'"');

final.forEach(e => {

    if (e[1] === "String"){temp ="string"}
    else if (e[1] === "Vector"){temp ="vector"}
    else if (e[1] === "Int"){temp ="integer"}
    else if (e[1] === "Float"){temp ="float"}
    else if (e[1] === "Boolean"){temp ="boolean"}
    else if (e[1] === "Double"){temp ="double"}
    else if (e[1] === "StringList"){temp ="string list"}
    else if (e[1] === "Vector"){temp ="vector"}
    else {temp = e[1]}

    if ((e[2].match(optionreg)) === null) {
        options = "No options found"
    }

    else {
        options = Array.from(e[2].matchAll(optionreg));
    }

//console.log(options)

    if (showVariableTypes){
        output.push("    " + options[0][1] + ":" + options[0][2] + '<span class="grey"> #' + temp + "</span>")
    }

    else {
        output.push("    " + options[0][1] + ":" + options[0][2])
    }

    
});

output = output.join('\n');
//console.log(final.length)

//alert(output)



document.getElementsByClassName("demo")[0].innerHTML = spellname + ":\n" + output

document.getElementsByClassName("configcount")[0].innerHTML = "Found " + final.length + " config options"
}


/*const selectElement = document.querySelector('.spelldropdown');

selectElement.addEventListener('change', (event) => {
    myFunction();
});*/

//myFunction()