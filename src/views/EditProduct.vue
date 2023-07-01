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
                                <span v-for="cat, index in catProduct" :key="index" 
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
                            :categories="catProduct" @DelCat="delCategory"></ModalDelCategory>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-3">
                            <p>Price</p>
                        </div>
                        <div class="col-3" v-if="!!editProduct.price">
                            <textarea 
                             class="form-control" 
                            style="resize:none;"
                            id="exampleFormControlTextarea1" 
                            rows="1" v-model="editProduct.price.value"></textarea>  
                        </div>
                        <div class="col-4" v-if="!!editProduct.price">
                            <div class="cat-container up-case" >{{ editProduct.price.unit }}</div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="row">
                        <div class="col-6" v-if="!dawnloadAvatarURL.length">      
                            <img :src="editProduct.avatar" class="img-thumbnail img-fluid avatar-view" >
                        </div>
                        <div class="col-6" v-if="!!dawnloadAvatarURL.length">      
                            <img :src="dawnloadAvatarURL" class="img-thumbnail img-fluid avatar-view" >
                        </div>
                        <div class="col-6">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                                <button @click="startUploadGallary" class="btn btn-primary mr-md-2" 
                                type="button">Add Gallery</button>
                                <button @click="startUpload" class="btn btn-primary mr-md-2" 
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
                                <div class="col-12 col-gallery">
                                    <div class="img-icon" v-for="foto, index in editProduct.gallery" :key="index">
                                        <img class="pre-view"  :src="foto"/>
                                        <img @click="delImgEdit(index)" class="del-img-btn" :data-id="index" src='../assets/img/remove_icon.svg'/>
                                    </div>
                                    <div class="col-gallery" v-if="dawnloadURL"> 
                                        <div class="img-icon" v-for="img, index in dawnloadURL" :key="index">
                                            <img class="pre-view"  :src="img"/>
                                        <img @click="delImgPreLoad(index)" class="del-img-btn" :data-id="index" src='../assets/img/remove_icon.svg'/>
                                        </div>
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
                     data-bs-toggle="modal" data-bs-target="#exampleModalSave"
                    class="btn btn-primary btn-lg save">Save</button>
                    <ModalConfirm id="exampleModalSave" :msg="'Save product '+editProduct.title+' ?' " 
                        :btnText="'Save'" @DelProduct="saveProduct"></ModalConfirm>
                    <button  type="button" 
                    class="btn btn-secondary btn-lg" @click="onCancel">Cancel</button>
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
import ModalConfirm from '../components/ModalConfirm.vue'



export default {
    name: 'EditProduct',
    components: {
        //Editor
        ModalAddCategory,
        ModalDelCategory,
        ModalConfirm
    },
    data: function() {
        return {
        id: this.$route.params.id,
        new: {
            order: '',
            avatar: '',
            title: 'New Product',
            description: '',
            reviews: [],
            category: [],
            gallery: [],
            price: {
                    value: 0,
                    unit: 'uah'
                }
        },
        imageSrc: [],
        image: null,
        cat: '01',
        editProduct: {},
        
        }
    },
    methods: {
        delImgPreLoad(index) {
            let img = [];
            img.push(this.dawnloadURL[index]);
            this.$store.dispatch('delImg', img);
            this.$store.commit('UrlDel', index);
        },
        delImgEdit(index){
            let img = [];
            img.push(this.editProduct.gallery[index]);
            this.$store.dispatch('delImg', img);
            this.editProduct.gallery.splice(index, 1)
            
        },
        delCategory (data) {
            if ((this.editProduct.category.indexOf(data)) != -1) {
                let index = this.editProduct.category.indexOf(data);
                this.editProduct.category.splice(index, 1);
            } 
        },
        onCancel () {
            if (this.id === 'new') {
                if (this.dawnloadURL.length || this.dawnloadAvatarURL.length) {
                   let img = [];
                    if (this.dawnloadURL.length) {
                        this.dawnloadURL.forEach(el =>{
                            img.push(el);
                        })
                    }
                    if (this.dawnloadAvatarURL) {
                        img.push(this.dawnloadAvatarURL.toString());
                    } 
                this.$store.dispatch('delImg', img)
                }
            }
            this.$store.commit('UrlUpdate');
            this.$router.push({ path: '/' })
        },
        saveProduct () {
            this.dawnloadURL.forEach((el) => {
                this.editProduct.gallery.push(el)
            });
            if (this.dawnloadAvatarURL.length){
                this.editProduct.avatar = this.dawnloadAvatarURL;
            }
            if (!this.editProduct.id){
                this.editProduct.id = Date.now().toString();
            }
            this.$store.dispatch('addProductToDB', this.editProduct)
            this.$store.commit('UrlUpdate');
            this.$router.push({ name: 'home' })
        },
        changeCategory (data) {
            this.cat = data;
            if ((this.editProduct.category.indexOf(this.cat)) === -1) {
                this.editProduct.category.push(this.cat);
            }
        },
        startUpload () {
            this.$refs.fileInput.click();
        },
        startUploadGallary () {
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
                trigger: trig,
                id: this.id
            };
            this.$store.dispatch('upload', Post);
         }
        
    },
    computed: {
        dawnloadAvatarURL () {
            return this.$store.getters['getAvatarUrlFromState'];
        },
        dawnloadURL () {
            return this.$store.getters['getUrlFromState'];
        },
        getCategories () {
            return this.$store.getters['getCategoriesFromDB'];
        },
        catProduct () {
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
        if (this.id != 'new') {
            this.$store.dispatch('fetchProductFromID', this.id);
        }
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