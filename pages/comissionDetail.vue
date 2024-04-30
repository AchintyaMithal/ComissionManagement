<template>
  <v-container class="commission-details">
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>
            <h3>System Case ID</h3>
          </v-card-title>
          <v-card-text>{{ commission.id }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>
            <h3>Commission Details</h3>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <span class="label">Case ID:</span>
                <span>{{ commission.id }}</span>
              </v-list-item>
              <v-list-item>
                <span class="label">Planned Date:</span>
                <span>{{ commission.plannedDate }}</span>
              </v-list-item>
              <v-list-item>
                <span class="label">Commission Type:</span>
                <span>{{ commission.type }}</span>
              </v-list-item>
              <v-list-item>
                <span class="label">Status:</span>
                <span>{{ commission.status }}</span>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>
        <h3>Case Description</h3>
      </v-card-title>
      <v-card-text>{{ commission.caseDescription }}</v-card-text>
    </v-card>
    <v-card>
      <v-card-title>
        <h3>Customer Details</h3>
      </v-card-title>
      <v-card-text>
        <v-list>
              <v-list-item>
                <span class="label">ID:</span>
                <span>{{ selectedCustomer.id }}</span>
              </v-list-item>
              <v-list-item>
                <span class="label">Name:</span>
                <span>{{ selectedCustomer.name }}</span>
              </v-list-item>
              <v-list-item>
                <span class="label">Email:</span>
                <span>{{ selectedCustomer.email }}</span>
              </v-list-item>
            </v-list>
        
       </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>
        <h3>Product Details</h3>
      </v-card-title>
      <v-card-text>
        <v-list>
              <v-list-item>
                <span class="label">ID:</span>
                <span>{{ selectedProduct.id }}</span>
              </v-list-item>
              <v-list-item>
                <span class="label">Name:</span>
                <span>{{ selectedProduct.name }}</span>
              </v-list-item>
              <v-list-item>
                <span class="label">Price:</span>
                <span>{{ selectedProduct.price }}</span>
              </v-list-item>
            </v-list>
        
       </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    
    return {
      commission: this.$route.params.id  ,
      selectedProduct : null,
      selectedCustomer :null
    }
  },
  created() {
    console.log(this.commission); // This should log the commission object (if passed)
    this.selectedProduct = this.$store.getters['counter/getProductById'](this.commission.productId);
  this.selectedCustomer = this.$store.getters['counter/getCustomerById'](this.commission.customerId);

  }
};
</script>

<style scoped>
.commission-details {
  padding: 20px;
}

.label {
  font-weight: bold;
}

.description {
  white-space: pre-wrap;
}
</style>
