import express  from 'express';
import body_parser from 'body-parser';
import router from './src/routes/routes.registro.js';


const app = express()

app.use(body_parser.json())
app.use(body_parser.urlencoded({extends: false}))

app.set('view engine','ejs')
app.set('views','./views')

app.use(express.static('./public'))

app.get('/document', (req, res)=>{
    res.render('documentacionValentina.ejs')
})

app.use("/usuario", router)

app.listen(4000, () => {
    console.log("Connected on port: ");
}) 

