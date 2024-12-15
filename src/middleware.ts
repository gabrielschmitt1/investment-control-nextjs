import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken');
  const { pathname } = request.nextUrl;

  // Se não tem token e não está na página de login, redireciona para login
  if (!authToken && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se tem token e está na página de login, redireciona para dashboard
  if (authToken && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Se tem token e está na página de home, redireciona para dashboard
  if (authToken && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configura quais rotas serão verificadas pelo middleware
export const config = {
  matcher: ['/', '/login', '/dashboard']
};