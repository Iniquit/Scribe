var showVariableTypes = document.getElementById("myCheck").checked; 
        myFunction();

function checkShowVariableTypes() {
    showVariableTypes = document.getElementById("myCheck").checked; 
        myFunction();
}


function myFunction() {

let str = document.getElementsByClassName("test")[0].value;

if (str === ""){return;}

let reg = /(getConfig([^("]+))\(([^\)]+)\)/g;
let reg2 = /getConfig([^("]+)\(([^\)]+)\)/g;

let final = Array.from(str.matchAll(reg2));

//alert(str); 
//alert(final); // Array: ["<h1>", "h1"]
let namereg = /class\s*(\S+)/
let quotereg = /(["'])(?:(?=(\\?))\2.)*?\1/g
let extendsreg = /package com\.nisovin\.magicspells\.spells(\.[a-z]+)/

let spellname = ""
let spellextend = ""

if ((str.match(namereg)) === null){spellname = "?"}
else {
    spellname = Array.from(str.match(namereg))[1];
}

if ((str.match(extendsreg)) === null){spellextend = ""}
else {
    spellextend = Array.from(str.match(extendsreg))[1];
}

console.log(spellextend)

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


if (showVariableTypes){
    output.push("    " + e[2] + '<span class="grey"> #' + temp + "</span>")
}

else {
    output.push("    " + e[2])
}

    
});



output = output.join('\n');

//alert(output)



document.getElementsByClassName("demo")[0].innerHTML = spellname + "\n" + output

}

myFunction()