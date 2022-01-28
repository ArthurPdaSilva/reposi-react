import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container, Owner, Loading, BackButton, IssuesList, PageAction, FilterList } from './styles';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

export default function Repositorio() {
  const { repositorio } = useParams();
  const [uniRepo, setUniRepo] = useState();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    {state: 'all', label: 'Todas', active: true},
    {state: 'open', label: 'Abertas', active: false},
    {state: 'closed', label: 'Fechadas', active: false}
  ])
  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    async function load(){
      // Ao invés de fazer duas requisições em tempos diferentes, eu posso fazer ao mesmo tempo
      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`, {
          // Faz a requisição dos que o state forem open e me traga 5 por vez
          params: {
            state: filters.find(f => f.active).state,
            per_page: 5
          }
        })
      ]);
        
        setUniRepo(repositorioData.data);
        setIssues(issuesData.data);
        setLoading(false);
    }

    load()
  }, [filters, repositorio])

  useEffect(() => {
    async function loadIssue(){
      const response = await api.get(`/repos/${repositorio}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 5
        }
      });

      setIssues(response.data)
    }

    loadIssue();

  }, [filterIndex, filters, page, repositorio])

  function handlePage(action){
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  function handleFilter(index){
    setFilterIndex(index);
  }

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

      <FilterList active={filterIndex}>
        {filters.map((filter, index) => (
          <button key={filter.label} type="button" onClick={() => handleFilter(index)}>{filter.label}</button>
        ))}
      </FilterList>

      <IssuesList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login}/>
            <div>
              <strong>
                <a href={issue.html_url} target="_blank" rel="noreferrer">
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

      <PageAction>
        <button type="button" onClick={() => handlePage('back')} disabled={page < 2}>Voltar</button>
        <button type="button" onClick={() => handlePage('next')}>Próxima</button>
      </PageAction>
    </Container>
  );
}