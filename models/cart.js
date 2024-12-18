const fs=require('fs');
const path=require('path');

const p=path.join(path.dirname(process.mainModule.filename),'data','cart.json');

module.exports=class Cart{
    static addProduct(id,productPrice){
        //fetch the previous cart
        fs.readFile(p,(err,fileContent)=>{
            let cart={products:[],totalPrice:0};
            if(!err){
                cart=JSON.parse(fileContent);
            }
        
        //analyze the cart
        const existingProductIndex=cart.products.findIndex(prod=>prod.id==id);
        const existingProduct=cart.products[existingProductIndex];
        let updatedProduct;
        if(existingProduct){
            updatedProduct={...existingProduct};
            updatedProduct.qty+=1;
            cart.products=[...cart.products];
            cart.products[existingProductIndex]=updatedProduct;
        }else{
            updatedProduct={id:id,qty:1}
            cart.products=[...cart.products,updatedProduct]
        }
        cart.totalPrice+= +productPrice;
        console.log(cart);
        fs.writeFile(p,JSON.stringify(cart),err=>{
            console.log(err);
        });
    });
    }
    static getCart(cb){
        
        fs.readFile(p,(err,fileContent)=>{
            let cart={products:[],totalPrice:0};
            if(!err){
                cart=JSON.parse(fileContent);
                cb(cart);
            }});
            

        }
    
        static deleteProduct(id, price) {
            fs.readFile(p, (err, fileContent) => {
              if (err) {
                console.log('Error reading cart file:', err);
                return;
              }
          
              const updatedCart = { ...JSON.parse(fileContent) };
              const product = updatedCart.products.find(prod => prod.id === id);
          
              if (!product) {
                console.log('Product not found in cart');
                return;
              }
          
              const qty = product.qty;
              updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
              updatedCart.totalPrice = updatedCart.totalPrice - price * qty;
          
              fs.writeFile(p, JSON.stringify(updatedCart), err => {
                if (err) {
                  console.log('Error writing cart file:', err);
                }
              });
            });
          }
          
}