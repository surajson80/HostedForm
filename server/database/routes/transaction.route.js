module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Transaction
    router.post("/", transactions.create);
  
    // Retrieve all Transactions
    router.get("/", transactions.findAll);

    // Retrieve a single Tutorial with id
    router.put("/:id", transactions.findOne);
  
    app.use('/api/transact', router);
  };