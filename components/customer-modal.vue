<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal" @click.stop>
      <h3>Select a Customer</h3>
      <!-- Search bar -->
      <input type="text" v-model="searchQuery" placeholder="Search Product" />

      <!-- Product list -->
      <div class="product-list">
        <div v-for="product in products" :key="product.id" @click="selectProduct(product)">
          {{ product.name }}
        </div>
      </div>
    </div>
    <div class="close" @click="$emit('close')"></div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  computed: {
    // filteredProducts() {
    //   return this.products.filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    // }
  },
  methods: {
    selectProduct(product) {
      this.$emit('product-selected', product);
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  text-align: center;
  background-color: white;
  width: 80%;
  max-width: 500px;
  padding: 20px;
  border-radius: 8px;
  position:relative !important;
  display: block !important;
  height: auto !important;
}

h3 {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.product-list div {
  padding: 10px;
  cursor: pointer;
}

.product-list div:hover {
  background-color: #f0f0f0;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background-size: cover;
}
</style>
