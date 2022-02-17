//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const  axios  = require("axios");
const server = require("./src/app.js");
const { conn, Temperament } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  //Precargar temperamentos
  try {
    const check = await Temperament.findAll();
    if (check.length < 1) {
      let temperaments = [];
      const arrayTemperamentos = await axios
      .get("https://api.thedogapi.com/v1/breeds")
      .then((r) => r.data)
      .then((array) => {
        return array.map((v) => {
          return v.temperament ? v.temperament.split(", ") : null})
          .filter((v) => {
            return v !== null;
          })
        })
      arrayTemperamentos.forEach((v) => {
          for (let animo of v) {
            !temperaments.includes(animo.toLowerCase()) &&
            temperaments.push(animo.toLowerCase());
          }
        });
        
      temperaments.forEach((element) => {
          let newTemp = Temperament.create({
            name: element,
          });
        });
      }
    } catch (error) {
      throw new Error('No se pudieron precargar los temperamentos desde la API')
    }
      server.listen(3001, () => {
        console.log("%s listening at 3001"); // eslint-disable-line no-console
      });
    });
    