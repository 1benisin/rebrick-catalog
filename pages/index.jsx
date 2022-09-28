import ProtectedRoute from '../components/ProtectedRoute';

export default function Home() {
  return (
    <ProtectedRoute>
      <div>
        <h2>Home page</h2>
      </div>
    </ProtectedRoute>
  );
}
