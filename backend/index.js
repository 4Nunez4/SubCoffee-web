import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import routerNotificaciones from "./src/routes/notificaciones.routes.js";
import routerPostulantes from "./src/routes/postulantes.routes.js";
import autenticacionRouter from "./src/routes/autenticacion.routes.js";

import routerUser from "./src/routes/user.routes.js";
import routerVereda from "./src/routes/veredas.routes.js";
import routerDepart from "./src/routes/departamento.routes.js"
import routerMunicipio from "./src/routes/municipio.routes.js"
import routerFinca from "./src/routes/finca.routes.js"
import routerVariedad from "./src/routes/variedad.routes.js"
import routertipovari from "./src/routes/tipovariedad.routes.js"
import routerOferta from "./src/routes/ofertas.routes.js";
import routerCalificaciones from "./src/routes/calificaciones.routes.js";
import routerSubasta from "./src/routes/subasta.routes.js";

const app = express();
app.use(cors());
const PORT = 4000

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", autenticacionRouter);
app.use("/v1", routerUser);
app.use("/v1", routerDepart);
app.use("/v1", routerVereda);
app.use("/v1", routerMunicipio);
app.use("/v1", routerFinca);
app.use("/v1", routertipovari);
app.use("/v1", routerVariedad);
app.use("/v1", routerSubasta);
app.use("/v1", routerNotificaciones);
app.use("/v1", routerPostulantes);
app.use("/v1", routerOferta);
app.use("/v1", routerCalificaciones);

app.set("view engine", "ejs");
app.set("views", "./view");
app.use(express.static('./public'))

app.get("/documents", (req, res) => {
  res.render("documentacion.ejs");
});

app.listen(PORT, () => {
  console.log("Servidor se esta ejecutando en el puerto: ", PORT);
}); 