const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include:[
      {
        model: Product,
        attributes: ['id','product_name','price','stock']
      }
    ]
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    include:[
      {
        model: Product,
        attributes: ['id','product_name','price','stock']
      }
    ],
    where:{
      id: req.params.id
    }
  })
  .then(tagData => {
    if(!tagData){
      res.status(404).json({message: 'Tag not found matching this id'});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.params.tag_name
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.params.tag_name
    },
    {
      where:{
        id: req.params.id
      }
    }
  ).then(tagData => {
    if(!tagData){
      res.status(404).json({message: 'Tag not found matching this id'});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  Tag.delete({
    where:{
      id: req.params.id
    }
  })
  .then(tagData => {
    if(!tagData){
      res.status(404).json({message: 'Tag not found matching this id'});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

module.exports = router;
