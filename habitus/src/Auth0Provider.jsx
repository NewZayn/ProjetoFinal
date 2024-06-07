import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="{dev-z0487levipd7htl5.us.auth0.com}"
    clientId="{J9Upm1Sal0UMXYZLmKAqbmHB5oU7GPYz}"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);