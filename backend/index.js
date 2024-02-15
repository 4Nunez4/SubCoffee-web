import express from "express";
import bodyParser from 'body-parser';
import postulacionesrouter from "./src/routes/postulacion.routes";
import variedadesRoute from "./src/routes/variedades.routes";
import ejs from "ejs"; 

const app = express();


app.get('/postulacion', postulacionesrouter);
app.get('/variedad', variedadesRoute);


app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}));Poder trabajar con el formato json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set ('view engine','ejs');
app.set('views','./view');


app.get('/documents', (req,res) =>{
    res.render('documentacion.ejs');
});


app.listen(4000, () => {
    console.log("Servidor se esta ejecutando en el puerto 4000");
});
