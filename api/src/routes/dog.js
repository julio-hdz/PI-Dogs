const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament, Op } = require("../db");

const router = Router();

/////////////        GETS      ///////////////
router.get("/", async (req, res, next) => {
  const { name } = req.query;
  try {
    if (name) {
      let promiseDogAPI = await axios.get(
        "https://api.thedogapi.com/v1/breeds"
      );
      let dogDB = await Dog.findAll({
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
      let apiResponse = promiseDogAPI.data;
      const dogAPI = apiResponse
        .filter(
          (raza) => raza.name.toLowerCase().indexOf(name.toLowerCase()) == 0
        )
        .map((doggie) => {
          return {
            id: doggie.id,
            name: doggie.name,
            temperaments: doggie.temperament
              ? doggie.temperament.toLowerCase()
              : "No hay datos de su temperamento",
            weight: doggie.weight.metric,
            image: doggie.image.url,
          };
        });
      const allDog = [...dogDB, ...dogAPI];
      if (allDog.length > 0) {
        res.json(allDog);
      } else {
        res.json("La raza ingresada no existe").status(404);
      }
    } else {
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
              : "No hay datos de su temperamento",
            weight:
              doggie.weight.metric == "NaN"
                ? "20 - 30"
                : doggie.weight.metric.indexOf("NaN") > -1
                ? doggie.weight.metric[doggie.weight.metric.length - 1]
                : doggie.weight.metric,
            image: doggie.image.url,
          };
        });
        res.json([...dogDB, ...dogAPI]);
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id.length > 3) {
      let detailsDogDB = await Dog.findOne({
        where: {
          id,
        },
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      res.json(detailsDogDB);
    } else {
      const busquedaDogAPI = await axios.get(
        "https://api.thedogapi.com/v1/breeds/"
      );
      let detailsDogAPI = busquedaDogAPI.data.filter(
        (doggie) => doggie.id == id
      );
      const dogAPI = {
        name: detailsDogAPI[0].name,
        temperaments:
          detailsDogAPI[0].temperament.toLowerCase() || "No hay datos",
        weight: detailsDogAPI[0].weight.metric,
        height: detailsDogAPI[0].height.metric,
        life_span: detailsDogAPI[0].life_span,
        image: `https://cdn2.thedogapi.com/images/${detailsDogAPI[0].reference_image_id}.jpg`,
      };

      res.json(dogAPI);
    }
  } catch (e) {
    res.status(404).json("El id ingresado no existe");
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
    await newDoggo.addTemperaments(temperaments);
    res.json("Raza creada con éxito");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
