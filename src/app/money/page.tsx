'use client'

import React, { useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table"
import { ScrollShadow } from "@nextui-org/scroll-shadow"

// Mock data for demonstration purposes
const financialData = {
  mrr: {
    total: 120,
    breakdown: [
      { month: 'January', amount: 45000 },
      { month: 'February', amount: 47000 },
      { month: 'March', amount: 50000 },
    ]
  },
  totalProfit: {
    total: 1120,
    breakdown: [
      { category: 'Product A', amount: 70000 },
      { category: 'Product B', amount: 50000 },
      { category: 'Product C', amount: 30000 },
    ]
  },
  monthlyExpenses: {
    total: 30000,
    breakdown: [
      { category: 'Salaries', amount: 20000 },
      { category: 'Rent', amount: 5000 },
      { category: 'Utilities', amount: 3000 },
      { category: 'Marketing', amount: 2000 },
    ]
  },
  totalClients: {
    breakdown: [
      { name: 'The Water Sergeant', subscription: 'Active', mrr: 120, totalRevenue: 1120 },
    ]
  }
}

type CardData = {
  title: string
  amount: number
  currency: string
  data: { [key: string]: string | number }[]  
  columns: { key: string, label: string }[]
}

const DashboardCard: React.FC<CardData> = ({ title, amount, currency, data, columns }) => {
  const [isDetailView, setIsDetailView] = useState(false)

  const toggleDetailView = () => setIsDetailView(!isDetailView)

  return (
    <>
      <Card 
        className="w-full h-full cursor-pointer transition-all duration-300 hover:scale-105 border-4 border-black rounded-3xl overflow-hidden p-10 bg-gray-100 shadow-lg"
        shadow="lg"
        isPressable
        onPress={toggleDetailView}
      >
        <CardBody className="justify-center items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-9xl font-semibold mt-4">
            {currency}{amount.toLocaleString()}
          </p>
        </CardBody>
      </Card>

      {isDetailView && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-10">
          <Card className="p-10 w-full max-w-4xl h-[90vh] border-4 border-black rounded-3xl overflow-hidden bg-gray-100">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{title} Breakdown</h2>
              <Button color="danger" variant="light" onPress={toggleDetailView} className="text-4xl border-4 border-black rounded-lg p-3 hover:bg-red-500" >
                🙅‍♂️
              </Button>
            </CardHeader>
            <CardBody>
              <ScrollShadow className="h-full">
                <Table>
                  <TableHeader>
                    {columns.map((column) => (
                      <TableColumn key={column.key}><b>{column.label}</b></TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={index}>
                        {columns.map((column) => (
                          <TableCell key={column.key} style={{ border: '1px solid black' }}>
                            {typeof item[column.key] === 'number' 
                              ? `${currency}${item[column.key].toLocaleString()}` 
                              : item[column.key]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollShadow>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  )
}

export default function Dashboard() {
  return (
      <div className="min-h-screen p-8 flex flex-col" style={{ fontFamily: 'Poppins, sans-serif' }}> {/* Add style attribute for font */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DashboardCard 
            title="Monthly Recurring Revenue" 
            amount={financialData.totalClients.breakdown.reduce((acc, client) => acc + client.mrr, 0)} 
            currency="$"
            data={financialData.mrr.breakdown}
            columns={[
              { key: 'month', label: 'Month' },
              { key: 'amount', label: 'Amount' }
            ]}
          />
          <DashboardCard 
            title="Total Profit" 
            amount={financialData.totalProfit.total} 
            currency="$"
            data={financialData.totalProfit.breakdown}
            columns={[
              { key: 'category', label: 'Category' },
              { key: 'amount', label: 'Amount' }
            ]}
          />
          <DashboardCard 
            title="Monthly Expenses" 
            amount={financialData.monthlyExpenses.total} 
            currency="$"
            data={financialData.monthlyExpenses.breakdown}
            columns={[
              { key: 'category', label: 'Category' },
              { key: 'amount', label: 'Amount' }
            ]}
          />
          <DashboardCard 
            title="Total Clients" 
            amount={financialData.totalClients.breakdown.length} 
            currency=""
            data={financialData.totalClients.breakdown}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'subscription', label: 'Subscription' },
              { key: 'mrr', label: 'MRR' },
              { key: 'totalRevenue', label: 'Total Revenue' }
            ]}
          />
        </div>
      </div>
  )
}
