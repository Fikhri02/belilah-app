class CartItems {
    constructor(id, quantity, item) {
      this.id = id;
      this.quantity = quantity;
      this.item = item;
    }
  
    // Optional: Add methods to manipulate item data
    getTotalPrice() {
      return this.unitPrice * this.quantity;
    }
  }
  
  export default CartItems;