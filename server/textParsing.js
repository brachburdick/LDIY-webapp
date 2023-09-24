const fs =  require('fs');
var enc = new TextEncoder();

fs.readFile('/Users/brach.burdick/Documents/LDiy/default jsons/rawText.txt', (err,data)=>{
    console.log(JSON.stringify(data))
    var string = new TextDecoder().decode(data["data"])
    console.log(string)
    
    if(err) throw err;
    
})


