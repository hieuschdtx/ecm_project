import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import App from './app';
import { store, persistor } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
          <PersistGate
            loading={null}
            persistor={persistor}
          >
            <App />
          </PersistGate>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </Provider>,
);
