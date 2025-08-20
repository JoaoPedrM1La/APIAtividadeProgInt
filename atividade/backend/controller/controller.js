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
        await pool.query('CREATE TABLE livros( id SERIAL PRIMARY KEY, name VARCHAR(100),text TEXT)');
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

export const enviarDados = async (req, res) => {
    const { name, text } = req.body;
    try {
        await pool.query('INSERT INTO livros (name, text) VALUES ($1, $2)', [name, text]);
        res.status(200).send({
            message: "Texto salvo"
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}