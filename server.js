const express=require('express');
const hbs=require('hbs');
var app=express();
var fs=require('fs');
const part1=process.env.PORT;

app.set('view Engine','hbs');
hbs.registerPartials(__dirname+'/views/partials')
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
var now=new Date().toString();
var log=now+req.method+req.url
fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
        console.log("Unable to append to server.log");
    }
});
next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
//     });

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('upperCase',(text)=>{
    return text.toUpperCase();
})

app.get('/',(req,res)=>{
   // res.send('Hello Express!')
   res.render('home.hbs',{
    pageTitle:'New Page',
    welcome:'Welcome to node js',
   });
    })

    app.get('/about',(req,res)=>{
       res.render('about.hbs',{
        pageTitle:'About Page',  
       });
        })
app.get('/bad',(req,res)=>{
    res.send({ErrorMessage:'Bad request'})
})


app.listen(part1,()=>{
    console.log("Server is running "+part1);
});