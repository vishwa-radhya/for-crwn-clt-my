//it is where we should do our transformation bussiness logic,
//in firebase.utils we got the categories data from db and stored it in our reducer in a comfortable format
//as a categoriesmap but instaed of doing it there we should do it here in the selector to transform the doc into desired format
export const selectCategoriesMap=(state)=>
state.categories.categories.reduce((acc, category) => {
       const { title, items } = category;
       acc[title.toLowerCase()] = items;
       return acc;
     }, {});

