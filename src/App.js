import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableHead,
    TableBody,
    TableCell,  
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent,
    DialogContentText, 
    TextField,
    DialogActions } from '@material-ui/core';
import './style.css';


function App() {

    const [ lista, setLista ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ nome, setNome] = useState('');
    const [ diretor, setDiretor] = useState('');
    const [ ano, setAno] = useState('');

    function loadData() {
        api.get('/filme').then((response) => {
            const itens = response.data;
            setLista(itens);
        })
    }

    useEffect(() => loadData(), []);

    const openModal = () => setOpen(true);

    const closeModal = () => setOpen(false);

    //Função para adicionar um novo filme
    function addFilme() { 
        const name = nome;
        const director = diretor;
        const year = ano;
        api.post('/filme', { nome: name, diretor: director, ano: year }).then((response) => {
        setNome('');
        setDiretor('');
        setAno('');
        setOpen(false);
        loadData()
        })
     }

     //Função para marcar um filme como 'Não assistido'
    function markAsAssistido(id, assistido) {
        if(assistido === true){
            api.patch(`/filme/${id}/naoassistido`).then((response) => {
                loadData()
            });
        } else {
                api.patch(`/filme/${id}/assistido`).then((response) => {
                loadData()
            });
        }
    }


    //Função para excluir um filme da lista.
     function deleteFilme(id) {
         api.delete(`/filme/${id}`).then((response) => {
            loadData()
         })
     }


    return (
        <>
        <Header />
        <Container maxWidth="lg" className="container">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome do Filme</TableCell>
                        <TableCell>Diretor</TableCell>
                        <TableCell>Ano de lançamento</TableCell>
                        <TableCell>Assistido?</TableCell>
                        <TableCell>Apagar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lista.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.nome}</TableCell>
                            <TableCell>{item.diretor}</TableCell>
                            <TableCell>{item.ano}</TableCell>
                            <TableCell>
                                <input type="checkbox" 
                                onChange={() => markAsAssistido(item.id, item.assistido)}                   
                                checked={item.assistido === true ? true : false}/>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" size="small" color="secondary" onClick={() => deleteFilme(item.id)} >Apagar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
            </Container>
            <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
                <DialogTitle id="form-dialog-title">Novo Filme</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Digite o filme que pretende adicionar.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nome"
                        label="Filme"
                        type="text"
                        fullWidth
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="diretor"
                        label="Diretor"
                        type="text"
                        fullWidth
                        value={diretor}
                        onChange={e => setDiretor(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="ano"
                        label="Ano"
                        type="number"
                        fullWidth
                        value={ano}
                        onChange={e => setAno(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={addFilme} color="primary">
                        Salvar
                    </Button>
                 </DialogActions>
            </Dialog>
        </>
    );

}

export default App;
