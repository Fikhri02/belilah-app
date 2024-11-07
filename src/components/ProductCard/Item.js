class Item {
    constructor(id, code, name, unitPrice, rating = 0, ratingCounts = 0, imageUrl = "") {
      this.id = id;
      this.code = code;
      this.name = name;
      this.unitPrice = unitPrice;
      this.rating = rating;
      this.ratingCounts = ratingCounts;
      this.imageUrl = imageUrl;
    }
  
    // // Optional: Add methods to manipulate item data
    // getTotalPrice() {
    //   return this.unitPrice * this.quantity;
    // }
  }
  
  export default Item;