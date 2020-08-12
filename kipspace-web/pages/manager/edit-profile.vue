<template>
  <div id="mgr-edit">
    <v-container>
      <v-card outlined flat>
        <v-sheet tile height="150" color="grey lighten-4">
          <v-img height="100%" src="/img/chips.png">
            <v-row align="end" justify="end" class="fill-height">
              <v-btn  
                color="rgba(255,255,255,0.35)" 
                class="text-lowercase font-weight-bold mx-2" 
                depressed
              >
                <v-icon large color="primary">mdi-camera</v-icon>
              </v-btn>
            </v-row>
          </v-img>
        </v-sheet>
        <v-row justify="center" class="text-center">
          <v-col cols="6">
            <v-avatar
              size="160"
              class="biz-logo"
            >
              <v-img src="/img/pizza.png" alt="alt">
                <v-row align="end" justify="center" class="fill-height">
                  <v-btn  
                    color="rgba(255,255,255,0.35)" 
                    class="text-lowercase font-weight-bold my-3 mx-2" 
                    depressed
                    small
                    block
                  >
                    <v-icon size="30" color="primary">mdi-camera</v-icon>
                  </v-btn>
                </v-row>
              </v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row class="px-10 py-5">
          <v-col cols="12" sm="6">
            <label for="name">
              <b>Company Name</b>
              <v-text-field
                v-model="name"
                outlined
                placeholder="enter company name"
              ></v-text-field>
            </label>
          </v-col>
          <v-col cols="12" sm="6">
            <label for="email">
              <b>Email</b>
              <v-text-field
                v-model="email"
                outlined
                placeholder="someone@exmaple.com"
              ></v-text-field>
            </label>
          </v-col>
          <v-col cols="12" sm="6">
            <label for="address">
              <b>Address</b>
              <v-textarea
                v-model="address"
                outlined
                placeholder="enter address"
                height="166"
              ></v-textarea>
            </label>
          </v-col>
          <v-col cols="12" sm="6">
            <label for="capacity">
              <b>Capacity</b>
              <v-text-field
                v-model="capacity"
                outlined
                placeholder="enter number of people facility can conain"
              ></v-text-field>
            </label>
            <label for="phone">
              <b>Phone Number</b>
              <v-text-field
                v-model="phone"
                outlined
                placeholder="08012345678"
              ></v-text-field>
            </label>
          </v-col>
          <v-col cols="12" md="6">
            <label for="opening">
              <b>Opening Hours</b>
              <v-card
                outlined
              >
                <div v-for="(open, p) in opening" :key="p">
                  <v-row class="px-5" align="center">
                    <v-col cols="6" class="py-0">
                      {{open.day}}
                    </v-col>
                    <v-col cols="6" class="py-0">
                      <v-row>
                        <v-col cols="5">
                          <v-menu
                            v-model="menu[p]"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{on}">
                              <v-btn
                                text
                                small
                                depressed
                                block
                                class="time-btn"
                                v-on="on"
                                color="black"
                              >
                                {{ open.from ? open.from : '----' }}
                              </v-btn>
                            </template>
                            <v-time-picker
                              v-model="open.from"
                              color="primary" 
                              ampm-in-title 
                              @input="menu[p] = false"          
                            >
                            </v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="2">to</v-col>
                        <v-col cols="5">
                          <v-menu
                            v-model="menu2[p]"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{on}">
                              <v-btn
                                text
                                small
                                depressed
                                block
                                class="time-btn"
                                v-on="on"
                                color="black"
                              >
                                {{ open.to ? open.to : '----' }}
                              </v-btn>
                            </template>
                            <v-time-picker
                              v-model="open.to"
                              color="primary" 
                              ampm-in-title 
                              @input="menu2[p] = false"          
                            >
                            </v-time-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                </div>
              </v-card>
            </label>
          </v-col>
          <v-col cols="12" md="6">
            <div class="text-center py-2">
              <h3>Change Password</h3>
            </div>
            <label for="pwd">
              <b>Old Password</b> 
              <v-text-field
                v-model="pwd"
                outlined
                placeholder="enter old password"
              ></v-text-field>
            </label>
            <label for="pwd2">
              <b>New Password</b>
              <v-text-field
                v-model="pwd2"
                outlined
                placeholder="enter new password"
              ></v-text-field>
            </label>
          </v-col>
          <v-col cols="12" class="text-center pt-5">
            <v-btn 
              color="secondary"
              class="text-capitalize"
              depressed
              large
            >
              Save Profile
            </v-btn>
          </v-col>
        </v-row>
        <div class="text-center pb-10">
          
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'manager',
  data: () => ({
    name: '',
    email: '',
    address: '',
    capacity: '',
    phone: '',
    pwd: '',
    pwd2: '',
    menu: [],
    menu2: [],
    opening: [
      {day: 'Monday', from: '', to: ''},
      {day: 'Tuesay', from: '', to: ''},
      {day: 'Wednesday', from: '', to: ''},
      {day: 'Thursday', from: '', to: ''},
      {day: 'Friday', from: '', to: ''},
      {day: 'Saturday', from: '', to: ''}
    ]
  })
}
</script>

<style>
#mgr-edit .biz-logo {
  margin-top: -65px; 
  border: 10px solid white; 
  border-radius: 50%;
}
</style>