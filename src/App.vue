<template>
  <div id="app">
    <v-app>
  <v-toolbar app>jsbook</v-toolbar>
  <main>
    <v-content>
      <v-container fluid>
      <h2>Create a</h2>
   <v-layout row wrap>
     <v-flex xs6>
       
                <v-select
                  :items="typeItems"
                  v-model="selectedType"
                  singleLine
                  auto
            
                ></v-select>
                <h3>Project</h3>
     </v-flex>
     <v-btn primary raised @click="createProject(selectedType)">Go!</v-btn>
   </v-layout>
   <span v-if="ready">Ready! Now go to <a :href="url">{{url}}</a></span>
      </v-container>
    </v-content>
  </main>
  <v-footer app></v-footer>
</v-app>
    

  </v-card>
  </div>
  
</template>

<script>
import { ipcMain, ipcRenderer } from "electron"

ipcRenderer.on("log", (event, arg) => {
  console.log(arg)
})

export default {
  mounted() {
    ipcRenderer.on("ready", (event, arg) => {
      this.url = arg
      this.ready = true
    })
  },
  data() {
    return {
      url: "none",
      typeItems: ["Basic", "React", "Vue"],
      selectedType: "Basic",
      ready: false
    }
  },
  methods: {
    createProject(message) {
      ipcRenderer.send("createProject", "woo")
    }
  }
}
</script>
