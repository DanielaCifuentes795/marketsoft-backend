const { DataTypes } = require ('sequelize')
const sequelize = require ('../config/database')

const Provider = sequelize.define ('Provider',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING(100),
            allowNull:false,
            unique: {
                msg: 'Provider name already exists'
            },
            validate: {
                notEmpty:{
                    msg: 'Provider name cannot be empty'
                },
                len: {
                    args:[3,100],
                    msg: 'Provider name must be between 3 and 100 characters'
                }
            }
        },
        phone:{
            type: DataTypes.STRING(20),
            allowNull:false,
            validate: {
                notEmpty: {
                    msg: 'Provider phone cannot be empty'
                },
                len: {
                    args: [7,20],
                    msg: 'Phone must be between 7 and 20 characters'
                },
                isNumeric: {
                    msg: 'Phone must contain only numbers' 
                }
            }
            
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: {
            msg: 'Provider email already exists'
        },
        validate: {
          notEmpty: {
            msg: 'Provider email cannot be empty'
        },
        isEmail: {
          msg: 'Provider email must be a valid email'
      }
    }
  },
        city:{
            type: DataTypes.STRING(100),
            allowNull:false,
            validate: {
              notEmpty: {
                msg: 'Provider city cannot be empty'
            },
            len: {
              args: [2, 100],
              msg: 'City must be between 2 and 100 characters'
            }
        }
    }
}, {
        tableName: 'providers',
        timestamps:false
    }
);

module.exports = Provider;
