'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { calculateTax } from '../../utils/taxCalculator'

type InvestmentType = 'acoes' | 'etf' | 'fii';
export function TaxCalculator() {
  const [investmentType, setInvestmentType] = useState<InvestmentType | ''>('');
  const [buyValue, setBuyValue] = useState('')
  const [sellValue, setSellValue] = useState('')
  const [result, setResult] = useState<{ profit: number; tax: number } | null>(null)

  const handleCalculate = () => {
    if (investmentType && buyValue && sellValue) {
      const buyValueNum = parseFloat(buyValue)
      const sellValueNum = parseFloat(sellValue)
      const calculatedResult = calculateTax(investmentType, buyValueNum, sellValueNum)
      setResult(calculatedResult)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className='flex items-center justify-center'> 
        <CardTitle className="text-lg sm:text-xl text-gray-900">Calculadora de Imposto sobre Investimentos</CardTitle>
        <CardDescription>Calcule o imposto sobre seus investimentos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={(value) => setInvestmentType(value as InvestmentType)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de investimento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acoes">Ações</SelectItem>
              <SelectItem value="etf">ETF</SelectItem>
              <SelectItem value="fii">Fundo Imobiliário</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Valor total de compra"
            value={buyValue}
            onChange={(e) => setBuyValue(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Valor total de venda"
            value={sellValue}
            onChange={(e) => setSellValue(e.target.value)}
          />
          <Button onClick={handleCalculate} className="w-full">Calcular</Button>
        </div>
        {result && (
          <div className="mt-4">
            <p>Lucro: R$ {result.profit.toFixed(2)}</p>
            <p>Imposto a pagar: R$ {result.tax.toFixed(2)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

