import React, { useState } from 'react'
import { HierarchicalWorkGroup } from '../../types/financialHierarchy'
import { CollapsibleHeader, FinancialTotals } from './shared'
import { PositionGroup } from './PositionGroup'

interface WorkGroupProps {
  group: HierarchicalWorkGroup
  onItemQuantityChange: (itemId: string, newQuantity: number) => void
  onSelectMotor: (itemId: string) => void
}

export const WorkGroup: React.FC<WorkGroupProps> = ({
  group,
  onItemQuantityChange,
  onSelectMotor,
}) => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="border border-gray-200 rounded-lg">
      <CollapsibleHeader
        isExpanded={isExpanded}
        toggle={() => setIsExpanded(!isExpanded)}
        className="bg-indigo-50 hover:bg-indigo-100"
      >
        <h2 className="text-base font-bold text-indigo-800">
          {group.workGroup}
        </h2>
        <FinancialTotals
          income={group.totalIncome}
          expense={group.totalExpense}
          profit={group.totalProfit}
        />
      </CollapsibleHeader>

      {isExpanded && (
        <div className="p-3 space-y-3">
          {group.positions.map((pos) => (
            <PositionGroup
              key={pos.id}
              group={pos}
              onItemQuantityChange={onItemQuantityChange}
              onSelectMotor={onSelectMotor}
            />
          ))}
        </div>
      )}
    </div>
  )
}
