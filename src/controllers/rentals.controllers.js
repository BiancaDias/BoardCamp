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
        console.log(game.rows[0].pricePerDay)
        
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