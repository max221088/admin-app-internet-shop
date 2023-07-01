<template>
    <div class="wrop container" v-if="!!order.id">
        <h4><span class="text-muted">Details for </span> {{ order.id}}</h4>
        <div class="container">
            <div class="row align-items-center">
                <div class="col-3">
                    <span>Date order</span>
                </div>
                <div class="col-9">
                    <span>{{ getDate(order.id) }}</span>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-3">
                    <span>Order Status</span>
                </div>
                <div class="col-9">
                    <select class="form-select chenge-status" v-model="order.status" >
                        <option value="new">New</option>
                        <option value="in work">In worK</option>
                        <option value="sent">Sent</option>
                        <option value="completed">Completed</option>  
                    </select>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-3">
                    <span>Client Name</span>
                </div>
                <div class="col-9">
                    <span>{{ order.clientName }}</span>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-3">
                    <span>Contact Number</span>
                </div>
                <div class="col-9">
                    <span>{{ order.tel }}</span>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-3">
                    <span>Client ID</span>
                </div>
                <div class="col-9">
                    <span>{{ order.idClient }}</span>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-3">
                    <span>Deliver Address</span>
                </div>
                <div class="col-9">
                    <span>{{ order.address }}</span>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-3">
                    <span>Client Comment</span>
                </div>
                <div class="col-9">
                    <span>{{ order.clientComment }}</span>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-3">
                    <span>Client Name</span>
                </div>
                <div class="col-9">
                    <span>{{ order.clientName }}</span>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-3">
                    <span>Products in order</span>
                </div>
                <div class="col-9">
                    <div class="row align-items-center">
                        <div class=" col-2">#</div>
                        <div class=" col-2">Product</div>
                        <div class=" col-2">Amound</div>
                        <div class=" col-2">Price</div>
                        <div class=" col-2">Sum</div>
                    </div>
                    <div class="row align-items-center" v-for="product, index in order.products" :key="index">
                        <div class=" col-2">{{ index+1 }}</div>
                        <div class=" col-2">{{ product.title }}</div>
                        <div class=" col-2">{{ product.amount }}</div>
                        <div class=" col-2">{{ product.price.value }} UAH</div>
                        <div class=" col-2">
                            {{ product.price.value * product.amount }} UAH
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class=" col-2">Order price</div>
                        <div class=" col-6"></div>
                        <div class=" col-2">{{ sumOrder }} UAH</div> 
                    </div>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-3">
                    <span>Servise Comment</span>
                </div>
                <div class="col-9">
                    <textarea  name="editor" class="form-control" id="exampleFormControlTextarea1 editor" 
                    rows="3" v-model="order.serviseComment"></textarea>
                </div>
            </div>
        </div>
        <button type="button" 
            data-bs-toggle="modal" data-bs-target="#exampleModalSaveOrder"
            class="btn btn-primary btn-lg save">Save</button>
        <ModalConfirm id="exampleModalSaveOrder" :msg="'Save Change in ' +order.id+' ?' " 
            :btnText="'Save'" @DelProduct="saveOrder"></ModalConfirm>
    </div>

</template>

<script>
//import ModalAddCategory from '../components/ModalAddCategory.vue'
import ModalConfirm from '../components/ModalConfirm.vue'



export default {
    name: 'ShowOrder',
    components: {
        //Editor
       // ModalAddCategory,
        ModalConfirm
    },
    data: function() {
        return {
        id: this.$route.params.id,
        
        
        }
    },
    methods: {
        saveOrder () {
            this.$store.dispatch('addOrderToDB', this.order);
        },
        getDate (id) {
            let dateNow = Number(id.split('-').pop());
            let date =  new Date(dateNow).toLocaleString();
            return date
        },
        onCancel () {
            this.$store.commit('UrlUpdate');
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
            
        },
    },
    computed: {
        sumOrder () {
            let sum = 0;
            for (let i = 0; i < this.order.products.length; i++) {
                sum = sum +(this.order.products[i].price.value * this.order.products[i].amount) 
            }
            return sum
        },
        order () {
            return this.$store.getters['getOrderDB'];
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
    this.$store.dispatch('fetchOrderFromID', this.id);
  },
  
  
}


</script>