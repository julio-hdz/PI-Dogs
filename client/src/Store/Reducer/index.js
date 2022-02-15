import {
  giveOrderToDogs,
  filterDB,
  filterTemperament,
  CHANGE_ORDER,
  FETCH_ALL_DOGS,
  SEARCH_DOGS,
  FETCH_ALL_TEMPERAMENTS,
  FILTERDB,
  FILTER_TEMPERAMENT,
  RESET_FILTERS
} from "../constants";

const initialState = {
  originalDogs: [],
  filteredDogs: [],
  temperamentsList: [],
  filterBox: {
    order: "default",
    onlyDb: false,
    by: "default",
    temps: '',
  },
};

function reducer(state = initialState, action) {
  const dogsCopy = [...state.originalDogs];
  const onScreenDogs = [...state.filteredDogs];
  switch (action.type) {
    case FETCH_ALL_DOGS:
      if(state.filteredDogs.length==0){
        return {
          ...state,
          originalDogs: action.payload,
          filteredDogs: action.payload,
        };
      }else{
        return{...state}
      }
      
    case FETCH_ALL_TEMPERAMENTS:
      return { ...state, temperamentsList: action.payload };

    case SEARCH_DOGS:
      if(typeof(action.payload)=='string'){
        alert(action.payload);
        return{...state, filteredDogs: state.originalDogs}
      }
      return { ...state, filteredDogs: action.payload };

    case CHANGE_ORDER:
      let orderedDogs = giveOrderToDogs(action.payload, onScreenDogs);
      return { 
        ...state, 
        filterBox: { ...state.filterBox, order: action.payload },
         filteredDogs: orderedDogs };
      
    case RESET_FILTERS:
      return { ...state, filterBox: action.payload, filteredDogs: dogsCopy };


    case FILTERDB:
      if(action.payload){
        const db = filterDB(action.payload, onScreenDogs);
        return {
          ...state,
          filterBox: { ...state.filterBox, onlyDb: action.payload },
          filteredDogs: db,
        };
      }else{
        return {
          ...state,
          filterBox: { ...state.filterBox, onlyDb: action.payload },
          filteredDogs: dogsCopy,
        };

      }

    case FILTER_TEMPERAMENT:
      if(state.filterBox.onlyDb){
        return{
          ...state,
          filterBox: {...state.filterBox, temps: action.payload},
          filteredDogs: filterTemperament(action.payload, onScreenDogs)}
      }else{
        const filteredByTemp = filterTemperament(action.payload, dogsCopy);
        return {
          ...state,
          filterBox: {...state.filterBox, temps: action.payload},
          filteredDogs: filteredByTemp
         };
      }

    default:
      return { ...state };
  }
}
export default reducer;
