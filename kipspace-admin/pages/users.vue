<template>
  <div>
    <v-toolbar
      color="transparent"
      dense
      class="primary--text my-2"
      elevation="0"
    >
      <v-icon large class="mr-2" color="primary">mdi-account-multiple</v-icon>
      <v-toolbar-title class="font-weight-bold">
        Users <span class="subtitle-2"> ({{ users.count }}) </span>
      </v-toolbar-title>

      <v-spacer />

      <v-btn color="primary" class="text-capitalize" @click="dialog = !dialog">
        Add User
      </v-btn>
    </v-toolbar>

    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-toolbar color="transparent" dense flat>
          <v-toolbar-title class="font-weight-bold">
            Add New User
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon color="primary" @click.stop="dialog = !dialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pt-0">
          <v-form v-model="addUserForm">
            <v-row>
              <v-col cols="12" class="py-0">
                <v-select
                  v-model="role"
                  label="Select Role"
                  :items="['USER', 'ADMIN']"
                  :rules="[(v) => !!v || 'Role is required']"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="firstname"
                  label="First Name"
                  counter="32"
                  :rules="[
                    (v) => !!v || 'First name is required',
                    (v) =>
                      (!!v && v.length <= 32) || 'Not more than 32 characters',
                  ]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="lastname"
                  label="Last Name"
                  counter="32"
                  :rules="[
                    (v) => !!v || 'Last name is required',
                    (v) =>
                      (!!v && v.length <= 32) || 'Not more than 32 characters',
                  ]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email"
                  :rules="[
                    (v) => !!v || 'Email is required',
                    (v) => (!!v && emailValidation(v)) || 'Email is invalid',
                  ]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  label="Password"
                  :type="showPwd ? 'text' : 'password'"
                  :append-icon="showPwd ? 'mdi-eye-off' : 'mdi-eye'"
                  :rules="[
                    (v) => !!v || 'Password is required',
                    (v) => (!!v && v.length >= 8) || 'At least 8 characters',
                  ]"
                  @click:append="showPwd = !showPwd"
                />
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  large
                  depressed
                  :loading="loading"
                  :disabled="!addUserForm"
                  color="secondary"
                  @click="addUser"
                >
                  Add User
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-card elevation="3" class="mt-10">
      <v-row align="center">
        <v-col cols="12" class="pb-0 mb-0">
          <v-card
            class="v-sheet--offset mx-auto py-2 px-3"
            elevation="6"
            width="96%"
            color="primary"
            dark
          >
            <div class="title font-weight-medium">All Users</div>
            <div class="font-weight-medium subtitle-1">
              List of all {{ users.count }} registered users
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-card-text class="px-10" style="margin-top: -30px">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th
                  v-for="i in ['s/n', 'name', 'email', 'role', '']"
                  :key="i"
                  class="text-uppercase primary--text"
                >
                  {{ i }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, u) in users.items" :key="u" class="tablerow">
                <td>{{ u + 1 }}</td>
                <td class="text-capitalize">
                  {{
                    user.firstname !== null
                      ? user.firstname + ' ' + user.lastname
                      : '--- ---'
                  }}
                </td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <!-- Update category dialogs -->
                  <v-dialog v-model="menu[u]" max-width="600">
                    <template v-slot:activator="{ on }">
                      <v-btn text small color="primary" v-on="on"> Edit </v-btn>
                    </template>
                    <v-card>
                      <v-toolbar color="transparent" dense flat>
                        <v-toolbar-title class="font-weight-bold">
                          Edit User -
                          <span class="text-lowercase">{{ user.email }}</span>
                        </v-toolbar-title>
                      </v-toolbar>
                      <v-card-text class="pt-0">
                        <v-form>
                          <v-row>
                            <v-col cols="12" class="py-0">
                              <v-select
                                v-model="user.role"
                                label="Role"
                                :items="['USER', 'ADMIN']"
                                :rules="[(v) => !!v || 'Role is required']"
                              />
                            </v-col>
                            <v-col cols="12" class="pt-0">
                              <v-text-field
                                v-model="user.firstname"
                                label="First name"
                                counter="32"
                                :rules="[
                                  (v) => !!v || 'First name is required',
                                  (v) =>
                                    (!!v && v.length <= 32) ||
                                    'Not more than 32 characters',
                                ]"
                              />
                            </v-col>
                            <v-col cols="12" class="pt-0">
                              <v-text-field
                                v-model="user.lastname"
                                label="Last name"
                                counter="32"
                                :rules="[
                                  (v) => !!v || 'Last name is required',
                                  (v) =>
                                    (!!v && v.length <= 32) ||
                                    'Not more than 32 characters',
                                ]"
                              />
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                v-model="user.email"
                                label="Email"
                                :rules="[
                                  (v) => !!v || 'Email is required',
                                  (v) =>
                                    (!!v && emailValidation(v)) ||
                                    'Email is invalid',
                                ]"
                              />
                            </v-col>
                            <v-col cols="12">
                              <v-btn
                                block
                                large
                                depressed
                                :loading="loading"
                                color="secondary"
                                @click="updateUser(user, u)"
                              >
                                Edit User
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-row>
        <v-col class="text-center py-0">
          <v-pagination
            :value="1"
            :length="10"
            :total-visible="5"
            color="primary"
            circle
            class="ma-2 pagination"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import UpdateUserGql from '~/graphql/mutations/UpdateUser'
import UsersGql from '~/graphql/queries/users'
import { emailValidation } from '~/utils/validation'

export default {
  layout: 'admin',
  data: () => ({
    users: {
      count: 0,
      items: [],
    },
    dialog: false,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
    showPwd: false,
    loading: false,
    addUserForm: false,
    menu: [],
  }),
  apollo: {
    users: {
      query: UsersGql,
      prefetch: true,
    },
  },
  methods: {
    emailValidation,
    // async addUser() {
    //   this.loading = true
    //   const record = {
    //     firstname: this.firstname,
    //     lastname: this.lastname,
    //     email: this.email,
    //     password: this.password,
    //     role: this.role,
    //   }
    //   try {
    //     await this.$apollo.mutate({
    //       mutation: CreateUserGql,
    //       variables: { record },
    //     })

    //     this.$store.commit('snackbar/show', {
    //       text: 'User was added successfully',
    //       icon: 'success',
    //     })
    //     this.$router.go(0)
    //   } catch (error) {
    //     // eslint-disable-next-line no-unused-vars
    //     const { response, message } = error
    //     this.$store.commit('snackbar/show', {
    //       text: response.data.message,
    //       icon: 'error',
    //     })
    //   } finally {
    //     this.loading = false
    //   }
    // },
    async updateUser(user, u) {
      this.loading = true
      const record = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      }
      try {
        await this.$apollo
          .mutate({
            mutation: UpdateUserGql,
            variables: { record },
          })
          .then(() => {
            this.menu[u] = false
            this.$store.commit('snackbar/show', {
              text: 'User was updated successfully',
              icon: 'success',
            })
          })
      } catch (error) {
        // eslint-disable-next-line no-unused-vars
        const { response, message } = error
        this.$store.commit('snackbar/show', {
          text: response.data.message,
          icon: 'error',
        })
      } finally {
        this.loading = false
      }
    },
  },
  head() {
    return {
      title: 'Users | Admin',
    }
  },
}
</script>

<style scoped>
.v-sheet--offset {
  top: -30px;
  position: relative;
}
.tablerow .btn {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
.tablerow:hover .btn {
  opacity: 1;
}
</style>
