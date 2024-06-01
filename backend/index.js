import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set("view engine", "ejs");

app.set("views", "./view");

app.use(express.static('./public'))

app.get("/documents", (req, res) => {
  res.render("documentacion.ejs");
});

app.listen(PORT, () => {
  console.log("Servidor se esta ejecutando en el puerto: ", PORT);
}); 