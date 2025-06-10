import { Route, Routes, Navigate } from 'react-router-dom';
import {
  Recharger,
  Register,
  Login,
  PurchaseForm,
  TransactionList,
} from './pages';
import { useAuthentication } from './services/auth/provider';
import DetailsEvent from './pages/detailsEvent';

export function App() {
  const { user, isLoading } = useAuthentication();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route
          path="*"
          element={<Navigate to={user ? '/transactions' : '/'} replace />}
        />

        {!user && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        {user && (
          <>
            <Route path="/purchase" element={<PurchaseForm />} />
            <Route path="/details-event" element={< DetailsEvent/>} />

            <Route path="/transactions" element={<TransactionList />} />
            <Route path="/recharger" element={<Recharger />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
