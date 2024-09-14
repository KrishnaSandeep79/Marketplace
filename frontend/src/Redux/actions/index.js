import { Action } from "../constants";
export const fetchList = (searchData) => {
  return {
    type: Action.FETCH_DATA,
    data: searchData,
  };
};
export const storeListData = (result) => {
  return {
    type: Action.LIST_FETCHED,
    data: result,
  };
};
export const apiCalled = () => {
  return {
    type: Action.API_CALLED,
  };
};
export const fetchCategories = () => {
  return {
    type: Action.FETCH_CATEGORIES,
  };
};

export const addItemAction = (data) => {
  return {
    type: Action.ADD_ITEM,
    data: data,
  };
};
export const itemSuccess = (data) => {
  return {
    type: Action.SUCCESS,
    data: data,
  };
};


export const storeCategories = (result) => {
  return {
    type: Action.CATEGORIES_FETCHED,
    data: result,
  };
};
