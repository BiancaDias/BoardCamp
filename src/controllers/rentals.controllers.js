import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function postRentals(req, res){
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs().format('YYYY-MM-DD');
    try{
        const game = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
        if(game.rowCount === 0){
            return res.sendStatus(400)
        }
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId]);
        if(customer.rowCount === 0){
            return res.sendStatus(400)
        }

        const gameRented = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1`, [gameId]);
        if(gameRented.rowCount === game.rows[0].stockTotal){
            return res.sendStatus(400);
        }
        
        const originalPrice = daysRented * game.rows[0].pricePerDay;
        await db.query(`INSERT INTO rentals (
                "customerId",
                "gameId",
                "rentDate",
                "daysRented",
                "returnDate",
                "originalPrice",
                "delayFee"
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
        )
        res.sendStatus(201)
    }catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postRentalsReturn(req, res){
    const { id } = req.params;
    const returnDate = dayjs().format('YYYY-MM-DD');
    const returnDateForCalc = dayjs().startOf('day');
    try{
        const rental = await db.query(`SELECT * FROM rentals WHERE id = $1;`, [id])
        if(rental.rowCount === 0){
            return res.sendStatus(404);
        }
        if(rental.rows[0].delayFee !== null){
            return res.sendStatus(400)
        }
        const days = Math.floor((returnDateForCalc.valueOf() - rental.rows[0].rentDate.valueOf())/86400000);
        let delayFee;
        if(days > rental.rows[0].daysRented){
            delayFee = (days - rental.rows[0].daysRented) * (rental.rows[0].originalPrice / rental.rows[0].daysRented)
        }else{
            delayFee = 0;
        }

        await db.query(`UPDATE rentals SET "delayFee" = $1, "returnDate" = $2 WHERE id = $3;`,[delayFee, returnDate, id])
        res.sendStatus(200)
    }catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteRentals(req, res){
    const { id } = req.params;
    try{
        const rental = await db.query(`SELECT * FROM rentals WHERE id = $1;`, [id])
        if(rental.rowCount === 0){
            return res.sendStatus(404);
        }
        if(rental.rows[0].delayFee === null){
            return res.sendStatus(400)
        }
        await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);
        res.sendStatus(200)
    }catch (err) {
        res.status(500).send(err.message)
    }
}