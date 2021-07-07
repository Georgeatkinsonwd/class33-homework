const express = require('express')
const app = express()
const PORT = 8000
const MongoClient = require('mongodb').MongoClient

let db,
    dbConnectionStr = 'mongodb+srv://george:wackoacko1994@cluster0.7hspw.mongodb.net/rap-list?retryWrites=true&w=majority'
    dbName = 'rap'

    
MongoClient.connect(dbConnectionStr,{
    useUnifiedTopology: true
}) .then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.get('/',(request, response)=>{
     db.collection('rap-list').find().toArray()
     .then(data => {
         response.render('index.ejs', { info: data })
        })
        .catch(error => console.error(error))
    })


app.post('/addRapper',(request,response)=>{
    db.collection('rap-list').insertOne(request.body)
    .then(result => {
        console.log('Rapper Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteRapper', (request,response)=>{
    db.collection('rap-list').deleteOne({stageName: request.body.stageNameS})
    .then(result =>{
        console.log('Rapper Deleted')
        response.json('Rapper Deleted')
    })
    .catch(error=>console.error(error))
})



app.listen(PORT, function(){
console.log(`server running on PORT ${PORT}`)
})

