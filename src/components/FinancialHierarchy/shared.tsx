import React from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(amount)

interface CollapsibleHeaderProps {
  isExpanded: boolean
  toggle: () => void
  children: React.ReactNode
  className?: string
}

export const CollapsibleHeader: React.FC<CollapsibleHeaderProps> = ({
  isExpanded,
  toggle,
  children,
  className = '',
}) => (
  <div
    onClick={toggle}
    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${className}`}
  >
    <div className="flex items-center space-x-3 flex-grow min-w-0">
      {children}
    </div>
    <button className="text-gray-500 hover:text-indigo-600 flex-shrink-0">
      {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
    </button>
  </div>
)

interface FinancialTotalsProps {
  income: number
  expense: number
  profit: number
}

export const FinancialTotals: React.FC<FinancialTotalsProps> = ({
  income,
  expense,
  profit,
}) => (
  <div className="flex items-center space-x-4 text-sm ml-auto flex-shrink-0">
    <div className="flex items-center space-x-1 text-green-600 font-semibold">
      <span className="text-xs text-gray-500 font-medium">Доходы:</span>
      <span>{formatCurrency(income)}</span>
    </div>
    <div className="flex items-center space-x-1 text-red-600 font-semibold">
      <span className="text-xs text-gray-500 font-medium">Расходы:</span>
      <span>{formatCurrency(expense)}</span>
    </div>
    <div className="flex items-center space-x-1 text-indigo-600 font-bold">
      <span className="text-xs text-gray-500 font-medium">Прибыль:</span>
      <span>{formatCurrency(profit)}</span>
    </div>
  </div>
)
