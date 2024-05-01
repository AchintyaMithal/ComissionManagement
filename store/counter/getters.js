export default {
  getCommission(state){
    return state.comisson;
  },
  getProducts(state){
    return state.products;
  },
  getProductById: (state) => (id) => {
    const product = state.products.find(product => product.id === id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    return product;
  },
  getCustomerById: (state) => (id) => {
    const customer = state.customers.find(customer => customer.id === id);
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found.`);
    }
    return customer;
  },
  getCustomers(state){
    return state.customers;
  }
};
