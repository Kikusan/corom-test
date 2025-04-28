import './App.css';
import Layout from './Layout';
import { Router } from './Router';
import { NotificationProvider } from './utils/notifications/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <Layout>
        <Router />
      </Layout>
    </NotificationProvider>
  );
}

export default App;
