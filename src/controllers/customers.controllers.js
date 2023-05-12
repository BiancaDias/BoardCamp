import { db } from "../database/database.connection.js";

export async function postCustomers(req, res){
    const { name, phone, cpf, birthday } = req.body;

    try{
        const verCostumer = await db.query('SELECT * FROM customers WHERE cpf = $1;', [cpf]);
        if(verCostumer.rowCount > 0){
            return res.sendStatus(409);
        }

        await db.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);', [ name, phone, cpf, birthday]);
        res.sendStatus(201)
    }catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getCustomers(req, res){
    try{
        const customers = await db.query(`SELECT * FROM customers;`);
        return res.send(customers.rows);
    }catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getCustomersId(req, res){
    const { id } = req.params;

    try{
        const customers = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id]);

        if(customers.rowCount === 0){
            return res.sendStatus(404);
        }
        res.send(customers.rows[0]);
    }catch (err) {
        res.status(500).send(err.message);
    }
}

export async function putCustomersForId(req, res){
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;
    try{
        const verCostumer = await db.query('SELECT * FROM customers WHERE cpf = $1;', [cpf]);
        if(verCostumer.rowCount === 1){ // verifica quem é essa pessoa com esse cpf
            if(verCostumer.rows[0].id !== Number(id)){ // se são ids diferentes, são pessoas diferentes, nao pode
                return res.sendStatus(409);
            }
            
        }
        await db.query(`UPDATE customers SET name= $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`, [name, phone, cpf, birthday, id]);
        res.sendStatus(200);
    }catch (err) {
        res.status(500).send(err.message);
    }
}