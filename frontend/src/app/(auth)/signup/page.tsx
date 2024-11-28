'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './SignUpPage.module.css';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
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

  const validateForm = (): string => {
    if (formData.password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'As senhas não coincidem';
    }
    if (!formData.terms) {
      return 'Você deve aceitar os termos de uso';
    }
    return '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      const { token } = response.data;
      document.cookie = `authToken=${token}; path=/;`;
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar conta. Tente novamente.');
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
              Crie sua conta
            </h1>
            
            {error && <div className={styles.error}
              id="error-message" // ID único
              data-testid="error-message" // Atributo para testes
              role="alert" // Semântica para acessibilidade
            >{error}</div>}
            
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label 
                  htmlFor="name" 
                  className={styles.label}
                >
                  Seu nome completo
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={styles.input}
                  placeholder="João Silva"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

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
                <small className={styles.hint}>
                  Mínimo de 6 caracteres
                </small>
              </div>

              <div className={styles.formGroup}>
                <label 
                  htmlFor="confirmPassword" 
                  className={styles.label}
                >
                  Confirme sua senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className={styles.input}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.checkboxContainer}>
                <div className={styles.checkboxWrapper}>
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={formData.terms}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.checkboxLabel}>
                    <label htmlFor="terms">
                      Eu li e aceito os{' '}
                      <a href="#" className={styles.link}>
                        termos de uso
                      </a>
                      {' '}e a{' '}
                      <a href="#" className={styles.link}>
                        política de privacidade
                      </a>
                    </label>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? 'Criando conta...' : 'Criar conta'}
              </button>
              
              <p className={styles.loginText}>
                Já tem uma conta?{' '}
                <Link href="/login" className={styles.loginLink}>
                  Entre aqui
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;