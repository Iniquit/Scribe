//Get the "Show value types for config options?" checkbox's value as a boolean using getElementbyId("optionShowValueTypes")
function checkoptionShowValueTypes() {
    let optionShowValueTypes = document.getElementById("optionShowValueTypes").checked;
    console.log("'Show value types' checkbox is ", optionShowValueTypes) 
}

function doMainLoop() {
    checkoptionShowValueTypes();
    let str = document.getElementsByClassName("test")[0].value;

    if (str === ""){
        document.getElementsByClassName("output")[0].innerHTML = " ";
        document.getElementsByClassName("configcount")[0].innerHTML = ""
        return;
    }

    let configOptions = Array.from(str.matchAll(/getConfig([^("]+)\(([^\)]+)\)/g));
    let spelljavaConfigOptions = Array.from(str.matchAll(/config\.get(.*)\(path \+ "(.*?)", ([^\)]+)\)/g));

    let namereg = /class\s*(\S+)/
    let quotereg = /(["'])(?:(?=(\\?))\2.)*?\1/g
    let supertypeReg = /package com\.nisovin\.magicspells\.spells(\.[a-z]+)/
    let extendsreg = /extends\s*(\S+)/

    let optionreg = /"(.*)",(.*$)/g
    let spellname = ""
    let spellextend = ""
    let extendslist = ""
    let options = []


    if ((str.match(extendsreg)) === null){extendslist = ""}
    else {extendslist = Array.from(str.match(extendsreg))[1];}

    if ((str.match(namereg)) === null){spellname = "?"}
    else { spellname = Array.from(str.match(namereg))[1];}

    if ((str.match(supertypeReg)) === null){spellextend = ""}

    else {spellextend = Array.from(str.match(supertypeReg))[1];}

    let temp = ""
    let output = []

    
    if (optionShowValueTypes.checked){temp = ('<span class="grey"> #(inherits options from ' + extendslist + ")</span>")}


    output.push('    spell-class<span class="yellow">: "' + spellextend + "." +spellname +'"</span>' + temp);


    //console.log("Spell.java options: ", spelljavaConfigOptions)
    //console.log("Length of same: ", Object.keys(spelljavaConfigOptions).length)

    //Detect Spell.java
    if (Object.keys(spelljavaConfigOptions).length > 0){

        console.log("Detected Spell.java")
        document.getElementsByClassName("configcount")[0].innerHTML = "Detected Spell.java (" + Object.keys(spelljavaConfigOptions).length + " config options)"

        spelljavaConfigOptions.forEach(e => {
            output.push("    " + e[2])// + '<span class="yellow">: ' + e[3] + "</span>")
        })


    }

    //Proceed normally
    else{
    //console.log("Did not detect Spell.java")
    document.getElementsByClassName("configcount")[0].innerHTML = "Found " + configOptions.length + " config option(s)."

    configOptions.forEach(e => {
       let configOptionAccepts = e[1]

        if (configOptionAccepts === "String"){configOptionAccepts ="string"}
        else if (configOptionAccepts === "Vector"){configOptionAccepts ="vector"}
        else if (configOptionAccepts === "Int"){configOptionAccepts ="integer"}
        else if (configOptionAccepts === "Float"){configOptionAccepts ="float"}
        else if (configOptionAccepts === "Boolean"){configOptionAccepts ="boolean"}
        else if (configOptionAccepts === "Double"){configOptionAccepts ="double"}
        else if (configOptionAccepts === "StringList"){configOptionAccepts ="string list"}
        else if (configOptionAccepts === "Vector"){configOptionAccepts ="vector"}
        else {}

        if ((e[2].match(optionreg)) === null) {
            options = "No options found"
        }

        else {
            options = Array.from(e[2].matchAll(optionreg));
        }

        //console.log(optionShowValueTypes.checked)
        if (optionShowValueTypes.checked){
            output.push("    " + options[0][1] + '<span class="yellow">:' + options[0][2] + '</span><span class="grey"> #' + configOptionAccepts + "</span>")
        }

        else {
            output.push("    " + options[0][1] + '<span class="yellow">:' + options[0][2] + "</span>")
        }

        
    });

    }

    output = output.join('\n');

    document.getElementsByClassName("output")[0].innerHTML = spellname + ":\n" + output


}

doMainLoop()