const Product = require('../models/product');
const Cart=require('../models/cart');

exports.getProduct=(req,res,next)=>{
  const id=req.params.productId;
  Product.findProductById(id,product=>{
    if (!product) {
      return res.status(404).render('404', { // Render a 404 page if product not found
        pageTitle: 'Product Not Found',
        path: '/product/detail'
      });
    }
    res.render('shop/product-detail', {
      pageTitle: product.title,
      product: product,
      path: '/product/detail'
    });
  });
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart=>{
    const cartProd=[...cart.products];
    console.log(cartProd);
    Product.fetchAll((product)=>{
      let addedProducts=[];
      for(let i=0;i<cartProd.length;i++){
        const curr=product.find(p=>p.id==cartProd[i].id);
        curr.qty=cartProd[i].qty;
        if(curr){
          addedProducts.push(curr);
        }
      }
      console.log(addedProducts);
      console.log(cart);
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        cart:cart,
        products:addedProducts
      });
    });
  });
};

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findProductById(prodId,product=>{
    if (!product) {
      return res.status(404).render('404', { // Render a 404 page if product not found
        pageTitle: 'Product Not Found',
        path: '/product/detail'
      });
    }
    Cart.addProduct(product.id,product.price);
    res.redirect('/cart');
  });
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
