'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './HomePage.module.css'; // Importando o CSS modular

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Obtém o token dos cookies
    const getTokenFromCookies = () => {
      const cookies = document.cookie.split('; ');
      const tokenCookie = cookies.find((row) => row.startsWith('authToken='));
      return tokenCookie?.split('=')[1];
    };

    const token = getTokenFromCookies();
    if (!token) {
      // Redireciona para a página de login se não houver token
      router.push('/error');
    }
  }, [router]);

  const handleLogout = () => {
    // Remove o token do cookie
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    // Redireciona para a página de login
    router.push('/login');
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Bem-vindo à Página Home</h1>
      <p className={styles.description}>Você está logado no sistema.</p>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair
      </button>
    </div>
  );
};

export default HomePage;
