type InvestmentType = 'acoes' | 'etf' | 'fii'
export function calculateTax(type: InvestmentType, buyValue: number, sellValue: number) {
  const profit = sellValue - buyValue
  let taxRate = 0
  let tax = 0

  switch (type) {
    case 'acoes':
      taxRate = 0.15
      if (profit > 0 && sellValue <= 20000) {
        tax = 0 // Isenção para vendas até R$ 20.000,00
      } else {
        tax = profit * taxRate
      }
      break
    case 'etf':
      taxRate = 0.15
      tax = profit * taxRate
      break
    case 'fii':
      taxRate = 0.20
      tax = profit * taxRate
      break
  }

  return { profit, tax }
}

