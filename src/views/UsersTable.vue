<template>
    <div class="container">
        <form class="d-flex m-3">
            <input v-model="query" @input="SearchUser" class="form-control" type="text" placeholder="Search Query">
        </form>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Client Name</th>
                    <th scope="col">Telephone</th>
                    <th scope="col">Adress</th>
                    <th scope="col">Email</th>
                    <th scope="col">Total Orders</th>
                    <th scope="col">Registration Date</th>
                    <th scope="col"></th>
                </tr> 
            </thead>
            <tbody>
                <tr v-for="item, index in usersRender" :key="index">
                    <th scope="row">{{ item.name }}</th>
                    <th scope="row">{{ item.tel }}</th>
                    <td>{{ item.adress }}</td>
                    <td>{{ item.email }}</td>
                    <td><span v-if="item.hystory">{{ item.hystory }}</span></td>
                    <td >{{ item.id }}</td>
                    <td >Look Order</td>
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
    SearchUser () {
        //let result = [];
        let filtered = this.UsersForSearch.filter((el) => {
            return (el.name.toLowerCase().indexOf(this.query.toLowerCase()) != -1 
            || el.tel.toLowerCase().indexOf(this.query.toLowerCase()) != -1
            || el.email.toLowerCase().indexOf(this.query.toLowerCase()) != -1)
        })
        this.$store.commit('UsersSearch', filtered)
    }
        
  },
  computed: {
    UsersForSearch () {
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
