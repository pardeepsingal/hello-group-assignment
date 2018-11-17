/* Load Trade entity */
const Trade = require('../model/trade');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Trade Data Access Object
 */
class TradeDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id,type,user,symbol, shares, price,timestamp FROM trades WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Trade(row.id, row.type, row.user, row.symbol, row.shares, row.price, row.timestamp));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM trades";
        return this.common.findAll(sqlRequest).then(rows => {
            let trades = [];
            for (const row of rows) {
                trades.push(new Trade(row.id, row.type, row.user, row.symbol, row.shares, row.price, row.timestamp));
            }
            if(trades.length > 0)
            {
                return trades;
            }else{
                return {status: 400, data: null, message: "There are no trades in the given date range"};
            }
            
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM trades";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Trade
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Trade) {
        let sqlRequest = "UPDATE trades SET " +
            "type=$type, " +
            "user=$user, " +
            "symbol=$symbol, " +
            "shares=$shares " +
            "price=$price " +
            "timestamp=$timestamp " +
            "WHERE id=$id";

        let sqlParams = {
            $type: Trade.type,
            $user: Trade.user,
            $symbol: Trade.symbol,
            $price: Trade.price,
            $id: Trade.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Trade
     * returns database insertion status
     */
    create(Trade) {
        let sqlRequest = "INSERT into trades (type, user, symbol, shares,price,timestamp) " +
            "VALUES ($type, $user, $symbol, $shares, $price, $timestamp)";
        let sqlParams = {
            $type: Trade.type,
            $user: Trade.user,
            $symbol: Trade.symbol,
            $shares: Trade.shares,
            $price: Trade.price,
            $timestamp: Trade.timestamp
        };
         
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Trade
     * returns database insertion status
     */
    tradeWithId(Trade) {
        let sqlRequest = "SELECT id FROM trades WHERE id=$id";
        let sqlParams = {$id: Trade.id};
        return this.common.findResultById(sqlRequest, sqlParams)
            .then(function(result) { 
               if(result && result > 0 )
               {
                    result;
               }else{
                
                let sqlRequest = "INSERT into trades (id, type, user, symbol, shares,price,timestamp) " +
                    "VALUES ($id, $type, $user, $symbol, $shares, $price, $timestamp)";
                let sqlParams = {
                    $id: Trade.id,
                    $type: Trade.type,
                    $user: Trade.user,
                    $symbol: Trade.symbol,
                    $shares: Trade.shares,
                    $price: Trade.price,
                    $timestamp: Trade.timestamp
                };
                
                 return this.common.run(sqlRequest, sqlParams);
               }
         });

     };
           

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM trades WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes all entity  
     * returns database deletion status
     */
    eraseAll() {
        let sqlRequest = "DELETE FROM trades ";     
        return this.common.deleterun(sqlRequest);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM trades WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = TradeDao;