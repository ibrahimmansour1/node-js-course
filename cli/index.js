#!/usr/bin/env node
import {Command} from 'commander';
import inquirer from "inquirer";
import fs from 'fs';
const program = new Command();
const questions = [
    {
        type: 'input',
        name: 'programming',
        message: 'please enter course title: '
    },
    { 
        type: 'number',
        name: 'price',
        message: 'please enter course price: '
    }
];
const filePath = './courses.json';
program.name('mansour-courses').description('mansour-courses to add course').version('1.0.0');
program
.command('add')
.alias('a')
.description('add a service')
.action((param, option)=>{
inquirer
.prompt(questions).then((answers)=>{
    console.log(answers);
    if(fs.existsSync(filePath)){
        fs.readFile(filePath, 'utf-8',(err, fileContent)=>{
            if(err){
                console.log("error reading file", err);
                process.exit();
            }else{
                console.log("file read successfully", fileContent);
                const fileContentAsJson = JSON.parse(fileContent);
                fileContentAsJson.push(answers);
                fs.writeFile(filePath, JSON.stringify(fileContentAsJson),'utf-8', ()=>{
                    console.log("add courses done");
                    
                })
            }
        })
    }else{
        fs.writeFile(filePath, JSON.stringify([answers]),'utf-8', ()=>{
            console.log("add courses done");
            
        })
    }
})

});

program
.command('list')
.alias('l')
.description('List all courses')
.action(()=>{
    fs.readFile(filePath, 'utf-8',(err,content)=>{
        if(err){
            console.log("error reading file", err);
            process.exit();
        }
        console.table(JSON.parse(content));
    })
})
program.parse(process.argv);