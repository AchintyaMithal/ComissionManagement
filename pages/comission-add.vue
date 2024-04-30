<template>
  <v-container>
    <!-- Heading and Back Button -->
    <v-card class="mb-5">
      <v-card-text class="d-flex align-center justify-space-between">
        <router-link to="/comission-list">Back</router-link>
        <h2 class="ml-5">Commissioning <span v-if="isEditing">Edit</span><span v-else>Create</span></h2>
        <div>
          <v-btn @click="saveDraft" v-if="!isEditing">Save Draft</v-btn>
          <v-btn color="primary" dark @click="createCase"><span v-if="isEditing">Edit</span><span v-else>Create</span> Case</v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Commission Form -->
    <v-card class="mb-5">
      <v-card-title><span v-if="isEditing">Edit</span><span v-else>Create New</span> Commissioning Case</v-card-title>
      <v-card-text>
        <!-- Commission Type -->
        <v-row>
          <v-col cols="12" sm="6">
            <v-select v-model="commissionType" :items="commissionTypes" label="Commission Type"></v-select>
          </v-col>
          <!-- Planned Date -->
          <v-col cols="12" sm="6">
            <v-text-field v-model="plannedDate" label="Planned Date" type="date"></v-text-field>
          </v-col>
          <!-- CRM Case ID -->
          <v-col cols="12">
            <v-text-field v-model="crmCaseId" label="CRM Case ID"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Case Description Card -->
    <v-card class="mb-5">
      <v-card-title>Case Description</v-card-title>
      <v-card-text>
        <v-textarea v-model="caseDescription" label="Case Description"></v-textarea>
      </v-card-text>
    </v-card>

    <!-- Product Details Card -->
    <v-card class="mb-5">
      <v-card-title>Product Details</v-card-title>
      <v-card-text>
        <!-- Serial Number -->
        <v-text-field v-model="serialNumber" label="Serial Number"></v-text-field>
        <!-- Select Product Button -->
        <v-btn @click="openProductModal">Select Product</v-btn>
        <!-- Selected Product -->
        <div v-if="selectedProduct">Selected Product: {{ selectedProduct.name }}</div>
        <!-- Product Modal -->
        <SavedModal v-if="isProductModalOpen" :products="products" @close="isProductModalOpen = false" @product-selected="onProductSelected" />
      </v-card-text>
    </v-card>

    <!-- Customer Details Card -->
    <v-card>
      <v-card-title>Customer Details</v-card-title>
      <v-card-text>
        <!-- Select Customer Button -->
        <v-btn @click="openCustomerModal">Select Customer</v-btn>
        <!-- Selected Customer -->
        <div v-if="selectedCustomer">Selected Customer: {{ selectedCustomer.name }}</div>
        <!-- Customer Modal -->
        <SavedModal v-if="isCustomerModalOpen" :products="customers" @close="isCustomerModalOpen = false" @product-selected="onCustomerSelected" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import SavedModal from '../components/products-modal.vue';
import CustomerModal from '../components/customer-modal.vue';

export default {
  components: { SavedModal, CustomerModal },
  data() {
    return {
      commissionType: '',
      plannedDate: '',
      crmCaseId: null,
      caseDescription: '',
      serialNumber: '',
      selectedProduct: null,
      selectedCustomer: null,
      isProductModalOpen: false,
      isCustomerModalOpen: false,
      isEditing: false,
      commissions: '',
      commissionTypes: ['Service', 'Warranty', 'Repair']
    };
  },
  computed: {
    // Get products from store
    products() { return this.$store.getters['counter/getProducts']; },
    // Get customers from store
    customers() { return this.$store.getters['counter/getCustomers']; },
    // Get product by ID
    productById() { return this.$store.getters['counter/getProductById'](this.productId); }
  },
  methods: {
    // Save draft commission
    saveDraft() {
      const commission = { type: this.commissionType, status: "pending", plannedDate: this.plannedDate, id: parseInt(this.crmCaseId), caseDescription: this.caseDescription, serialNumber: this.serialNumber, productId: this.selectedProduct.id, customerId: this.selectedCustomer.id };
      this.$store.dispatch('counter/saveDraft', commission);
      this.$router.push('/comission-list');
    },
    // Create commission
    createCase() {
      const commission = { type: this.commissionType, status: "open", plannedDate: this.plannedDate, id: parseInt(this.crmCaseId), caseDescription: this.caseDescription, serialNumber: this.serialNumber, productId: this.selectedProduct.id, customerId: this.selectedCustomer.id };
      this.isEditing ? this.$store.dispatch('counter/updateComission', commission) : this.$store.dispatch('counter/saveDraft', commission);
      this.$router.push('/comission-list');
    },
    // Open product modal
    openProductModal() { this.isProductModalOpen = true; },
    // Open customer modal
    openCustomerModal() { this.isCustomerModalOpen = true; },
    // Handle product selection
    onProductSelected(product) { this.selectedProduct = product; this.isProductModalOpen = false; },
    // Handle customer selection
    onCustomerSelected(customer) { this.selectedCustomer = customer; this.isCustomerModalOpen = false; }
  },
  created() {
    // Get commission data if editing
    this.commissions = this.$route.params.id;
    if (this.commissions) {
      this.isEditing = true;
      this.commissionType = this.commissions.type;
      this.crmCaseId = this.commissions.id;
      this.plannedDate = this.commissions.plannedDate;
      this.serialNumber = this.commissions.serialNumber;
      this.caseDescription = this.commissions.caseDescription;
      this.selectedProduct = this.$store.getters['counter/getProductById'](this.commissions.productId);
      this.selectedCustomer = this.$store.getters['counter/getCustomerById'](this.commissions.customerId);
    }
  }
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
