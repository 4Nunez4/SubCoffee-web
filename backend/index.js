import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import rutNotificaciones from "./src/routes/notificaciones.routes.js";
import routerChat from "./src/routes/chat.routes.js";
import rutasSubastas from "./src/routes/subasta.routes.js";
import postulantesRoutes from "./src/routes/postulantes.routes.js";
import autenticacionRouter from "./src/routes/autenticacion.routes.js";
import cors from 'cors';

import routerUser from "./src/routes/user.routes.js";
import routerVereda from "./src/routes/veredas.routes.js";
import routerDepart from "./src/routes/departamento.routes.js"
import routerMunicipio from "./src/routes/municipio.routes.js"
import routerFinca from "./src/routes/finca.routes.js"
import routerVariedad from "./src/routes/variedad.routes.js"
import routertipovari from "./src/routes/tipovariedad.routes.js"
import ofertasRoutes from "./src/routes/ofertas.routes.js";

const app = express();
app.use(cors());
// app.use(cors());

app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}));Poder trabajar con el formato json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/auth", autenticacionRouter)
app.use("/v1", routerUser);
app.use("/v1", routerDepart);
app.use("/v1", routerVereda);
app.use("/v1", routerMunicipio);
app.use("/v1", routerFinca);
app.use("/v1", routerVariedad);
app.use("/v1", routertipovari);
app.use("/subasta",rutasSubastas);
app.use("/user", routerChat);
app.use("/v1", rutNotificaciones);
app.use("/postulantes", postulantesRoutes);
app.use("/v1", ofertasRoutes);

app.set("view engine", "ejs");

app.set("views", "./view");

app.use(express.static('./public'))

app.get("/documents", (req, res) => {
  res.render("documentacion.ejs");
});

app.listen(4000, () => {
  console.log("Servidor se esta ejecutando en el puerto 4000");
}); 