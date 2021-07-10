const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include:[
      {
        model: Product,
        attributes: ['id','product_name','price','stock']
      }
    ]
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where:{
      id: req.params.id
    }
  })
  .then(categoryData => {
    if(!categoryData){
      res.status(404).json({message: 'Category not found matching this id'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.params.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.params.category_name
    },
    {
      where:{
        id: req.params.id
      }
    }
  ).then(categoryData => {
    if(!categoryData){
      res.status(404).json({message: 'Category not found matching this id'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  Category.delete({
    where:{
      id: req.params.id
    }
  })
  .then(categoryData => {
    if(!categoryData){
      res.status(404).json({message: 'Category not found matching this id'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

module.exports = router;
