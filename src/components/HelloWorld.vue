<template>
  <div class="container">
    <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Order</th>
      <th scope="col">Avatar</th>
      <th scope="col">Title</th>
      <th scope="col">Category</th>
      <th scope="col">Short Description</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item, index in products" :key="index">
      <th scope="row">{{ item.order }}</th>
      <td><img class="avatar" :src="item.avatar" alt="..."></td>
      <td>{{ item.title }}</td>
      <td>{{ item.category }}</td>
      <td>{{ item.short }}</td>
      <!-- <td>{{ item.price.uah.value }}</td> -->
      <!-- <td>{{ item.price.uah.unit }}</td> -->
      <td><router-link :to="{name: 'EditProduct' , params:{id:item.id}}" >Edit</router-link></td>
      <td>Delete</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['products'],
  
}
</script>


