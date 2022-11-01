import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import NavigationBar from '../components/NavigationBar';
import { AuthContextProvider } from '../components/AuthContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationBar>
            <Component {...pageProps} />
          </NavigationBar>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
