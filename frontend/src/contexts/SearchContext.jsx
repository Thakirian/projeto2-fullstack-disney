import React, { createContext, useReducer, useCallback } from 'react';
import AuthService from '../services/AuthService';

export const SearchContext = createContext();

const initialState = {
  personagens: [],
  carregando: false,
  erro: null,
  termoBusca: '',
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'BUSCA_INICIADA':
      return { ...state, carregando: true, erro: null };
    
    case 'BUSCA_SUCESSO':
      return { ...state, carregando: false, personagens: action.payload };

    case 'BUSCA_ERRO':
      return { ...state, carregando: false, erro: action.payload, personagens: [] };

    case 'ATUALIZAR_TERMO_BUSCA':
        return { ...state, termoBusca: action.payload };

    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
};

const API_URL_THAS_BACKEND = 'http://localhost:3001/api/personagens';

export function SearchProvider({ children }) {
  
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const buscarPersonagens = useCallback(async (query) => {
    dispatch({ type: 'BUSCA_INICIADA' });

    const url = query 
        ? `${API_URL_THAS_BACKEND}?nome=${encodeURIComponent(query)}` 
        : API_URL_THAS_BACKEND;

    const token = AuthService.getToken();
    
    try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
          },
      });

      if (response.status === 401) {
          AuthService.logout();
          throw new Error('Sessão expirada. Faça login novamente.');
      }

      if (!response.ok) {
          throw new Error('Erro ao carregar personagens do servidor.');
      }

      const data = await response.json();

      dispatch({ type: 'BUSCA_SUCESSO', payload: data }); 
      
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error.message);
      dispatch({ type: 'BUSCA_ERRO', payload: error.message });
    }
  }, []);

  const setTermoBusca = (termo) => {
    dispatch({ type: 'ATUALIZAR_TERMO_BUSCA', payload: termo });
  };

  const value = {
    personagens: state.personagens,
    carregando: state.carregando,
    erro: state.erro,
    termoBusca: state.termoBusca,
    setTermoBusca,
    buscarPersonagens,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}