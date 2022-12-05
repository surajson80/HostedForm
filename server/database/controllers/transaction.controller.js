const db = require("../models");
const Transaction = db.transaction5;
const Op = db.Sequelize.Op;

// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Transaction
  const transaction = {
    id: req.body.id,
    payment_id: req.body.payment_id,
    price: req.body.price,
    statusComplete: req.body.statusComplete
  };

  // Save Transaction in the database
  Transaction.create(transaction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction."
      });
    });
};

// Retrieve all Transactions from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Transaction.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions."
      });
    });
};

// Find a single Transaction with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Transaction.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Transaction with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Transaction with id=" + id
      });
    });
};

// Update a Transaction by the id in the request
// exports.update = (req, res) => {
//     const id = req.params.id;

//   Transaction.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Transaction was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update Transaction with id=${id}. Maybe Transaction was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Transaction with id=" + id
//       });
//     });
// };

// Delete a Transaction with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;

//   Transaction.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Transaction was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Transaction with id=${id}. Maybe Transaction was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Transaction with id=" + id
//       });
//     });
// };

// Delete all Transactions from the database.
// exports.deleteAll = (req, res) => {
//     Transaction.destroy({
//         where: {},
//         truncate: false
//       })
//         .then(nums => {
//           res.send({ message: `${nums} Transactions were deleted successfully!` });
//         })
//         .catch(err => {
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while removing all transactions."
//           });
//         });
// };

// Find all published Transactions
// exports.findAllPublished = (req, res) => {
//     Transaction.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving transactions."
//       });
//     });
// };