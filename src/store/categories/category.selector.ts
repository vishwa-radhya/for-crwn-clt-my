//it is where we should do our transformation bussiness logic,
//in firebase.utils we got the categories data from db and stored it in our reducer in a comfortable format
//as a categoriesmap but instaed of doing it there we should do it here in the selector to transform the doc into desired format
import { CategoryMap } from './category.types';
import {createSelector} from 'reselect';
//it memoizes the selectors where if inputs are same output
//should always be same
import { CategoriesState } from './category.reducer';

//first taking the categories slice
const selectCategoryReducer=(state):CategoriesState=>state.categories;
//this methodd creates a memoized selector which takes two args
//first is array of input selectors and second is an output selector

export const selectCategories = createSelector(
  //here the output of selectcategories is the arg of next op selector
  [selectCategoryReducer],
  (categoriesSlice)=> categoriesSlice.categories
  //here the func only runs when the categoriesSlice or selectCategories or
  //state.categories changes similarly we need to only reduce if its diff
  //in the below code
);


export const selectCategoriesMap= createSelector(
  [selectCategories],
  (categories):CategoryMap=>categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice)=>categoriesSlice.isLoading
);

