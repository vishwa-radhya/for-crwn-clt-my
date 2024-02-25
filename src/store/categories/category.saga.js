import {takeLatest,all,call,put} from 'redux-saga/effects';

import { getCategoriesAndDocuments 
} from '../../utils/firebase/firebase.utils';

import { fetchCategoriesSuccess,fetchCategoriesFailure } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';


export function* fetchCategoriesAsync(){
    try{
        //call keyword to turn it into a effect
        //pass call a callable method and parameters for that method
        //here we are saying call the getCate.. with categories parametrs
        const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
        // dispatch(fetchCategoriesSuccess(categoryArray));
        //cant call dispatch in generator we use put
        yield put(fetchCategoriesSuccess(categoriesArray));
    }catch(error){
        yield put(fetchCategoriesFailure(error));
    }
}

//sagas respond to actions, so whenever a action happens and i hear it,
//i want to to do something with it.
//now we need to create a generate that triggers a fetch
export function* onFetchCategories(){
    //take latest mean if you hear a bunch of action,give me the latest one.
    //two args 1.action type you respond to 2.what wants to happen
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync );
}


//the all call is essentially an effect that says run everything inside
//and only complete when all of it is done
//all takes a array of different functions or generates or whatever
//and it will wait until all of them completes before we continue
export function* categoriesSaga(){
    //listening it
    yield all([call(onFetchCategories)]);
}
//here our saga is listening for fetch_categories_start