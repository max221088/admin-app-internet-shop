<template>
    <div class="wrop container">
        <h4><span class="text-muted">Edit Product</span> {{ product.title }}</h4>
        <div class="edit container">
            <div>
                <img :src="product.avatar" class="img-thumbnail img-fluid" alt="">
            </div>
            <div class="container-fluid">
                <p>Product Title</p>
                <textarea class="form-control" id="exampleFormControlTextarea1" 
                rows="1" v-model="product.title"></textarea>
                <p>Short description</p>
                <textarea class="form-control" id="exampleFormControlTextarea1" 
                rows="1" v-model="product.short"></textarea>
                <div class="mb-3">
                    <label for="formFileMultiple" class="form-label">Add Foto</label>
                    <input class="form-control" type="file" 
                    id="formFileMultiple" multiple
                    accept="image/*" @change="onChange">
                    <img class="pre-view" :src="imageSrc" v-if="imageSrc"/>
                </div>
                <select class="form-select" aria-label="Пример выбора по умолчанию">
                    <option v-for="(item, index) in getCategories" :key="index">{{ item.title }}</option>
                    <!-- <option :aria-valuemin=item.id>{{ item }}</option> -->
                </select>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary mr-md-2" type="button">+</button>
                </div>
                <p>Description</p>
                <textarea class="form-control" id="exampleFormControlTextarea1" 
                rows="4" v-model="product.description"></textarea>
                <p>Product Orders</p>
                <textarea class="form-control" id="exampleFormControlTextarea1" 
                rows="1" v-model="product.order"></textarea>
            </div>
        </div> 
    </div>
  </template>

<script>
export default {
    name: 'EditProduct',
    components: {
    
    },
    data: function() {
        return {
        id: this.$route.params.id,
        imageSrc: '',
        image: null
        }
    },
    methods: {
        onChange (event) {
            let file = event.target.files[0]
            let reader = new FileReader()
            reader.onload = () => {
                this.imageSrc = reader.result
            }
            reader.readAsDataURL(file)
            this.image = file
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