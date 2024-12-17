const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  console.log(req.query);
  console.log(editMode);
  if(editMode=='false'){
    return res.redirect('/admin/add-product');
  }
  const prodId=req.params.productId;
  Product.findProductById(prodId,product=>{
    if(!product){
      return res.redirect('/');
    }
    product={...product}
    product.price= +product.price;
    console.log(product);
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      prod:product
    });
  })
};

exports.postEditProduct=(req,res,next)=>{
const prodId=req.body.prodId;
const title=req.body.title;
const price=req.body.price;
const url=req.body.imageUrl;
const desc=req.body.description;
const upProduct=new Product(prodId,title,url,desc,price);
upProduct.save();
res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
