export default {
 
  getCommission(state){
    return state.comisson;
  },
  getProducts(state){
    return state.products;
  },
  getProductById: (state) => (id) => {
    return state.products.find(product => product.id === id);
  },
  getCustomerById: (state) => (id) => {
    return state.customers.find(customer => customer.id === id);
  },

  getCustomers(state){
    return state.customers;
  }
};
