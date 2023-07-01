import { createStore } from 'vuex'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {  
  getDocs, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getFirestore,
  deleteDoc
  } from "firebase/firestore";
 import {  
   getAuth, 
   signOut, 
   signInWithEmailAndPassword
 } from "firebase/auth";

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
const AUTH = getAuth(app);
const Storage = getStorage();

function getDocFromDB (deskID, colID) {
  return getDoc(doc(DB, deskID, colID));
}

function getDataFromDB (colID) {
  return getDocs(collection(DB, colID))
}


export default createStore({
  state: {
    isLogin: false,
    productsDB: [],
    product: [],
    productsForSearch: [],
    categoriesDB: [],
    url: [],
    avatarUrl: [],
    usersForSearch: [],
    usersDB: [],
    articlsDB: [],
    ordersForSearch: [],
    ordersDB: [],
    order: [],
    userData: [],
    userOrders: []

  },
  getters: {
    getUserOrders (state) {
      return state.userOrders;
    },
    getUserData (state) {
      return state.userData;
    },
    getIsLogin (state) {
      return state.isLogin;
    },
    getOrderDB (state) {
      return state.order;
    },
    getOrdersForSearch (state) {
      return state.ordersForSearch;
    },
    getOrdersDB (state) {
      return state.ordersDB;
    },
    getCatName (state, id) {
      for (let i = 0; i < state.categoriesDB.length; i++) {
        if (state.categoriesDB[i].id === id) {
          return state.categoriesDB[i].title
        }
      }
    },
    getArticlsDB (state) {
      return state.articlsDB;
    },
    getUsersForSearch (state) {
      return state.usersForSearch;
    },
    getUsersDB (state) {
      return state.usersDB;
    },
    getAvatarUrlFromState (state) {
      return state.avatarUrl;
    },
    getUrlFromState (state) {
      return state.url;
    },
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
    userOrdersFilter (state, filteredOrders) {
      state.userOrders = filteredOrders;
    },
    UrlDel (state, index) {
      state.url.splice(index, 1)
    },
    UrlUpdate (state) {
      state.url = []
      state.avatarUrl = []
    },
    ordersSearch (state, filteredOrders) {
      state.ordersDB = filteredOrders;
    },
    ProductSearch (state, filteredProduct) {
      state.productsDB = filteredProduct;
    },
    UsersSearch (state, filteredUser) {
      state.usersDB = filteredUser;
    },
  },
  actions: {
    fetchUsersOrders (context, ordersID) {
      context.state.userOrders = [];
      if (ordersID) {
      for (let i = 0; i < ordersID.length; i++) {
        getDocFromDB ('Orders', ordersID[i])
        .then(data => {
          context.state.userOrders.push(data.data());
          })
        }
      }
    },
    fetchUserFromID (context, ID) {
      return getDocFromDB ('Users', ID)
      .then(data => {
        context.state.userData = [];
        context.state.userData = data.data();
        if (context.state.userData.role === 'admin'){
          context.state.isLogin = true;
        } else {
          alert('wrong login or password')
        }
      })
    },
    logout () {
      signOut(AUTH)
        .then()
    },
    login (context, userCred) {
      signInWithEmailAndPassword(AUTH, userCred.email, userCred.pass) 
        .then((Credential) => {
          context.dispatch('fetchUserFromID', Credential.user.uid);
            window.sessionStorage.setItem('login', JSON.stringify(userCred));
        })
        .catch((error) => {
          alert(error.message);
        })
    },
    addOrderToDB (context, order) {
      return setDoc(doc(DB, 'Orders', order.id), order);
    },
    fetchOrderFromID (context, ID) {
      return getDocFromDB ('Orders', ID)
      .then(data => {
        context.state.order = [];
        context.state.order = data.data();
        })
      },
    fetchOrders(context) {
      let orders = [];
      getDataFromDB('Orders')
        .then(data => {
          data.forEach(list => {
            orders.push(list.data());
        });
        orders.sort(function (a, b) {
          if ((a.id) < (b.id)) {
            return 1;
          }
          if ((a.id) > (b.id)) {
            return -1;
          }
        });
        context.state.ordersForSearch = orders;
        context.state.ordersDB = orders;
      })
    },
    deleteCategoryInDB (context, ID) { 
      return deleteDoc(doc(DB, 'Сategories', ID))
    },
    updateCategoryInProducts (context, products) {
      for (let i = 0; i < products.length; i++) {
         setDoc(doc(DB, 'Products', products[i].id), products[i]);
      }
    },
    addCategoryToDB (context, category) {
      return setDoc(doc(DB, 'Сategories', category.id), category);
    },
    addProductToDB (context, product) {
      return setDoc(doc(DB, 'Products', product.id), product);
    },
    addArticleToDB (context, EditArticle) {
      return setDoc(doc(DB, EditArticle.chapter, EditArticle.Update.id), EditArticle.Update);
    },
    deleteArticleToDB (context, EditArticle) {
      return deleteDoc(doc(DB, EditArticle.chapter, EditArticle.id));
    },
    deleteProductInDB (context, ID) {  
      return deleteDoc(doc(DB, 'Products', ID))
    },
    delImg(context, img) {
      for (let i = 0; i < img.length; i++) {
      let storageRef = ref(Storage, img[i]);
      deleteObject(storageRef)
          .then();
        }
    },
    upload(context, post) {
      for (let i = 0; i < post.files.length; i++) {
      let storageRef = ref(Storage, 'products-images/' + post.id + "/" + post.files[i].name);
      uploadBytes(storageRef, post.files[i])
          .then(() => {
              getDownloadURL(ref(Storage, 'products-images/' + post.id + "/" + post.files[i].name))
              .then((url) => {
                if (post.trigger == 1) {
                  context.state.avatarUrl = url;
                }
                if (post.trigger == 2) {
                  context.state.url.push(url);
                }
              });
          });
        }
      
    },
    fetchArticlesID (context, ID) {
      return getDocFromDB ('Info', ID)
      .then(data => {
        let articls = [];
        context.state.order = [];
        articls = data.data();
        articls.sort(function (a, b) {
          if ((a.order) > (b.order)) {
            return 1;
          }
          if ((a.order) < (b.order)) {
            return -1;
          }
        });
        context.state.articlsDB = articls;
        })
      },
    fetchArticls(context, info) {
      let articls = [];
      getDataFromDB(info)
        .then(data => {
          data.forEach(list => {
            articls.push(list.data());
        });
        articls.sort(function (a, b) {
          if (Number(a.order) > Number(b.order)) {
            return 1;
          }
          if (Number(a.order) < Number(b.order)) {
            return -1;
          }
        });
        context.state.articlsDB = articls;
      })
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
        context.state.productsForSearch = products;
        context.state.productsDB = products;
      })
    },
    fetchUsers(context) {
      let users = [];
      getDataFromDB('Users')
        .then(data => {
          data.forEach(list => {
            users.push(list.data());
        });
        users.sort(function (a, b) {
          if ((a.name) > (b.name)) {
            return 1;
          }
          if ((a.name) < (b.name)) {
            return -1;
          }
        });
        context.state.usersForSearch = users;
        context.state.usersDB = users;
      })
    },
    fetchCategories(context) {
      getDataFromDB('Сategories')
        .then(data => {
          context.state.categoriesDB = [];
          data.forEach(list => {
            context.state.categoriesDB.push(list.data());
        });
      })
    },
    fetchProductFromID (context, ID) {
      return getDocFromDB ('Products', ID)
      .then(data => {
        context.state.product = [];
        context.state.product = data.data();
        })
      },
  },
  modules: {
  }
})
