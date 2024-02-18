import express from "express";
import bodyParser from "body-parser";
<<<<<<< HEAD
import postulacionRoutes from "./src/routes/postulacion.routes.js";
import variedadesRoute from "./src/routes/variedades.routes.js";
import ejs from 'ejs' 

const app = express();


app.use("/postulacion", postulacionRoutes);
app.get("/variedad", variedadesRoute);
=======
import ejs from "ejs";
import rutaOferta from "./src/routes/router.oferta.js";
import router from "./src/routes/routes.registro.js";
import routerDocument from "./src/routes/notificaciones.routes.js";
import routerChat from "./src/routes/chat.routes.js";
import rutasSubastas from "./src/routes/subasta.routes.js";
import rutasSeguimiento from "./src/routes/seguimiento.routes.js";
const app = express();


>>>>>>> db1e87c6a4f80b920dbe4972081a638c4f21d56d


// app.use(express.json());
app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}));Poder trabajar con el formato json
// app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use("/subasta",rutasSubastas);
app.use("/segimiento",rutasSeguimiento);
app.use("/subcoffee", rutaOferta);
app.use("/usuario", router);
app.use("/user", routerChat);
app.use("/user", routerDocument);

app.set("view engine", "ejs");
app.set("views", "./view");

app.get("/documents", (req, res) => {
  res.render("documentacion.ejs");
});
app.listen(4000, () => {
  console.log("Servidor se esta ejecutando en el puerto 4000");
});
