<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="onSubmit" novalidate>
      <ValidationProvider name="name" rules="required" v-slot="{ errors }">
        <b-field
          label="Name"
          :type="errors.length > 0 ? 'is-danger': '' "
          :message="errors.length > 0 ? 'Name is required': ''"
        >
          <b-input type="text" name="name" v-model="form.name"></b-input>
        </b-field>
      </ValidationProvider>
      <ValidationProvider name="url" rules="required|url" v-slot="{ errors }">
        <b-field
          label="URL"
          :type="errors.length > 0 ? 'is-danger': '' "
          :message="errors.join('. ')"
        >
          <b-input type="text" name="url" v-model="form.url"></b-input>
        </b-field>
      </ValidationProvider>
      <ValidationProvider name="username" rules="required" v-slot="{ errors }">
        <b-field
          label="Username"
          :type="errors.length > 0 ? 'is-danger': '' "
          :message="errors.length > 0 ? 'Username is required': ''"
        >
          <b-input type="text" name="username" v-model="form.username"></b-input>
        </b-field>
      </ValidationProvider>
      <ValidationProvider name="password" rules="required" v-slot="{ errors }">
        <b-field
          label="Password"
          :type="errors.length > 0 ? 'is-danger': '' "
          :message="errors.length > 0 ? 'Password is required': ''"
        >
          <b-input type="password" name="password" v-model="form.password"></b-input>
        </b-field>
      </ValidationProvider>
      <br />
      <b-button type="is-primary" native-type="submit" style="margin-right: 10px">Submit</b-button>
      <b-button type="is-warning" native-type="button" @click="cancel()">Cancel</b-button>
    </form>
  </ValidationObserver>
</template>
<script>
import { requestsMixin } from "@/mixins/requestsMixin";
export default {
  name: "PasswordForm",
  mixins: [requestsMixin],
  props: {
    edit: Boolean,
    password: Object
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
if (this.edit) {
        await this.editPassword(this.form);
      } else {
        await this.addPassword(this.form);
      }
      const response = await this.getPasswords();
      this.$store.commit("setPasswords", response.data);
      this.$emit("saved");
    },
    cancel() {
      this.$emit("cancelled");
    }
  },
  data() {
    return {
      form: {}
    };
  },
  watch: {
    password: {
      handler(p) {
        this.form = JSON.parse(JSON.stringify(p || {}));
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>