class Item {
    constructor(id, name, unitPrice, rating = 0, ratingCounts = 0) {
      this.id = id;
      this.name = name;
      this.unitPrice = unitPrice;
      this.rating = rating;
      this.ratingCounts = ratingCounts;
    }
  
    // Optional: Add methods to manipulate item data
    getTotalPrice() {
      return this.unitPrice * this.quantity;
    }
  }
  
  export default Item;