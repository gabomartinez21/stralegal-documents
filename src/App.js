
import React from 'react'
import styled from 'styled-components'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CreateDocument from './components/createDocument';
import EditDocument from './components/editDocument';
import CreateVariables from './components/createVariables';
import ListDocuments from './components/listDocuments';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard';
import {DocumentProvider} from './context/DocumentProvider';

function App() {
  return (
    <DocumentProvider>
      <Router>
        <div className="adminContainer">
          <Sidebar/>
          <Content>

            <Switch>
                <Route path="/" exact>
                  <Dashboard />
                </Route>
                <Route path="/crear-documento">
                  <CreateDocument />
                </Route>
                <Route path="/editar-documento/:id">
                  <EditDocument />
                </Route>
                <Route path="/crear-variables">
                  <CreateVariables />
                </Route>
                <Route path="/listar-documentos">
                  <ListDocuments />
                </Route>
                
              </Switch>
          </Content>
        </div>

      </Router>
    </DocumentProvider>
  );
}

export default App;

const Content = styled.div`
  padding: 2rem 1.5rem;

`
