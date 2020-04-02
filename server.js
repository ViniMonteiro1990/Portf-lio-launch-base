const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine","njk")

nunjucks.configure("views", {
    express:server,
    autoescape:false,
    noCache:true
})

// get para pegar algo na tela,req para qdo receber algo do usuario e res para responder algo
server.get("/",function(req,res){
    const about = {
        avatar_url:"https://avatars3.githubusercontent.com/u/6643122?s=460&v=4",
        name:"Mayk Brito",
        role:"Instrutor - Rocketseat",
        description:'Programador full-stack, focado em trazer o melhor conteudo para iniciantes em programação. Colaborador da <a href="https://rocketseat.com.br/" target="_blank">RocketSeat</a>',
        links:[
            {name:"Github",url:"http://github.com/maykbrito/"},
            {name:"Twitter",url:"http://twitter.com/maykbrito"},
            {name:"Linkdin",url:"http://www.linkedin.com/in/maykbrito/"}     
        
        ]
    }
    return res.render("about",{about})
})

server.get("/portfolio",function(req,res){
    return res.render("portfolio",{ items:videos })
})

server.get("/video",function(req,res){
    const id = req.query.id
    
    const video = videos.find(function(video){
        return video.id == id
    })
    if (!video){
        return res.send("Video not found!")
    }
    return res.render("video",{item: video })
})

server.listen(5000,function(){
    console.log("server is running")
})