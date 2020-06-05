import React, { useState, useEffect } from 'react';
import api from './api';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        <div  style={{marginTop: '80px'}}>
            {loading ? <CircularProgress /> : <div/> }
            <Table>
                <TableBody>
                {filme.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell>{item.diretor}</TableCell>
                        <TableCell>{item.ano}</TableCell>
                        <TableCell>
                            <input type="checkbox" checked={item.assistido}/>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <br/>
            {/* <Link to="/create">Adicionar</Link> */}
            <Button variant="contained" color="primary">
                Primary
            </Button>
        </div>
    );

}

export default App;
