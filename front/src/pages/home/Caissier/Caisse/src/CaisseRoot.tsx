import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Banks from './pages/Banks';
import Caisses from './pages/Caisses';
import CoffreForts from './pages/CoffreForts';
import MobileBankings from './pages/MobileBankings';
import Transactions from './pages/Transactions';
import useStorage from '../../../../../hook/useStorage';

const queryClient = new QueryClient();

function CaisseRoot() {

  const {tab, setTab} = useStorage<'/banks' | '/caisses' | '/coffreforts' | '/mobilebankings' | '/transactions'>('/banks')


  return (
    <QueryClientProvider client={queryClient}>
      <Layout setTab={setTab}>
      {(() => {
        switch (tab) {
          case '/banks':
            return <Banks/>
          case '/caisses':
            return <Caisses/>
          case '/coffreforts':
            return <CoffreForts/>
          case '/mobilebankings':
            return <MobileBankings/>
          case '/transactions':
            return <Transactions/>
          default:
            break;
        }
      })()}
      </Layout>
        {/* <Routes>
          <Route path="/" element={<Layout setTab={setTab}/>}>
            <Route index element={<Navigate to="banks" />} />
            <Route path="banks" element={<Banks />} />
            <Route path="caisses" element={<Caisses />} />
            <Route path="coffreforts" element={<CoffreForts />} />
            <Route path="mobilebankings" element={<MobileBankings />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
        </Routes>
      <Toaster position="top-right" /> */}
    </QueryClientProvider>
  );
}

export default CaisseRoot;