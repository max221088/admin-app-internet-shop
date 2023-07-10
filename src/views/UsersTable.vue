<template>
    <div class="container">
        <form class="d-flex m-3">
            <input v-model="query" @input="searchUser" class="form-control" type="text" placeholder="Search Query">
        </form>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Client Name</th>
                    <th scope="col">Telephone</th>
                    <th scope="col">Adress</th>
                    <th scope="col">Email</th>
                    <th scope="col">Total Orders</th>
                    <th scope="col"></th>
                </tr> 
            </thead>
            <tbody>
                <tr v-for="item, index in usersRender" :key="index">
                    <th scope="row">{{ item.name }}</th>
                    <th scope="row">{{ item.tel }}</th>
                    <td>{{ item.address }}</td>
                    <td>{{ item.email }}</td>
                    <td><span >{{ item.history.length }}</span></td>
                    <td ><router-link v-if="item.history.length" :to="{name: 'UserOrders' , params:{index:index}}"
                         class="btn btn-link m-0">Look Order</router-link>
                         <div v-if="!item.history.length">No Order</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
  name: 'UserTable',
  components: {
    
  },
  data: () => {
    return {
        query: ''
    }
  },
  methods: {
    searchUser () {
        let filtered = this.usersForSearch.filter((el) => {
            return (el.name.toLowerCase().indexOf(this.query.toLowerCase()) != -1 
            || el.tel.toLowerCase().indexOf(this.query.toLowerCase()) != -1
            || el.email.toLowerCase().indexOf(this.query.toLowerCase()) != -1)
        })
        this.$store.commit('usersSearch', filtered)
    }
        
  },
  computed: {
    usersForSearch () {
         return this.$store.getters['getUsersForSearch'];
     },
    usersRender () {
         return this.$store.getters['getUsersDB'];      
     },
  },
  created: function () {
    this.$store.dispatch('fetchUsers');
  }
}
</script>
