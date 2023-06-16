<template>
    <div class="wrop container">
        <h4><span class="text-muted">Edit Product </span> {{ editProduct.title }}</h4>
        <div class=" container">
            <div class="row">
                <div class="col-8">
                    <div class="row">
                        <div class="col-3">
                            <p>Product Title</p>
                        </div>
                        <div class="col-9">
                            <textarea class="form-control" id="exampleFormControlTextarea1" 
                            v-model="editProduct.title"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <p>Product Orders</p>
                        </div>
                        <div class="col-9">
                            <textarea class="form-control" id="exampleFormControlTextarea1" 
                            style="resize:none;"
                            rows="1" v-model="editProduct.order"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <p>Item number</p>
                        </div>
                        <div class="col-9">
                            <div class="cat-container">{{ editProduct.id }}</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <p>Short description</p>
                        </div>
                        <div class="col-9">
                            <textarea class="form-control" id="exampleFormControlTextarea1" 
                            v-model="editProduct.short"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <p>Categories</p>
                        </div>
                        <div class="col-7" v-if="editProduct.category">
                            <div class="cat-container">
                                <span v-for="cat, index in CatProduct" :key="index" 
                                :data-id="cat.id">{{ cat.title }}, </span>
                            </div>   
                        </div>
                        
                        <div class="col-1">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-auto">
                                <button  class="btn btn-primary mr-md-2" type="button" 
                                data-bs-toggle="modal" data-bs-target="#exampleModalAdd">+</button>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-auto">
                                <button  class="btn btn-primary mr-md-2 btn-danger" type="button" 
                                data-bs-toggle="modal" data-bs-target="#exampleModalDel">X</button>
                            </div>
                            <ModalAddCategory :categories="getCategories" @AddCat="changeCategory"></ModalAddCategory>
                            <ModalDelCategory v-if="editProduct.title" 
                            :categories="CatProduct" @DelCat="DelCategory"></ModalDelCategory>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-3">
                            <p>Prices</p>
                        </div>
                        <div class="col-3" v-if="!!editProduct.prices">
                            <textarea v-for="(item, index) in editProduct.prices" :key="index"
                             class="form-control" 
                            style="resize:none;"
                            id="exampleFormControlTextarea1" 
                            rows="1" v-model="item.value"></textarea>  
                        </div>
                        <div class="col-4" v-if="!!editProduct.prices">
                            <div class="cat-container up-case" v-for="(item, index) in editProduct.prices" 
                            :key="index">{{ item.unit }}</div>
                        </div>
                        <div class="col-1">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-primary mr-md-2" data-bs-toggle="modal"
                                data-bs-target="#exampleModalAddPrice" type="button">+</button>
                                <ModalAddPrice @AddPrice="AddNewPrice"></ModalAddPrice>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-primary mr-md-2 btn-danger" data-bs-toggle="modal"
                                data-bs-target="#exampleModalDelPrice" type="button">X</button>
                                <ModalDelPrice :prices="editProduct.prices" @DelPrice="DelPrice"></ModalDelPrice>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="row">
                        <div class="col-6" v-if="!DawnloadAvatarURL.length">      
                            <img :src="editProduct.avatar" class="img-thumbnail img-fluid avatar-view" alt="">
                        </div>
                        <div class="col-6" v-if="!!DawnloadAvatarURL.length">      
                            <img :src="DawnloadAvatarURL" class="img-thumbnail img-fluid avatar-view" alt="">
                        </div>
                        <div class="col-6">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                                <button @click="StartUploadGallary" class="btn btn-primary mr-md-2" 
                                type="button">Add Gallery</button>
                                <button @click="StartUpload" class="btn btn-primary mr-md-2" 
                                type="button">Add avatar</button>
                            </div>
                            <input type="file" 
                                id="formFile"
                                accept="image/*" style="display: none;"
                                ref="fileInput"
                                @change="onChange($event, 1)">
                            <input type="file" 
                                id="formFileMultiple" multiple
                                accept="image/*" style="display: none;"
                                ref="GalleryInput"
                                @change="onChange($event, 2)">
                            <div class="row">
                                <div class="col-12">
                                    <img class="pre-view" v-for="foto, index in editProduct.gallery" :key="index" :src="foto"/>
                                    <div v-if="DawnloadURL"> 
                                        <img class="pre-view"  
                                    v-for="img, index in DawnloadURL" :key="index" :src="img"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2">
                    <p>Description</p>
                </div>
                <div class="col-10">
                    <textarea  name="editor" class="form-control" id="exampleFormControlTextarea1 editor" 
                    rows="8" v-model="editProduct.description"></textarea>
                </div>
            </div>
            <div class="row">
                <div clas="col-10">
                    <button type="button" 
                    @click="SaveProduct"
                    class="btn btn-primary btn-lg save">Save</button>
                    <router-link to="/" teg="button" type="button" 
                    class="btn btn-secondary btn-lg" @click="OnCancel">Cancel</router-link>
                </div>
            </div>
        </div> 
    </div>
  </template>

<script>

//import TextEditor from './EditProduct.vue'
//import Editor from '../components/JoditEditor.vue'
import ModalAddCategory from '../components/ModalAddCategory.vue'
import ModalDelCategory from '../components/ModalDelCategory.vue'
import ModalAddPrice from '../components/ModalAddPrice.vue'
import ModalDelPrice from '../components/ModalDelPrice.vue'


export default {
    name: 'EditProduct',
    components: {
        //Editor
        ModalAddCategory,
        ModalDelCategory,
        ModalAddPrice,
        ModalDelPrice
    },
    data: function() {
        return {
        id: this.$route.params.id,
        new: {
            category: [],
            gallery: [],
            prices: {
                uah:{
                    value: 0,
                    unit: 'uah'
                }
            },
        },
        imageSrc: [],
        image: null,
        cat: '01',
        editProduct: {},
        price: null,
        }
    },
    methods: {
        DelPrice (delUnit) {
           delete this.editProduct.prices[delUnit.toLowerCase()];
        },
        AddNewPrice(newUnit, newValue) {
            if ((typeof this.editProduct.prices[newUnit.toLowerCase()]) === "undefined") {
                this.editProduct.prices[newUnit.toLowerCase()] = {
                unit: newUnit.toLowerCase(),
                value: newValue
                }
            } else {
                console.log('Price Error')
            }
        }, 
        DelCategory (data) {
            if ((this.editProduct.category.indexOf(data)) != -1) {
                let index = this.editProduct.category.indexOf(data);
                this.editProduct.category.splice(index, 1);
            } 
        },
        OnCancel () {
            this.$store.commit('UrlUpdate');
        },
        SaveProduct () {
            this.DawnloadURL.forEach((el) => {
                this.editProduct.gallery.push(el)
            });
            if (this.DawnloadAvatarURL.length){
                this.editProduct.avatar = this.DawnloadAvatarURL;
            }
            if (!this.editProduct.id){
                this.editProduct.id = Date.now().toString();
            }
            console.log(this.editProduct);
            this.$store.dispatch('addProductToDB', this.editProduct)
            this.$store.commit('UrlUpdate');
            
        },
        changeCategory (data) {
            this.cat = data;
            if ((this.editProduct.category.indexOf(this.cat)) != -1) {
                console.log('Category Error')
            } else {
                this.editProduct.category.push(this.cat);
            }
        },
        StartUpload () {
            this.$refs.fileInput.click();
        },
        StartUploadGallary () {
            this.$refs.GalleryInput.click();
        },
        onChange (event, trig) {
            this.imageSrc = []
            let file = event.target.files
            for (let i = 0; i < file.length; i++) {
                let reader = new FileReader()
                reader.onload = () => {
                    this.imageSrc.push(reader.result)
                }
                reader.readAsDataURL(file[i])
            }
            this.image = file  
            let Post = {
                files: file,
                trigger: trig
            };
            this.$store.dispatch('upload', Post);
         }
        
    },
    computed: {
        DawnloadAvatarURL () {
            return this.$store.getters['getAvatarUrlFromState'];
        },
        DawnloadURL () {
            return this.$store.getters['getUrlFromState'];
        },
        getCategories () {
            return this.$store.getters['getCategoriesFromDB'];
        },
        CatProduct () {
            let cat = []
            this.editProduct.category.forEach(el => {
                for (let i = 0; i< this.getCategories.length; i++) {
                    if (el === this.getCategories[i].id) {
                        cat.push(this.getCategories[i])
                    }
                }
            })
            return cat
        }
    },
    created: function () {
    this.$store.dispatch('fetchProductFromID', this.id);
    this.$store.dispatch('fetchCategories');
  },
  beforeUpdate () {
    if (this.id != 'new') {
        this.editProduct = this.$store.getters['getProduct'];
    } else {
        this.editProduct = this.new;
    }
  }
  
}

</script>