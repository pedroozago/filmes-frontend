import React, { useState, useEffect } from 'react';
import api from './api';
import { Link } from 'react-router-dom';

function App() {

    const [filme, setFilme] = useState([]);
    const [loading, setloading] = useState(true);

    //executa para obter informações externas
    useEffect(() => {
        api.get('/filme').then((response) => {
            const itens = response.data;
            setFilme(itens);
            setloading(false);
        })
    }, [])

    return (
        <>
            {loading ? <span>Carregando dados...</span> : <div/> }
            <table>
                {filme.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nome}</td>
                        <td>{item.diretor}</td>
                        <td>{item.ano}</td>
                        <td>
                            <input type="checkbox" checked={item.assistido}/>
                        </td>
                    </tr>
                ))}
            </table>
            <Link to="/create">Adicionar</Link>
        </>
    );

}

export default App;
