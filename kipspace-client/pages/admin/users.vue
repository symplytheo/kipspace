<template>
  <div>
    <v-toolbar
      color="transparent"
      dense
      class="primary--text my-2"
      elevation="0"
    >
      <v-icon large class="mr-2" color="primary">mdi-account-multiple</v-icon>
      <v-toolbar-title class="font-weight-bold">Users</v-toolbar-title>

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
                  v-model="name"
                  label="Name"
                  counter="32"
                  :rules="[
                    (v) => !!v || 'Name is required',
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
                    (v) =>
                      /^\w+@\w+\.\w+(\.\w+)?$/.test(v) || 'Email is not valid',
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
              List of all active users
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
                  v-for="i in ['s/n', 'name', 'email', 'role', ' ']"
                  :key="i"
                  class="text-uppercase primary--text"
                >
                  {{ i }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 12" :key="i" class="tablerow">
                <td>{{ i }}</td>
                <td>Johnson Snowflakes</td>
                <td>johnsnow@gmail.com</td>
                <td>USER</td>
                <td>
                  <span class="btn">
                    <v-btn class="mx-2" small icon color="primary">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" small icon color="error">
                      <v-icon>mdi-window-close</v-icon>
                    </v-btn>
                  </span>
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
export default {
  layout: 'admin',
  data: () => ({
    dialog: false,
    role: '',
    name: '',
    email: '',
    password: '',
    showPwd: false,
    loading: false,
    addUserForm: false,
  }),
  methods: {
    addUser() {
      this.loading = true
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
