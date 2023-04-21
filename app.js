//Cargar ambiente .env
require('dotenv').config()


const express = require('express')
const fridgesRouter = require('./src/routers/fridgesRouter')

const app = express()

//Indicar donde esta el contenido
app.use(express.static('public'))

//Indicar donde estan kas vistas
app.set('views','./src/views')
app.set('view engine','ejs')

//Urls codificadas y utiliza JSON
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Importamos el archivo de rutas
app.use('/fridges', fridgesRouter)

//Traemos el archivo port 

const PORT  = process.env.PORT

app.get('/', (req, res) => {
    // res.send('Hello word from express')
    res.render('index',{
        title: "Programación web 2 - By: MCC"
    })

})

app.listen(PORT, ()=>{
    console.log(`${process.env.APP_NAME} is running on
    port ${process.env.PORT}`);
})
