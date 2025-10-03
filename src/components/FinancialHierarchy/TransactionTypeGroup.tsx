import React, { useState } from 'react'
import { HierarchicalTransactionGroup } from '../../types/financialHierarchy'
import { CollapsibleHeader, formatCurrency } from './shared'
import { ItemCard } from './ItemCard'

interface TransactionTypeGroupProps {
  group: HierarchicalTransactionGroup
  onItemQuantityChange: (itemId: string, newQuantity: number) => void
  onSelectMotor: (itemId: string) => void
}

export const TransactionTypeGroup: React.FC<TransactionTypeGroupProps> = ({
  group,
  onItemQuantityChange,
  onSelectMotor,
}) => {
  const [isExpanded, setIsExpanded] = useState(true)

  if (group.items.length === 0) {
    return null
  }

  const isIncome = group.type === 'income'
  const headerColor = isIncome
    ? 'bg-green-50 hover:bg-green-100'
    : 'bg-red-50 hover:bg-red-100'
  const textColor = isIncome ? 'text-green-800' : 'text-red-800'

  return (
    <div className="ml-4">
      <CollapsibleHeader
        isExpanded={isExpanded}
        toggle={() => setIsExpanded(!isExpanded)}
        className={headerColor}
      >
        <h4 className={`text-sm font-semibold ${textColor}`}>
          {isIncome ? 'Доходы' : 'Расходы'}
        </h4>
        <span className={`text-sm font-bold ml-auto ${textColor}`}>
          {formatCurrency(group.totalAmount)}
        </span>
      </CollapsibleHeader>

      {isExpanded && (
        <div className="pt-2 pl-4 border-l-2 border-gray-200 ml-2 space-y-2">
          {group.items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onQuantityChange={onItemQuantityChange}
              onSelectMotor={onSelectMotor}
            />
          ))}
        </div>
      )}
    </div>
  )
}
