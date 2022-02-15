const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament, Op } = require("../db");

const router = Router();

/////////////        GETS      ///////////////
router.get("/", async (req, res, next) => {
  const { name } = req.query;
  if (name) {
    try {
      let promiseDogAPI = await axios
        .get("https://api.thedogapi.com/v1/breeds")
        .then((r) => r.data);
      let promiseDogDB = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: name + "%",
          },
        },
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      Promise.all([promiseDogAPI, promiseDogDB]).then((response) => {
        const [apiResponse, dogDB] = response;
        const dogAPI = apiResponse
          .map((doggie) => {
            return {
              id: doggie.id,
              name: doggie.name,
              temperaments: doggie.temperament
                ? doggie.temperament.toLowerCase()
                : "N/A",
              weight: doggie.weight.metric,
              image: doggie.image.url,
            };
          })
          .filter((doggie) => {
            return doggie.name.toLowerCase().indexOf(name.toLowerCase()) == 0;
          });
        const allDog = [...dogAPI, ...dogDB];
        if(allDog.length>0){
            res.json([...dogAPI, ...dogDB]);
        }else{
            res.json('La raza ingresada no existe').status(404)
        }
      });
    } catch (error) {
      next(error);
    }
  } else {
    try {
      let promiseDogDB = await Dog.findAll({
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      let promiseDogAPI = await axios
        .get("https://api.thedogapi.com/v1/breeds")
        .then((r) => r.data);
      Promise.all([promiseDogAPI, promiseDogDB]).then((response) => {
        const [apiResponse, dogDB] = response;
        const dogAPI = apiResponse.map((doggie) => {
          return {
            id: doggie.id,
            name: doggie.name,
            temperaments: doggie.temperament
              ? doggie.temperament.toLowerCase()
              : "N/A",
            weight: doggie.weight.metric=='NaN'? '20 - 30': doggie.weight.metric.indexOf('NaN')>-1? doggie.weight.metric[doggie.weight.metric.length-1] : doggie.weight.metric ,
            image: doggie.image.url,
          };
        });
        res.json([...dogAPI, ...dogDB]);
      });
    } catch (error) {
      next(error);
    }
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (id.length > 3) {
    try {
      let detailsDog = await Dog.findOne({
        where: {
          id,
        },
      });
      res.json(detailsDog);
    } catch (e) {
      next(e);
    }
  } else {
    try {
      const detailsDog =  await axios
        .get("https://api.thedogapi.com/v1/breeds/" + id)
        .then((r) => {
            return (
              r.data.name?
              {
              name: r.data.name,
              temperaments: r.data.temperament
                ? r.data.temperament.toLowerCase()
                : "No hay datos",
              weight: r.data.weight.metric,
              height: r.data.height.metric,
              life_span: r.data.life_span,
              image: `https://cdn2.thedogapi.com/images/${r.data.reference_image_id}.jpg`,
              }: null
            )
        });
        res.json(detailsDog)
    }catch (error) {
      next(error);
    }
  }
});

///////////////     POST    ///////////////////
router.post("/", async (req, res, next) => {
  const { name, weight, height, life_span, image, temperaments } = req.body;
  try {
    let newDoggo = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
      
    });
    await newDoggo.addTemperaments(temperaments)
    res.send(newDoggo);
  } catch (error) {
    next(error);
  }
});

//////////////////////////////////////////////

module.exports = router;
