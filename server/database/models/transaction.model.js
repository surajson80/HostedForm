module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction5", {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      payment_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      statusComplete: {
        type: Sequelize.STRING,
      },
      price:{
        type: Sequelize.INTEGER,
      }

    });
    return Transaction;
  };