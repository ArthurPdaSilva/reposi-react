import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container, Owner, Loading, BackButton, IssuesList } from './styles';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

export default function Repositorio() {
  const { repositorio } = useParams();
  const [uniRepo, setUniRepo] = useState();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load(){
      // Ao invés de fazer duas requisições em tempos diferentes, eu posso fazer ao mesmo tempo
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

  if(loading){
    return(
      <Loading>
        <h1>Carregando repositório...</h1>  
      </Loading>
      
    )
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={35}/>
      </BackButton>

      <Owner>
        <img src={uniRepo.owner.avatar_url} alt={uniRepo.owner.login} />
        <h1>{uniRepo.name}</h1>
        <p>
          {uniRepo.description}
        </p>
      </Owner>

      <IssuesList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login}/>
            <div>
              <strong>
                <a href={issue.html_url}>
                  {issue.title}
                </a>

                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>

              <p>
                {issue.user.login}
              </p>
            </div>
          </li>
        ))}
      </IssuesList>
    </Container>
  );
}