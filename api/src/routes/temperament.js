const { default: axios } = require("axios");
const { Router } = require("express");
const { Temperament } = require("../db");

const router = Router();
router.get('/', async (req, res, next)=>{
    try {
        const tempsDb = await Temperament.findAll({});
        res.json(tempsDb)
        
    } catch (error) {
        next(error)
    }

})
// router.post("/", async (req, res, next) => {
//   try {
//     let temperaments = [];
//     const respuesta = await axios
//       .get("https://api.thedogapi.com/v1/breeds")
//       .then((r) => r.data)
//       .then((array) => {
//         return array
//           .map((v) => {
//             return v.temperament ? v.temperament.split(", ") : null;
//           })
//           .filter((v) => {
//             return v !== null;
//           });
//       });
//     respuesta.forEach((v) => {
//       for (let animo of v) {
//         !temperaments.includes(animo.toLowerCase()) && temperaments.push(animo.toLowerCase());
//       }
//     });
//     temperaments.forEach((element) => {
//       let newTemp = Temperament.create({
//         name: element,
//       });
//     });
//     res.json(temperaments);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
