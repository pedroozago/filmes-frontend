import React, { useState, useEffect } from 'react';
import api from './api';

function App() {

    const [filme, setFilme] = useState([]);

    useEffect(() => {
        api.get('/filme').then((response) => {
            const itens = response.data;
            setFilme(itens);
        })
    }, [])

    return (
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
    );

}

export default App;
