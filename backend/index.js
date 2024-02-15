import express from "express";
import bodyParser from 'body-parser';
// import rutasSubastas from "./src/routes/subasta.routes.js";
// import rutasSeguimiento from "./src/routes/seguimiento.routes.js";
import ejs from "ejs"; 

const app = express();

// app.use(rutasSubastas);
// app.use(rutasSeguimiento);




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
