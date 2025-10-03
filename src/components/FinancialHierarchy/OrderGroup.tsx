import React, { useState } from 'react'
import { HierarchicalOrderGroup } from '../../types/financialHierarchy'
import { CollapsibleHeader, FinancialTotals } from './shared'
import { WorkGroup } from './WorkGroup'

interface OrderGroupProps {
  order: HierarchicalOrderGroup
  onItemQuantityChange: (itemId: string, newQuantity: number) => void
  onSelectMotor: (itemId: string) => void
}

export const OrderGroup: React.FC<OrderGroupProps> = ({
  order,
  onItemQuantityChange,
  onSelectMotor,
}) => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <CollapsibleHeader
        isExpanded={isExpanded}
        toggle={() => setIsExpanded(!isExpanded)}
        className="hover:bg-gray-50"
      >
        <div className="flex items-center gap-3 flex-grow min-w-0">
          <span className="flex items-center justify-center w-6 h-6 bg-indigo-600 text-white rounded-full text-xs font-bold flex-shrink-0">
            {order.orderNumber || '#'}
          </span>
          <h2 className="text-base font-bold text-gray-800 truncate">
            {order.orderName || 'Заказ без названия'}
          </h2>
        </div>
        <FinancialTotals
          income={order.totalIncome}
          expense={order.totalExpense}
          profit={order.totalProfit}
        />
      </CollapsibleHeader>

      {isExpanded && (
        <div className="pt-3 space-y-3">
          {order.workGroups.map((wg) => (
            <WorkGroup
              key={wg.id}
              group={wg}
              onItemQuantityChange={onItemQuantityChange}
              onSelectMotor={onSelectMotor}
            />
          ))}
        </div>
      )}
    </div>
  )
}
