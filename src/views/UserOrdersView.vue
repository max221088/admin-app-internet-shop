<template>
    <div class="orders-wrop container">
        <table class="table table-hover">
    <thead>
        <tr>
        <th scope="col">Date</th>
        <th scope="col">Order ID</th>
        <th scope="col">Client Name</th>
        <th scope="col">Usrer ID</th>
        <th scope="col">Contact Number</th>
        <th scope="col">Delivery Address</th>
        <th scope="col">Sum</th>
        <th scope="col">Status</th>
        <th scope="col">Add Status</th>
        <th scope="col">Show Details</th>
        </tr>
        <tr>
        <th scope="col">
            <select v-model="sortParam" @change="selelectedSort" class="form-select form-select-sm">
            <option selected value="1">now</option>
            <option value="2">later</option>
            </select>
        </th>
        <th scope="col"></th>
        <th scope="col">
            
        </th>
        <th scope="col">
            
        </th>
        <th scope="col">
            
        </th>
        <th scope="col">
            
        </th>
        <th scope="col">
        </th>
        <th scope="col">
            <select v-model="selectedStatus" @change="filteredOrders" class="form-select form-select-sm">
                <option selected value="all">All</option>
                <option value="new">New</option>
                <option value="in work">In work</option>
                <option value="sent">Sent</option>
                <option value="completed">Completed</option>
            </select>
        </th>
        <th scope="col"></th>
        <th scope="col"></th>
        </tr>
    </thead>
    <tbody v-if="!!renderOrders[0]">
        <tr v-for="order, index in renderOrders" :key="index">
        <th scope="row">{{ getDate(order.id)}}</th>
        <td>{{order.id}}</td>
        <td>{{ order.clientName }}</td>
        <td>{{ order.idClient }}</td>
        <td>{{ order.tel }}</td>
        <td>{{ order.address }}</td>
        <td>{{ sumOrder(order.products) }}</td>
        <td >{{ order.status }}</td>
        <td><span @click="getIndex(index)" class="btn btn-success"
            data-bs-toggle="modal" data-bs-target="#exampleModalStatusOrder">Add status</span></td>
        <td>
            <router-link :to="{name: 'orderView' , 
            params:{id:order.id}}" ><span class="btn btn-success">Show Details</span></router-link>
            <ModalChangeOrderStatus @changeStat="addStatus"></ModalChangeOrderStatus>
        </td>
        </tr>
    </tbody>
    </table>
    </div>
</template>



<script>

import ModalChangeOrderStatus from '../components/ModalChangeOrderStatus.vue'

export default {
    name: 'UserOrdersView',
    components: {
    ModalChangeOrderStatus
    },
    data: function () {
        return {
            userInd: this.$route.params.index, 
            index: '' ,
            sortParam: '1',
            selectedStatus: 'all',
        }
    },
    methods: {
    getIndex(index) {
        this.index = index;
    },
    addStatus (newStatus) {
        let order = this.renderOrders[this.index];
        order.status = newStatus
        this.$store.dispatch('addOrderToDB', order);
    },
    filteredOrders( ) {
    let ord = [];
    ord = (this.selectedStatus || this.queryName.length || this.queryTel.length)
    ? this.ordersForSearch.filter(order => {
        return (((order.status.toLowerCase().indexOf(this.selectedStatus.toLowerCase()) != -1) 
        || this.selectedStatus === 'all' )
        )
    })
    : this.ordersForSearch;
    this.$store.commit('userOrdersFilter', ord);
    },
    selelectedSort: function () {
        this.renderOrders.sort(function (a, b) {
            if (this.sortParam == 1) {
                if (a.id < b.id) {
                    return 1;
                }
                if (a.id > b.id) {
                    return -1;
                }
            }
            if (this.sortParam == 2) {
                if (a.id > b.id) {
                    return 1;
                    }
                if (a.id < b.id) {
                    return -1;
                }
            
            }
            return 0;
        }.bind(this));
    },
        sumOrder (products) {
            let sum = 0;
            for (let i = 0; i < products.length; i++) {
                sum = sum +(products[i].price.value * products[i].amount) 
            }
            return sum
        },
        getDate (id) {
            let dateNow = Number(id.split('-').pop());
            let date =  new Date(dateNow).toLocaleString();
            return date
        },
    },
    computed: {
        users () {
         return this.$store.getters['getUsersDB'];      
        },
        renderOrders () {
            return this.$store.getters['getUserOrders']
        }
    },
    created: function () {
        this.$store.dispatch('fetchUsersOrders', this.users[this.userInd].history)
}  
}

</script>