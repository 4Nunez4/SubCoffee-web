import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import rutaProduccion from "./src/routes/router.produccion.js";
import router from "./src/routes/routes.registro.js";
import routerDocument from "./src/routes/notificaciones.routes.js";
import routerChat from "./src/routes/chat.routes.js";
import rutasSubastas from "./src/routes/subasta.routes.js";
import rutasSeguimiento from "./src/routes/seguimiento.routes.js";
import postulacionRoutes from "./src/routes/postulacion.routes.js";
import variedadesRoute from "./src/routes/variedades.routes.js";
import FincaRouter from "./src/routes/finca.routes.js";
import autenticacionRouter from "./src/routes/autenticacion.routes.js";

const app = express();


app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}));Poder trabajar con el formato json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/finca",FincaRouter);
app.use("/subasta",rutasSubastas);
app.use("/seguimiento",rutasSeguimiento);
app.use("/produccion", rutaProduccion);
app.use("/usuario", router);
app.use("/user", routerChat);
app.use("/user", routerDocument);
app.use("/postulacion", postulacionRoutes);
app.use("/variedad", variedadesRoute);
app.use(autenticacionRouter)

app.set("view engine", "ejs");
app.set("views", "./view");

app.get("/documents", (req, res) => {
  res.render("documentacion.ejs");
});
app.listen(4000, () => {
  console.log("Servidor se esta ejecutando en el puerto 4000");
});