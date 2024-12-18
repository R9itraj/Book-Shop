const fs = require('fs');
const path = require('path');

const cart=require('./cart');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id){
        const existingProductIndex=products.findIndex(prod=>prod.id===this.id);
        let updatedProducts=[...products];
        updatedProducts[existingProductIndex]=this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }else{
        this.id=Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
        });
      }
      
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findProductById(id,cb){
    getProductsFromFile(prod=>{
        const product=prod.find(p=>p.id==id);
        cb(product);
      });
  }
  static deleteById(id) {
    getProductsFromFile(prod => {
      const product = prod.find(pro => pro.id === id);
      if (!product) {
        // Product not found, return early
        return;
      }
  
      const updatedProducts = prod.filter(pro => pro.id !== id);
  
      // Attempt to write the updated product list
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (err) {
          console.log('Error writing products file:', err);
        } else {
          // If successful, delete product from cart as well
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
  
};
