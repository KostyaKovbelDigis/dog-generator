import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Container } from '@mui/material';
import { Oval } from 'react-loader-spinner';

import store from './redux/store';
import './App.scss';
const Form = lazy(() => import('./components/form/form'));

const App: React.FC = () => {
  
  return (
    <Container maxWidth="md">
      <Suspense 
        fallback={
          <Oval
            height={80}
            width={80}
            color="blue"
            wrapperStyle={{}}
            wrapperClass="loader"
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#00BFFF"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        }
      >
        <Provider store={store}>
          <Form />
        </Provider>
      </Suspense>
    </Container>
  );
};

export default App;
