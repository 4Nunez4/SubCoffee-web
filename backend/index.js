import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import rutaOferta from "./src/routes/router.oferta.js";
import router from "./src/routes/routes.registro.js";
import routerDocument from "./src/routes/notificaciones.routes.js";
import routerChat from "./src/routes/chat.routes.js";
import rutasSubastas from "./src/routes/subasta.routes.js";
import rutasSeguimiento from "./src/routes/seguimiento.routes.js";
const app = express();




app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}));Poder trabajar con el formato json
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
