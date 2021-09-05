import React, { useReducer } from 'react';
import DocumentContext from './DocumentContext';

const initialState = {
    title: '',
    textDocument: [],
};

export const DOCUMENT_ACTIONS = {
    AGREGAR_TODO: 0,
    AGREGAR_CONDICION: 1,
    AGREGAR_TEXTO: 2,
    AGREGAR_TITULO: 3,
};

const DocumentReducer = (state = initialState, action) => {
    switch (action.type) {
        case DOCUMENT_ACTIONS.AGREGAR_TODO: {
            const infoDocument = action.payload;
            console.log(infoDocument)
            return {
                ...state,
                title: action.payload.titulo,
                textDocument: action.payload.textoDocumento
            };
        }
        case DOCUMENT_ACTIONS.AGREGAR_CONDICION: {
            // const newToken = action.payload;
            return {
                ...state,
            };
        }
        case DOCUMENT_ACTIONS.AGREGAR_TEXTO: {
            return {
                ...state,
            };
        }
        case DOCUMENT_ACTIONS.AGREGAR_TITULO: {
            return {
                ...state,
                email: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};

export function DocumentProvider({ children }) {
    const [state, dispatch] = useReducer(DocumentReducer, initialState);

    return (
        <DocumentContext.Provider value={[state, dispatch]}>
            {children}
        </DocumentContext.Provider>
    );
}