import { createStore } from 'vuex'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {  
  getDocs, 
  collection, 
  doc, 
  //setDoc, 
  getDoc, 
  getFirestore,
   //deleteDoc
  } from "firebase/firestore";
// import {  
//   getAuth, 
//   signOut, 
//   signInWithEmailAndPassword
// } from "firebase/auth";
// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyAVJlSbSBMLK3lFnFLNsPIxE5C0ZFrJoFU",
  authDomain: "internet-shop-37493.firebaseapp.com",
  databaseURL: "https://internet-shop-37493-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "internet-shop-37493",
  storageBucket: "internet-shop-37493.appspot.com",
  messagingSenderId: "486324770247",
  appId: "1:486324770247:web:7263ac3ac6daeded2b75e2"
});

// Initialize Firebase
const DB = getFirestore(app);
//const AUTH = getAuth(app);
const Storage = getStorage();

function getDocFromDB (deskID, colID) {
  return getDoc(doc(DB, deskID, colID));
}

function getDataFromDB (colID) {
  return getDocs(collection(DB, colID))
}


export default createStore({
  state: {
    productsDB: [],
    product: [],
    productsForSearch: [],
    categoriesDB: [],
  },
  getters: {
    getCategoryNameForProduct (state, catProductId) {
      let cat = []
      catProductId.forEach(el => {
        for (let i = 0; i< state.categoriesDB.length; i++) {
          if (toString(el) === toString(state.categoriesDB[i].id)) {
            cat.push(state.categoriesDB[i].title)
          }
        }
      })
      return cat;
    },
    getProductsForSearch (state) {
      return state.productsForSearch;
    },
    getCategoriesFromDB (state) {
      return state.categoriesDB;
    },
    getProductsFromDB (state) {
      return state.productsDB;
    },
    getProduct (state) {
      return state.product;
    },
    getProductsForRender (state) {
       let index = 0;
       let paginatedProducts = [[]];
       for (let i = 0; i < state.productsDB.length; i++) {
        if (i % state.ProductsOnPage == 0 && i != 0) {
          index ++;
          paginatedProducts[index] = []
        }
        paginatedProducts[index].push(state.productsDB[i]);
      }
      return paginatedProducts;
    },
  },
  mutations: {
    ProductSearch (state, filteredProduct) {
      state.productsDB = filteredProduct;
    },
  },
  actions: {
    upload(context, file) {
      let storageRef = ref(Storage, 'products-images/' + file.name);
      uploadBytes(storageRef, file)
          .then(() => {
              console.log('done');
          });
          getDownloadURL(ref(Storage, 'products-images/' + file.name))
          .then((url) => {
            console.log(url);
          });
  },
    fetchProducts(context) {
      let products = [];
      getDataFromDB('Products')
        .then(data => {
          data.forEach(list => {
            products.push(list.data());
        });
        products.sort(function (a, b) {
          if ((a.title) > (b.title)) {
            return 1;
          }
          if ((a.title) < (b.title)) {
            return -1;
          }
        });
        console.log(products);
        context.state.productsForSearch = products;
        context.state.productsDB = products;
      })
    },
    fetchCategories(context) {
      getDataFromDB('Сategories')
        .then(data => {
          context.state.categoriesDB = [];
          data.forEach(list => {
            context.state.categoriesDB.push(list.data());
        });
        //console.log(context.state.categoriesDB);
      })
    },
    fetchProductFromID (context, ID) {
      return getDocFromDB ('Products', ID)
      .then(data => {
        context.state.product = [];
        context.state.product = data.data();
        console.log(context.state.product);
        })
      },
  },
  modules: {
  }
})
