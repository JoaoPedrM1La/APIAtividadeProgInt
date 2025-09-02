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
    const { nome, telefone, email, idade } = req.body;
    try {
        await pool.query('UPDATE livros SET nome = $1, telefone = $2, email = $3, idade = $4 WHERE id = $5', [nome, telefone, email, idade, id]);
        res.status(200).send({
            message: "Texto atualizado"
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}