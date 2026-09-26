const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Product = sequelize.define('Product', {
      id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true

    },
    name:{
        type:DataTypes.STRING(100),
        allowNull: false,
        unique: {
          msg: 'Product name already exists'
        },
        validate: {
            notEmpty:{
               msg: 'Product name connot be empty'   
            },
            len: {
                args: [3, 100],
                msg: 'Product name must be between 3 and 100 characters'
            }
        }
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    price: {
       type: DataTypes.DECIMAL(10, 2),
       allowNull: false,
       validate: {
           notEmpty: {
              msg: 'Product price can not be empty'
            },
            isDecimal: {
                msg:'Product price must be a decimal number'
            },
            min: {
                args: [0.01],
                msg: 'Product price must be greater than 0'
            }
        }
    },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: {
         msg: 'Stock must be an integer'
      },
       min: {
        args: [0],
        msg: 'Stock cannot be negative'
      }
    }
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'providers',
      key: 'id'
    }
  }
}, {
    tableName: 'products', 
    timestamps: true,
})

module.exports = Product
    