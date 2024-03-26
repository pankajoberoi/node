const fs=require("fs");

//sync.... Blocking
// fs.writeFileSync("./test.txt","hello duniya");

// // Async... Non-blocking 
// fs.writeFile("./test.txt","hello duniya", (err)=>{})

// const result=fs.readFileSync("./contact.txt","utf-8");


// fs.readFile("./contact.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log("Error",err);
//     }else{
//         console.log(result);
//     }
// })

// console.log(result);

//  fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());

//  fs.appendFileSync("./test.txt",`Hey there\n`);
// fs.appendFileSync("./test.txt",`${Date.now()} Hey there\n`);

// fs.cpSync("./test.txt" ,"./copy.txt");
// fs.unlinkSync("copy.txt");

// console.log(fs.statSync("./test.txt"));  

// fs.mkdirSync("my-docs")


//blocking 
console.log("1")

const result=fs.readFileSync("contact.txt","utf-8");
console.log(result)

console.log("2")

//non blocking

console.log("1")

fs.readFile("contact.txt","utf-8" ,(err,result)=>{
    console.log(result);
});


console.log("2")


