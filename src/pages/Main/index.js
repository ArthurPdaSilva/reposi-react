import React, { useState, useCallback } from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';

import api from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    async function submit(){
      if(newRepo !== ''){
        setLoading(true);
        try{
          const response = await api.get(`repos/${newRepo}`);

          const data = {
            name: response.data.full_name,
          }
        
          setRepositorios([...repositorios, data]);
          setNewRepo('');
        }catch(error){
          console.log(error);
        }finally{
          setLoading(false);
        }
        
      }else{
        alert('Digite alguma coisa!');
      }
    }

    submit();
  }, [newRepo, repositorios]);

  return (
      <Container>
        
        <h1>
          <FaGithub size={25}/>
          Meus Repositórios
        </h1>

        <Form onSubmit={handleSubmit}>
          <input type="text" placeholder="Adicionar Repositórios" value={newRepo} onChange={(e) => setNewRepo(e.target.value)}/>
          
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner SIZE={14} color="#FFF"/>
            ) : (
              <FaPlus size={14} color="#FFF"/>
            )}
          </SubmitButton>
        </Form>
      </Container>
  );
}