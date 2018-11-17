/* Load trade Data Access Object */
const TradeDao = require('../dao/tradeDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Trade entity */
const Trade = require('../model/trade');

/**
 * Trade Controller
 */
class TradeController {

    constructor() {
        this.tradeDao = new TradeDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.tradeDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.tradeDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.tradeDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

     

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let trade = new Trade();
        if (req.body.id) {
            trade.id = req.body.id;
        }
        trade.type = req.body.type;
        trade.user = req.body.user;
        trade.symbol = req.body.symbol;
        trade.shares = req.body.shares;
        trade.price = req.body.price;
        trade.timestamp = req.body.timestamp;

        return this.tradeDao.create(trade)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));

                /*
        if (req.body.id) {
              return this.tradeDao.tradeWithId(trade)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
      
        }
        else {
              return this.tradeDao.create(trade)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
      
        }  */

    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.id;

        this.tradeDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Deletes all entity with one click
     * @params req, res
     * returns database deletion status
     */
    erase(req, res) {         

        this.tradeDao.eraseAll()
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        this.tradeDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = TradeController;