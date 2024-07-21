const express = require('express')
const fs = require('fs')

const server = express()

const PORT = 3090

server.use(express.json())

const stringInArray = (arr)=>{
    let flag =true
    arr.forEach((ele)=>{
        if(typeof ele !=='string'){
            flag=false
            return false
        }
    })
    return flag    

}

const validateMiddle = (req, res, next) => {
    const { ID, Name, Rating, Description, Genre, Cast } = req.body;
    let errMsg =""
    if(typeof ID !== 'number' ){
        errMsg+="id must be number"
    }
    if(typeof Name !== 'string' ){
        errMsg+="id must be string"
    }
    if(typeof Rating !== 'number' ){
        errMsg+="id must be number"
    }
    if(typeof Description !== 'string' ){
        errMsg+="id must be string"
    }
    if(typeof Genre !== 'string' ){
        errMsg+="id must be string" 
    }
    if(!Array.isArray(Cast) || !stringInArray(Cast)){
        errMsg+='cast must be an array'
    }

    if(errMsg){
        
        fs.writeFileSync('./res.txt', errMsg,"utf-8")
        return res.status(400).json({
            message:"bad request.some data is incorrect",
            note:errMsg
        })
    }

     next()
}

server.post('/', validateMiddle,(req, res) => {
   res.status(200).json({message:'data received'})
})


server.listen(PORT, () => {
    console.log(`server startd on the ${PORT}`)
})
