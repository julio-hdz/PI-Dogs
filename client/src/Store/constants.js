export const FETCH_ALL_DOGS = "FETCH_ALL_DOGS";
export const CHANGE_ORDER = "CHANGE_ORDER";
export const SEARCH_DOGS = "SEARCH_DOGS";
export const FETCH_ALL_TEMPERAMENTS = "FETCH_ALL_TEMPERAMENTS";
export const FILTERDB = "FILTERDB";
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const RESET_FILTERS = "RESET_FILTERS";

export const FILTERDEFAULT = {
  order: "default",
  onlyDb: false,
  by: "default",
  temps: "default",
};
////////////////////////////////////////////////////////
////////////////// FUNCIONES UTILES ////////////////////
////////////////////////////////////////////////////////


///////////////////// API OR DB ////////////////
export function filterDB(onlyDb, filteredDogs) {
  if (onlyDb) {
    return filteredDogs.filter((v) => {
      return typeof v.id == "string";
    });
  }
  return filteredDogs;
}

///////////////////// TEMPERAMENTS ////////////////

export function filterTemperament(temperamento, originalDogs) {
  if (temperamento !== "default") {
    return originalDogs.filter((v) => {
      return v.id.length > 5
      ? v.temperaments.map((animo) => {return animo.name}).includes(temperamento)
      : v.temperaments.indexOf(temperamento)>-1;
    });
  }
  return originalDogs
}

///////////////////// ORDER ////////////////
export function giveOrderToDogs(order, filteredDogs ) {
  if(order==='z/a'|| order ==='a/z'){
    return filteredDogs.sort((a,b)=>{
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if(nameA<nameB){
        return order==='a/z'? -1:1;
      }
      
      if(nameA>nameB){
        return order==='a/z'? 1:-1;
      }
      return 0;
    })
  }else{
    return filteredDogs.sort((a,b)=>{
      const weightsA = a.weight.split(' - ').map((peso)=>Number(peso));
      const weightsB = b.weight.split(' - ').map((peso)=>Number(peso));
      if(weightsA.length<2){
        weightsA.unshift(0)
      }
      if(weightsB.length<2){
        weightsB.unshift(0)
      }      
      if(weightsA[1]<weightsB[1]){
        return order==='pesoAsc'? -1:1;
      }
      if(weightsA[1]>weightsB[1]){
        return order==='pesoAsc'? 1:-1;
      }
      if(weightsA[0]>weightsB[0]){
        return order==='pesoAsc'? 1:-1;
      }
      if(weightsA[0]<weightsB[0]){
        return order==='pesoAsc'? -1:1;
      }
      return 0;
      
    })
  }
}

////////////////////////////////////////////////
