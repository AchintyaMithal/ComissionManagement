import commissionsData from '../../assets/data.json';

export default () =>({
    
    comisson:[],
    products: [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
      { id: 3, name: 'Product 3', price: 150 }
      // Add more sample products as needed
    ],
    customers: [
      { id: 1, name: 'Customer 1', email: 'customer1@example.com' },
      { id: 2, name: 'Customer 2', email: 'customer2@example.com' },
      { id: 3, name: 'Customer 3', email: 'customer3@example.com' }
      // Add more sample customers as needed
    ]
      
})