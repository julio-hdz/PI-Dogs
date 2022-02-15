import axios from "axios";
import {
  FETCH_ALL_DOGS,
  SEARCH_DOGS,
  CHANGE_ORDER,
  FETCH_ALL_TEMPERAMENTS,
  FILTERDB,
  FILTER_TEMPERAMENT,
  RESET_FILTERS,
  FILTERDEFAULT
} from "../constants";

export function fetchAllDogs() {
  return function (dispatch) {
    axios.get("http://localhost:3001/api/dogs").then((r) => {
      dispatch({
        type: FETCH_ALL_DOGS,
        payload: r.data,
      });
    });
  };
}

export function searchDogs(search) {
  return function (dispatch) {
    axios.get("http://localhost:3001/api/dogs?name=" + search).then((r) => {
      dispatch({
        type: SEARCH_DOGS,
        payload: r.data,
      });
    });
  };
}

export function changeOrder(order) {
  return {
    type: CHANGE_ORDER,
    payload: order,
  };
}

export function fetchAllTemperaments() {
  return function (dispatch) {
    axios.get("http://localhost:3001/api/temperament").then((r) => {
      dispatch({
        type: FETCH_ALL_TEMPERAMENTS,
        payload: r.data,
      });
    });
  };
}
export function filterDB(onlyDb){
  return{
    type: FILTERDB,
    payload: onlyDb
    
  }
}
export function filterTemp(temp){
  return{
    type: FILTER_TEMPERAMENT,
    payload: temp
    
  }
}
export function resetFilters(){
  return{
    type: RESET_FILTERS,
    payload: FILTERDEFAULT
        
  }
}
