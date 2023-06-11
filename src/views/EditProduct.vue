<template>
    <div class="wrop container">
        <h4><span class="text-muted">Edit Product </span> {{ EditProduct.title }}</h4>
        <div class=" container">
            <div class="row">
                <div class="col-8">
                    <div class="row">
                        <div class="col-3">
                            <p>Product Title</p>
                        </div>
                        <div class="col-9">
                            <textarea class="form-control" id="exampleFormControlTextarea1" 
                            v-model="EditProduct.title"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <p>Product Orders</p>
                        </div>
                        <div class="col-9">
                            <textarea class="form-control" id="exampleFormControlTextarea1" 
                            style="resize:none;"
                            rows="1" v-model="EditProduct.order"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <p>Item number</p>
                        </div>
                        <div class="col-9">
                            <textarea readonly class="form-control" 
                            style="resize:none;"
                            id="exampleFormControlTextarea1" 
                            rows="1" v-model="EditProduct.id"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <p>Short description</p>
                        </div>
                        <div class="col-9">
                            <textarea class="form-control" id="exampleFormControlTextarea1" 
                            v-model="EditProduct.short"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <p>Categories</p>
                        </div>
                        <div class="col-7" v-if="EditProduct.title">
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
                            <ModalDelCategory v-if="EditProduct.title" 
                            :categories="CatProduct" @DelCat="DelCategory"></ModalDelCategory>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-3">
                            <p>Prices</p>
                        </div>
                        <div class="col-3" v-if="!!EditProduct.title">
                            <textarea v-for="(item, index) in EditProduct.prices" :key="index"
                             class="form-control" 
                            style="resize:none;"
                            id="exampleFormControlTextarea1" 
                            rows="1" v-model="item.value"></textarea>  
                        </div>
                        <div class="col-4" v-if="!!EditProduct.title">
                            <textarea v-for="(item, index) in EditProduct.prices" :key="index"
                            readonly class="form-control" 
                            style="resize:none;"
                            id="exampleFormControlTextarea1" 
                            rows="1" v-model="item.unit"></textarea>  
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
                                <ModalDelPrice :prices="EditProduct.prices" @DelPrice="DelPrice"></ModalDelPrice>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="row">
                        <div class="col-6">      
                            <img :src="EditProduct.avatar" class="img-thumbnail img-fluid avatar-view" alt="">
                        </div>
                        <div class="col-6">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                                <button @click="StartUpload" class="btn btn-primary mr-md-2" 
                                type="button">Add Gallery</button>
                                <button @click="StartUploadGallary" class="btn btn-primary mr-md-2" 
                                type="button">Add avatar</button>
                            </div>
                            <input type="file" 
                                id="formFileMultiple" multiple
                                accept="image/*" style="display: none;"
                                ref="fileInput"
                                @change="onChange">
                            <input type="file" 
                                id="formFileMultiple" multiple
                                accept="image/*" style="display: none;"
                                ref="GalleryInput"
                                @change="onChange">
                            <div class="row">
                                <div class="col-12">
                                    <img class="pre-view" v-for="foto, index in EditProduct.gallery" :key="index" :src="foto"/>
                                    <img class="pre-view" :src="imageSrc" v-if="imageSrc"/>
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
                    rows="8" v-model="EditProduct.description"></textarea>
                </div>
            </div>
            <div class="row">
                <div clas="col-10">
                    <button type="button" 
                    @click="SaveProduct"
                    class="btn btn-primary btn-lg save">Dalete</button>
                    <router-link to="/" teg="button" type="button" 
                    class="btn btn-secondary btn-lg">Cancel</router-link>
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
        imageSrc: '',
        image: null,
        cat: '01',
        EditProduct: {},
        CancelProduct: {},
        price: null
        }
    },
    methods: {
        DelPrice (delUnit) {
           delete this.EditProduct.prices[delUnit.toLowerCase()];
        },
        AddNewPrice(newUnit, newValue) {
            if ((typeof this.EditProduct.prices[newUnit.toLowerCase()]) === "undefined") {
                this.EditProduct.prices[newUnit.toLowerCase()] = {
                unit: newUnit.toUpperCase(),
                value: newValue
                };
            }
            
        }, 
        DelCategory (data) {
            if ((this.EditProduct.category.indexOf(data)) != -1) {
                let index = this.EditProduct.category.indexOf(data);
                this.EditProduct.category.splice(index, 1);
            } 
        },
        SaveProduct () {
            console.log(this.EditProduct);
            
        },
        changeCategory (data) {
            this.cat = data;
            if ((this.EditProduct.category.indexOf(this.cat)) != -1) {
                console.log('alarm')
            } else {
                this.EditProduct.category.push(this.cat);
            }
        },
        StartUpload () {
            this.$refs.fileInput.click();
        },
        StartUploadGallary () {
            this.$refs.GalleryInput.click();
        },
        onChange (event) {
            let file = event.target.files[0]
            let reader = new FileReader()
            reader.onload = () => {
                this.imageSrc = reader.result
            }
            reader.readAsDataURL(file)
            this.image = file   
            this.$store.dispatch('upload', file);
        }
        
    },
    computed: {
        getCategories () {
            return this.$store.getters['getCategoriesFromDB'];
        },
        CatProduct () {
            let cat = []
            this.EditProduct.category.forEach(el => {
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
    this.EditProduct = this.$store.getters['getProduct'];
    this.CancelProduct = this.$store.getters['getProduct'];
  }
  
}

</script>