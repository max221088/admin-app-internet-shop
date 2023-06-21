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
      
    </tr>
    <tr>
      <th scope="col">
        
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
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="order, index in renderOrders" :key="index">
      <th scope="row">{{ getDate(order.id)}}</th>
      <td>{{order.id}}</td>
      <td>{{ order.clientName }}</td>
      <td>{{ order.idClient }}</td>
      <td>{{ order.tel }}</td>
      <td>{{ order.address }}</td>
      <td>{{ sumOrder(order.products) }}</td>
      <td v-if="order.status">{{ order.status }}</td>
      <td v-if="!order.status">New</td>
      <td><router-link to="/"><span class="btn btn-success">Add status</span></router-link></td>
      <td><router-link to="/"><span class="btn btn-success">Show Details</span></router-link></td>
    </tr>
  </tbody>
</table>
  </div>
</template>



<script>

export default {
    name: 'OrdersView',
    components: {
        
    },
    data: function () {
        return {
            index: '' ,
        }
    },
    methods: {
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
        ordersForSearch () {
            return this.$store.getters['getOrdersDB'];
        },
        renderOrders () {
            return this.$store.getters['getOrdersDB'];
        }
    },
    created: function () {
        this.$store.dispatch('fetchOrders');
  }  
}

</script>