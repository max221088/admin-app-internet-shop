<template>
  <div class="info-wrop">
    <div class="add-btn container">
      <button class="btn btn-primary mt-3 mr-md-2" data-bs-toggle="modal"
      data-bs-target="#exampleModalConfirmAdd" type="button">
        Add New Article
      </button>
    </div>
    <div class="container mt-3">
      <div class="row article-row" v-for="article, index in renderInfo" :key="index">
        <div class="col-1">
          <p>Order</p>
          <input class="form-control" type="number" v-model="article.order">
          <button class="btn btn-primary mr-md-2 btn-danger mt-3" 
          data-bs-toggle="modal" :index="index" @click="getId($event)"
          data-bs-target="#exampleModalConfirmDel" type="button">
            Del
          </button>
          <button class="btn btn-primary mr-md-2 btn-success mt-3" 
          data-bs-toggle="modal" :index="index" @click="getId($event)"
          data-bs-target="#exampleModalConfirmSave" type="button">
            Save
          </button>
        </div>
        <div class="col-11">
          <div class="row">
            <p>Title</p>
            <textarea class="form-control" id="exampleFormControlTextarea1" 
            v-model="article.title"></textarea>
          </div>
          <div class="row">
            <p>Content</p>
            <textarea class="form-control" rows="8" id="exampleFormControlTextarea1" 
            v-model="article.content"></textarea>
          </div>
        </div>
      </div>
    </div>
    <ModalConfirm id="exampleModalConfirmAdd" :msg="'Add new Article ?' " 
      :btnText="'Add'" @confirm="addArticle"></ModalConfirm>
    <ModalConfirm id="exampleModalConfirmDel" :msg="'Delete this Article ?'" 
        :btnText="'Delete'" @confirm="delArticle"></ModalConfirm>
    <ModalConfirm id="exampleModalConfirmSave" :msg="'Save this Article ?'" 
      :btnText="'Save'" @confirm="saveArticle"></ModalConfirm>
  </div>
</template>



<script>

  import ModalConfirm from '/src/components/ModalConfirm.vue'

  export default {
    name: 'ContactsEditView',
    components: {
      ModalConfirm
    },
    data: function () {
      return {
        id: 'Contacts',
        index: '' 
      }
    },
    methods: {
      getId ($event) {
          this.index = $event.target.getAttribute('index');
      },
      delArticle () {
        let EditArticle = {
          chapter: this.id,
          id: this.renderInfo[this.index].id
        }
        this.$store.dispatch('deleteArticleToDB', EditArticle );
        this.$store.dispatch('fetchArticls', this.id);
      },
      addArticle () {
        let EditArticle = {
          chapter: this.id,
          Update: {
            title: 'New Article',
            order: '',
            id: Date.now().toString(),
            content: ''
          }
        }
        this.$store.dispatch('addArticleToDB', EditArticle );
        this.$store.dispatch('fetchArticls', this.id);
      },
      saveArticle () {
        let EditArticle = {
          chapter: this.id,
          Update: this.renderInfo[this.index]
        }
        this.$store.dispatch('addArticleToDB', EditArticle );
        this.$store.dispatch('fetchArticls', this.id);
      }  
    },
    computed: {
      renderInfo () {
        return this.$store.getters['getArticlsDB'];
      }
    },
    created: function () {
      this.$store.dispatch('fetchArticls', this.id);
    }  
  }
</script>