<template>
  <div>

    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>

        <v-select v-model="cp" :items="cpitems" item-text="text" item-value="value"
          :rules="[v => !!v || 'Chest Pain Type is required']" label="Chest Pain Type" required>
        </v-select>

        <v-text-field v-model="trestbps" type="number" label="Resting Blood Pressure (in mm Hg)" required>
        </v-text-field>

        <v-text-field v-model="chol" type="number" label="Serum Cholestoral in mg/dl" required></v-text-field>

        <v-select v-model="fbs" :items="fbsitems" item-text="text" item-value="value"
          :rules="[v => !!v || 'Fasting Blood Sugar is required']" label="Fasting Blood Sugar" required>
        </v-select>

        <v-select v-model="restecg" :items="restecgitems" item-text="text" item-value="value"
          :rules="[v => !!v || 'Resting Electro-cardiographic Result is required']"
          label="Resting Electro-cardiographic Result" required>
        </v-select>

        <v-text-field v-model="thalach" type="number" label="Maximum Heart Rate Achieved" required></v-text-field>


        <v-select v-model="exang" :items="exangitems" item-text="text" item-value="value"
          :rules="[v => !!v || 'Exercise Induced Angina is required']" label="Exercise Induced Angina" required>
        </v-select>

        <v-alert v-if="disease" dense text type="error">
          you chances of getting the disease with propability of {{probmsg}} %. Please consult the doctor immediately 
        </v-alert>

        <v-alert v-if="Nodisease" dense text type="success">
          No need to fear. You have no dangerous symptoms of the disease with propability of {{probmsg}} %
        </v-alert>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
          Validate
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          Reset Form
        </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
      </v-form>
    </v-container>

  </div>
</template>


<script>
  import {
    getAPI
  } from "@/axios";
  export default {
    data: () => ({
      prob :0,
      disease: false,
      Nodisease: false,
      tosub: null,
      valid: true,
      trestbps: 0,
      chol: 0,
      thalach: 0,
      exang: null,
      exangitems: [{
        text: ' Yes',
        value: 1
      }, {
        text: ' No',
        value: 2
      }],
      cp: null,
      cpitems: [{
        text: 'Typical Angina',
        value: 1
      }, {
        text: 'Atypical Angina',
        value: 2
      }, {
        text: 'Non-Anginal Pain',
        value: 3
      }, {
        text: 'Asymptomatic',
        value: 4
      }],
      restecg: null,
      restecgitems: [{
        text: 'having ST-T wave abnormality',
        value: 2
      }, {
        text: 'Normal',
        value: 1
      }, {
        text: 'showing probable or definite left ventricular hypertrophy',
        value: 3
      }],
      fbs: null,
      fbsitems: [{
        text: 'Fasting Blood Sugar < 120 mg/dl',
        value: 1
      }, {
        text: 'Fasting Blood Sugar > 120 mg/dl',
        value: 2
      }],
    }),

    methods: {
      async validate() {
        if (this.$refs.form.validate()) {
          this.tosub = {
            cp: this.cp,
            trestbps: this.trestbps,
            chol: this.chol,
            fbs: this.fbs-1,
            restecg: this.restecg-1,
            thalach: this.thalach,
            exang: this.exang
          }
          await getAPI
            .post("/predict", this.tosub)
            .then(response => {
              const data = response.data
              console.log(data);
              
              this.prob= parseInt(data.prob)
              if (data.state == 0)
                {this.Nodisease = true
                this.disease = false
                this.prob=data.prob}
              else
                {this.disease = true
                this.Nodisease = false
                this.prob=data.prob}
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      reset() {
        this.$refs.form.reset()
        this.disease = false
        this.Nodisease = false
      },
      resetValidation() {
        this.$refs.form.resetValidation()
      },
    },
    computed: {
    // a computed getter
    probmsg: function () {
      // `this` points to the vm instance
      return this.prob
    }
  },
    mounted() {
      getAPI
        .get("/", )
        .then(() => {
          console.log("ready  ready to get data");

        })
        .catch(err => {
          console.log(err);
        });
    }
  }
</script>