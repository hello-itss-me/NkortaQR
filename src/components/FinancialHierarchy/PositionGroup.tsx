import React, { useState } from 'react'
import { HierarchicalPositionGroup } from '../../types/financialHierarchy'
import { CollapsibleHeader, FinancialTotals } from './shared'
import { TransactionTypeGroup } from './TransactionTypeGroup'

interface PositionGroupProps {
  group: HierarchicalPositionGroup
  onItemQuantityChange: (itemId: string, newQuantity: number) => void
  onSelectMotor: (itemId: string) => void
}

export const PositionGroup: React.FC<PositionGroupProps> = ({
  group,
  onItemQuantityChange,
  onSelectMotor,
}) => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="ml-4">
      <CollapsibleHeader
        isExpanded={isExpanded}
        toggle={() => setIsExpanded(!isExpanded)}
        className="bg-gray-50 hover:bg-gray-100"
      >
        <h3 className="text-base font-semibold text-gray-700 truncate">
          {group.baseItemName}
        </h3>
        <FinancialTotals
          income={group.totalIncome}
          expense={group.totalExpense}
          profit={group.totalProfit}
        />
      </CollapsibleHeader>

      {isExpanded && (
        <div className="pt-2 pl-4 border-l-2 border-gray-200 ml-2 space-y-3">
          <TransactionTypeGroup
            group={group.incomeGroup}
            onItemQuantityChange={onItemQuantityChange}
            onSelectMotor={onSelectMotor}
          />
          <TransactionTypeGroup
            group={group.expenseGroup}
            onItemQuantityChange={onItemQuantityChange}
            onSelectMotor={onSelectMotor}
          />
        </div>
      )}
    </div>
  )
}
