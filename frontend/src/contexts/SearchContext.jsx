import React, { createContext, useReducer, useCallback } from 'react';

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

export function SearchProvider({ children }) {
  
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const buscarPersonagens = useCallback(async (termo) => {
    dispatch({ type: 'BUSCA_INICIADA' });

    const url = termo 
      ? `https://api.disneyapi.dev/character?name=${termo}`
      : `https://api.disneyapi.dev/character?pageSize=50`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      dispatch({ type: 'BUSCA_SUCESSO', payload: data.data || [] });
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      dispatch({ type: 'BUSCA_ERRO', payload: 'Não foi possível carregar os personagens.' });
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