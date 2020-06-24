<template>
  <div class="page">
    <h1 class="center">Password Manager</h1>
    <b-button @click="openAddModal()">Add Password</b-button>
    <b-table :data="passwords">
      <template scope="props">
        <b-table-column field="name" label="Name">{{props.row.name}}</b-table-column>
        <b-table-column field="url" label="URL">{{props.row.url}}</b-table-column>
        <b-table-column field="username" label="Username">{{props.row.username}}</b-table-column>
        <b-table-column field="password" label="Password">******</b-table-column>
        <b-table-column field="edit" label="Edit">
          <b-button @click="openEditModal(props.row)">Edit</b-button>
        </b-table-column>
        <b-table-column field="delete" label="Delete">
          <b-button @click="deleteOnePassword(props.row.id)">Delete</b-button>
        </b-table-column>
      </template>
    </b-table>
    <b-modal :active.sync="showAddModal" :width="500" scroll="keep">
      <div class="card">
        <div class="card-content">
          <h1>Add Password</h1>
          <PasswordForm @saved="closeModal()" @cancelled="closeModal()" :edit="false"></PasswordForm>
        </div>
      </div>
    </b-modal>
    <b-modal :active.sync="showEditModal" :width="500" scroll="keep">
      <div class="card">
        <div class="card-content">
          <h1>Edit Password</h1>
          <PasswordForm
            @saved="closeModal()"
            @cancelled="closeModal()"
            :edit="true"
            :password="selectedPassword"
          ></PasswordForm>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
// @ is an alias to /src
import { requestsMixin } from "@/mixins/requestsMixin";
import PasswordForm from "@/components/PasswordForm.vue";
export default {
  name: "home",
  data() {
    return {
      selectedPassword: {},
      showAddModal: false,
      showEditModal: false
    };
  },
  components: {
    PasswordForm
  },
  mixins: [requestsMixin],
  computed: {
    passwords() {
      return this.$store.state.passwords;
    }
  },
  beforeMount() {
    this.getAllPasswords();
  },
  methods: {
    openAddModal() {
      this.showAddModal = true;
    },
    openEditModal(password) {
      this.showEditModal = true;
      this.selectedPassword = password;
    },
    closeModal() {
      this.showAddModal = false;
      this.showEditModal = false;
      this.selectedPassword = {};
    },
    async deleteOnePassword(id) {
      await this.deletePassword(id);
      this.getAllPasswords();
    },
    async getAllPasswords() {
      const response = await this.getPasswords();
      this.$store.commit("setPasswords", response.data);
    }
  }
};
</script>