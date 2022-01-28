import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container } from './styles';
import api from '../../services/api';

export default function Repositorio() {
  const { repositorio } = useParams();
  const [uniRepo, setUniRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load(){
      //Ao invés de fazer duas requisições em tempos diferentes, eu posso fazer ao mesmo tempo
      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`, {
          // Faz a requisição dos que o state forem open e me traga 5 por vez
          params: {
            state: 'open',
            per_page: 5
          }
        })
      ]);

      setUniRepo(repositorioData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    load()
  }, [repositorio])
  return (
    <Container>
        <h1 style={{color: "#FFF"}}>Repositório: {repositorio}</h1>
    </Container>
  );
}