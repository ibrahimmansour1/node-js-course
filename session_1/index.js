// built in module
// const os = require('node:os');
// console.log(os.platform());
// const fs = require('node:fs');
// const fileContent = fs.readFileSync('./test.txt','utf8');
// console.log(fileContent);
// import {log} from './logger.js';
// log("finally worked, focus, keep going")
// console.log(__filename)
// console.log(__dirname)

// lecture 2

const fs = require('node:fs');
// const { json } = require('stream/consumers');

// // create file 
// console.log('first');
// const fileContent = fs.readFileSync('./hello.txt','utf-8');
// console.log("fileContent", fileContent);
// console.log('second')
// fs.readFile('./hello.txt',(err,data)=>{
//     if(err){
//         console.log("Error reading file", err);
//     }else{
//         console.log("File content", data);
//     }
// })
// console.log(Buffer.from("a").toJSON());
// write file 
// fs.writeFile('./users.json',JSON.stringify([{id:1,name: "ahmed"}]),'utf8', (err)=>{
//     if(err){
//         console.log("Error writing file", err);
//     }else{
//         console.log("file written successfully");
//     }
// })

// delete file 

// fs.unlink('./users.json', (err)=>{
//     if(err){
//         console.log("Error deleting file", err);
//     }else{
//         console.log("file deleted successfully");
//     }
// })

// Streams [readable - writable]

// const rStream = fs.createReadStream('./hello.txt','utf8');
// const wStream = fs.createWriteStream('./stream.txt', 'utf-8')
// rStream.on('data', (chunk)=>{
//     console.log("====chunk======", chunk);
//     wStream.write("\n----chunk----");
//     wStream.write(chunk);
// })

const _ = require('lodash');
console.log("Hello from Cairo")