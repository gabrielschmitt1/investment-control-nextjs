'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './LoginPage.module.css';
import Link from 'next/link';

interface FormData {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    remember: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token } = response.data;

      document.cookie = `authToken=${token}; path=/;`;
      router.push('/home');
    } catch (err) {
      setError('Credenciais inválidas!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <h1 className={styles.title}>
              Entre na sua conta
            </h1>
            
            {error && <div className={styles.error}
              id="error-message" // ID único
              data-testid="error-message" // Atributo para testes
              role="alert" // Semântica para acessibilidade
            >{error}</div>}
            
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label 
                  htmlFor="email" 
                  className={styles.label}
                >
                  Seu email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={styles.input}
                  placeholder="nome@empresa.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label 
                  htmlFor="password" 
                  className={styles.label}
                >
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={styles.input}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.checkboxContainer}>
                <div className={styles.checkboxWrapper}>
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={formData.remember}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.checkboxLabel}>
                    <label htmlFor="remember">
                      Lembrar-me
                    </label>
                  </div>
                </div>
                <a href="#" className={styles.forgotPassword}>
                  Esqueceu a senha?
                </a>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? 'Carregando...' : 'Entrar'}
              </button>
              
              <p className={styles.registerText}>
                Ainda não tem uma conta?{' '}
                <Link href="/signup" className={styles.registerLink}>
                  Cadastre-se
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;