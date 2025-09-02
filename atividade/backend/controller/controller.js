import pool from '../database/database.js';

export const teste = async (req, res) => {
    res.send('Deu bom');
}

export const criarDB = async (req, res) => {
    try {
        await pool.query('CREATE DATABASE biblioteca;');
        await pool.query('\connect biblioteca');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const criarTBL = async (req, res) => {
    try {
        await pool.query('CREATE TABLE livros( id SERIAL PRIMARY KEY, name VARCHAR(100), cpf INT, email VARCHAR(100), school VARCHAR(255), address VARCHAR(255))');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const mostrarDados = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM livros');
        res.status(200).send(result.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const mostrarDadosEspec = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT FROM livros WHERE id = $1', [id]);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const enviarDados = async (req, res) => {
    const { name, cpf, email, school, address } = req.body;
    try {
        await pool.query('INSERT INTO livros (name, cpf, email, school, address) VALUES ($1, $2, $3, $4, $5)', [name, cpf, email, school, address]);
        res.status(200).send({
            message: "Texto salvo"
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const deletarDados = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM livros WHERE id = $1', [id]);
        res.status(200).send({
            message: "Texto deletado"
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const atualizarDados = async (req, res) => {
    const { id } = req.params;
    const { name, cpf, email, school, address } = req.body;
    try {
        await pool.query('UPDATE livros SET name = $1, cpf = $2, email = $3, school = $4, address = $5 WHERE id = $6', [name, cpf, email, school, address, id]);
        res.status(200).send({
            message: "Texto atualizado"
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}