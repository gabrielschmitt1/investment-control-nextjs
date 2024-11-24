'use client';

import { useRouter } from 'next/navigation';

const ErrorPage: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800">
      <h1 className="text-4xl font-bold mb-4">Acesso Negado</h1>
      <p className="mb-6 text-lg">Você não tem permissão para acessar esta página.</p>
      <button
        onClick={handleGoBack}
        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
      >
        Voltar para o Login
      </button>
    </div>
  );
};

export default ErrorPage;
