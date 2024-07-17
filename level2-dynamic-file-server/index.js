const http = require('http')
const fs = require("fs")

const server = http.createServer((req,res)=>{
    console.log('req.url',req.url)
    if(req.url=="/"){
        let data=fs.readdirSync("./","utf-8")
        console.log(data)
        res.writeHead(200,{
            "Content-Type":"text/html"
        })
        data.forEach((el,i)=>{
            res.write(`<a href= ${el}>${el}</a>`)

        })
        res.end()
    }else if(req.url != "/favicon.ico"){
        console.log("req.url in elseif", req.url)
        let data = fs.readFileSync(`.${req.url}`,"utf-8")
        res.end(data)
    }
})

server.listen(8585,()=>{
    console.log('server started')
})