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
    const client = await pool.connect();

    try {
        const { id } = req.params;
        const { name, cpf, email, school, address } = req.body;

        // Verificação inicial do ID
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID inválido ou não fornecido'
            });
        }

        // Verifica se o livro existe (corrigido: tabela livros, não users)
        const livroExists = await client.query('SELECT id FROM livros WHERE id = $1', [id]);
    
        if (livroExists.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Livro não encontrado'
            });
        }

        // Constrói a query dinamicamente baseada nos campos fornecidos
        const fieldsToUpdate = [];
        const values = [];
        let parameterIndex = 1;
    
        if (name !== undefined) {
            fieldsToUpdate.push(`name = $${parameterIndex}`);
            values.push(name);
            parameterIndex++;
        }
    
        if (cpf !== undefined) {
            fieldsToUpdate.push(`cpf = $${parameterIndex}`);
            values.push(cpf);
            parameterIndex++;
        }
    
        if (email !== undefined) {
            fieldsToUpdate.push(`email = $${parameterIndex}`);
            values.push(email);
            parameterIndex++;
        }
    
        if (school !== undefined) {
            fieldsToUpdate.push(`school = $${parameterIndex}`);
            values.push(school);
            parameterIndex++;
        }

        if (address !== undefined) {
            fieldsToUpdate.push(`address = $${parameterIndex}`);
            values.push(address);
            parameterIndex++;
        }
    
        // Se nenhum campo foi fornecido para atualização
        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Nenhum campo fornecido para atualização'
            });
        }
    
        // Adiciona o ID no final dos valores
        values.push(id);
    
        // Constrói a query final (corrigido: tabela livros, não users)
        const updateQuery = `
            UPDATE livros 
            SET ${fieldsToUpdate.join(', ')}
            WHERE id = $${parameterIndex}
            RETURNING *
        `;
    
        // Executa a atualização
        const result = await client.query(updateQuery, values);
    
        return res.status(200).json({
            success: true,
            message: 'Livro atualizado com sucesso',
            data: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}