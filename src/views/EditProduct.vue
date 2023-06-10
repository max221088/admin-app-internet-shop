<template>
    <div class="wrop container">
        <h4><span class="text-muted">Edit Product</span> {{ product.title }}</h4>
        <div class=" container">
            <div class="row">
                <div class="col-8">
                    <div class="row">
                        <div class="col-3">
                            <p>Product Title</p>
                        </div>
                        <div class="col-9">
                            <textarea class="form-control" id="exampleFormControlTextarea1" 
                            v-model="product.title"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <p>Product Orders</p>
                        </div>
                        <div class="col-9">
                            <textarea class="form-control" id="exampleFormControlTextarea1" 
                            style="resize:none;"
                            rows="1" v-model="product.order"></textarea>
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
                            rows="1" v-model="product.id"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <p>Short description</p>
                        </div>
                        <div class="col-9">
                            <textarea class="form-control" id="exampleFormControlTextarea1" 
                            v-model="product.short"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <p>Categories</p>
                        </div>
                        <div class="col-8">
                            <select class="form-select">
                                <option v-for="(item, index) in getCategories" :key="index">{{ item.title }}</option>  
                            </select>
                        </div>
                        <div class="col-1">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-primary mr-md-2" type="button">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <p>Prices</p>
                        </div>
                        <div class="col-4" v-if="!!product.title">
                            <textarea v-for="(item, index) in product.prices" :key="index"
                             class="form-control" 
                            style="resize:none;"
                            id="exampleFormControlTextarea1" 
                            rows="1" v-model="item.value"></textarea>  
                        </div>
                        <div class="col-4" v-if="!!product.title">
                            <textarea v-for="(item, index) in product.prices" :key="index"
                            readonly class="form-control" 
                            style="resize:none;"
                            id="exampleFormControlTextarea1" 
                            rows="1" v-model="item.unit"></textarea>  
                        </div>
                        <div class="col-1">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-primary mr-md-2" type="button">+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="row">
                        <div class="col-6">      
                            <img :src="product.avatar" class="img-thumbnail img-fluid avatar-view" alt="">
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
                                    <img class="pre-view" v-for="foto, index in product.gallery" :key="index" :src="foto"/>
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
                    rows="8" v-model="product.description"></textarea>
                </div>
            </div>
        </div> 
    </div>
  </template>

<script>

//import TextEditor from './EditProduct.vue'
//import Editor from '../components/JoditEditor.vue'


export default {
    name: 'EditProduct',
    components: {
        //Editor
    },
    data: function() {
        return {
        id: this.$route.params.id,
        imageSrc: '',
        image: null
        }
    },
    methods: {
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
        product () {
        return this.$store.getters['getProduct'];
    },
    getCategories () {
          return this.$store.getters['getCategoriesFromDB'];
        },
    },
    created: function () {
    this.$store.dispatch('fetchProductFromID', this.id);
    this.$store.dispatch('fetchCategories');
  }
}

</script>