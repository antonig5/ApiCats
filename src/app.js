const express = require('express')

const app = express()
app.use(express.json());
let cats =[ ]

//peticion get
app.get("/cats", (req, res) => {
  res.json(cats);
});
///filtro por id
app.get("/cats/:id", (req, res)=>{
   //compara el id existente con el parametro
  const cat = cats.find((i) => i.id === parseInt(req.params.id));
  if (!cat) {
    res.status(404).json({ message: "Gato no encontrado" });
  } else {
    res.json(cat);
  }
})
//peticion post
app.post("/cats", (req, res) => {
  //crea un objeto con las propiedades id y name
  const newCats = {
    id: cats.length + 1,
    name: req.body.name
  };
  //agrega un nuevo objeto al final del arreglo cats
  cats.push(newCats);
  res.status(200).json({data: newCats, message: 'creado corectamente'});
});
//peticion put
app.put("/cats/:id", (req, res) => {
  //compara el id existente con el parametro
  const CatIndex = cats.findIndex((i) => i.id === parseInt(req.params.id));
  if (CatIndex === -1) {
    res.status(404).json({ message: "Gato no encontrado" });
  } else {
    //(spread)... crea un objeto con las propiedades que existen y las que se envian
    cats[CatIndex] = { ...cats[CatIndex], ...req.body };
    //envia una respuesta con las propiedades actualizadas
    res.json(cats[CatIndex]);
  }
});
/// peticion delete
app.delete("/cats/:id", (req, res)=>{
  const CatIndex = cats.findIndex((i) => i.id === parseInt(req.params.id));
  // si CatIndex es igual en valor y tipo
  if (CatIndex === -1) {
    res.status(404).json({ message: "Gato no encontrado" });
  } else {
    const deletedCat = cats.splice(CatIndex, 1);
    res.json(deletedCat);
  }
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
  