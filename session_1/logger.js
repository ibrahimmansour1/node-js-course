console.log("this is logger file")
function log(message){
    console.log("this is message from logger", message);
}
// exports.add = (num1, num2)=>console.log(num1,num2);
// module.exports = {log,log2, log3};

export {log};