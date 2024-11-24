import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;

  // Se o token não existir, redireciona para a página de erro
  if (!token) {
    return NextResponse.redirect(new URL('/error', request.url));
  }

  // Caso contrário, permite o acesso
  return NextResponse.next();
}

// Define as rotas que devem passar pelo middleware
export const config = {
  matcher: ['/home/:path*'], // Adicione as rotas protegidas aqui
};
