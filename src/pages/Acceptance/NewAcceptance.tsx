import React, { useState } from 'react'
import { AppLayout } from '../../components/Layout/AppLayout'
import { Button } from '../../components/ui/Button'
import { Plus, Download } from 'lucide-react'
import { AcceptanceHeaderForm } from '../../components/Acceptance/AcceptanceHeaderForm'
import { FinancialHierarchyView } from '../../components/FinancialHierarchy/FinancialHierarchyView'
import { FinancialRow } from '../../types/financialHierarchy'
import { exportAssembledPositionsToExcel } from '../../utils/exportToExcel'

const SERVICE_NAME = 'Ремонт электродвигателя Необходимо обновить значение'

// --- Mock Data based on User's Excel Table ---
const mockFinancialData: FinancialRow[] = [
  { id: '1', serviceName: SERVICE_NAME, itemName: 'Ремонт электродвигателя Необходимо обновить значение_ID_7f4ae9c0-441b-4ec0-a9e7-f6572e0f5b7', workGroup: '1. Ремонт двигателя стандарт', transactionType: 'Расходы', amount: 1500, quantity: 1 },
  { id: '2', serviceName: SERVICE_NAME, itemName: 'Замена подшипника Необходимо обновить значение_ID_f0fb592d-5d08-4c1c-90f3-a1c26f061aea', workGroup: '2. Замены расходников', transactionType: 'Расходы', amount: 300, quantity: 2 },
  { id: '3', serviceName: SERVICE_NAME, itemName: 'Замена племянника Необходимо обновить значение_ID_1c9b7fce-99f3-4dea-9ea9-7acd6babe2a19', workGroup: '2. Замены расходников', transactionType: 'Расходы', amount: 150, quantity: 1 },
  { id: '4', serviceName: SERVICE_NAME, itemName: 'Ремонт вала статора Необходимо обновить значение_ID_b0f9495c-a56e-46d7-85b5-fce5fbb51a8e', workGroup: '4. Токарные работы', transactionType: 'Расходы', amount: 800, quantity: 1 },
  { id: '5', serviceName: SERVICE_NAME, itemName: 'Ремонт железа статора Необходимо обновить значение_ID_6214ae7f-a60f-4612-a8d2-1cf65ac96bde', workGroup: '5. Прочие работы', transactionType: 'Расходы', amount: 450, quantity: 1 },
  { id: '6', serviceName: SERVICE_NAME, itemName: 'Оплата труда слесаря Необходимо обновить значение_ID_01335176-d926-4d83-ae08-913be3c08050', workGroup: '1. Ремонт двигателя стандарт', transactionType: 'Расходы', amount: 500, quantity: 1 },
  { id: '7', serviceName: SERVICE_NAME, itemName: 'Оплата труда обмотчика Необходимо обновить значение_ID_01335176-d926-4d83-ae08-913be3c08050', workGroup: '1. Ремонт двигателя стандарт', transactionType: 'Расходы', amount: 700, quantity: 1 },
  { id: '8', serviceName: SERVICE_NAME, itemName: 'Расход провода Необходимо обновить значение_ID_01335176-d926-4d83-ae08-913be3c08051', workGroup: '1. Ремонт двигателя стандарт', transactionType: 'Расходы', amount: 1200, quantity: 1 },
  { id: '9', serviceName: SERVICE_NAME, itemName: 'Сварка Необходимо обновить значение_ID_f0f7a6d8-5026-4ec5-a193-a0d455b50d69', workGroup: '3. Сварные работы', transactionType: 'Расходы', amount: 600, quantity: 1 },
  { id: '10', serviceName: SERVICE_NAME, itemName: 'Срочность Необходимо обновить значение_ID_5e1ff083-bfd0-4d4a-a116-d7a5b5065fa9', workGroup: '6. Срочность', transactionType: 'Расходы', amount: 1000, quantity: 1 },
  { id: '11', serviceName: SERVICE_NAME, itemName: 'Ремонт электродвигателя Необходимо обновить значение_ID_c1cfed1-f759-47f4-b9780-f20f9cce12', workGroup: '1. Ремонт двигателя стандарт', transactionType: 'Расходы', amount: 200, quantity: 3 },
  { id: '12', serviceName: SERVICE_NAME, itemName: 'Основная услуга по ремонту', workGroup: '1. Ремонт двигателя стандарт', transactionType: 'Доходы', amount: 8000, quantity: 1 },
  { id: '13', serviceName: SERVICE_NAME, itemName: 'Дополнительная услуга по токарным работам', workGroup: '4. Токарные работы', transactionType: 'Доходы', amount: 1500, quantity: 1 },
]


export const NewAcceptance: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialRow[]>(mockFinancialData)

  const handleLoadData = () => {
    // In a real scenario, this would trigger a file upload and parse
    setFinancialData(mockFinancialData)
  }

  const handleDownload = () => {
    if (financialData.length > 0) {
      exportAssembledPositionsToExcel(financialData, 'собранные-позиции')
    } else {
      // Optional: handle case with no data, e.g., show a notification
      console.log('No data to export.')
    }
  }

  return (
    <AppLayout
      title="Новая Приемка"
      breadcrumbs={[
        { label: 'Приемка (Заказы)', path: '/app/acceptance' },
        { label: 'Новый Заказ', path: '/app/acceptance/new' },
      ]}
    >
      <div className="space-y-6">
        {/* Top Form Section (Multi-step form) */}
        <AcceptanceHeaderForm />

        {/* Item Assembly Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Собранные Позиции
            </h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={financialData.length === 0}
              >
                <Download className="w-4 h-4 mr-1" />
                скачать xlsx
              </Button>
              <Button variant="secondary" size="sm" onClick={handleLoadData}>
                <Plus className="w-4 h-4 mr-1" />
                Загрузить данные (Демо)
              </Button>
            </div>
          </div>

          <FinancialHierarchyView data={financialData} />
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <Button variant="secondary">Отмена</Button>
          <Button variant="primary">Сохранить Заказ</Button>
        </div>
      </div>
    </AppLayout>
  )
}
