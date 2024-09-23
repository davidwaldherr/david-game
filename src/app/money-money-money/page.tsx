"use client"

import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import dayjs from 'dayjs'; // For date calculations

// Mock data for demonstration purposes
const financialData = {
  mrr: {
    total: 120
  },
  totalClients: {
    breakdown: [
      { name: 'The Water Sergeant', subscription: 'Active', mrr: 120, setupFee: 400, startDate: '2024-09-20', endDate: '2025-04-01', totalRevenue: 1120 },
    ]
  },
  monthlyExpenses: {
    breakdown: [
      { name: 'Rent', cost: 970 },
      
    ]
  }

};

// Helper function to calculate the total profit
const calculateTotalProfit = (clients: any) => {
  const today = dayjs();
  
  return clients.reduce((total: any, client: any) => {
    const startDate = dayjs(client.startDate);
    const monthsActive = today.diff(startDate, 'month');
    const totalMRR = monthsActive * client.mrr;
    const totalRevenue = client.setupFee + totalMRR;
    
    return total + totalRevenue;
  }, 0);
};

// Helper function to calculate projected earnings by January 1, 2025
const calculateProjectedEarnings = (clients: any, targetDate: string) => {
  const target = dayjs(targetDate);
  
  return clients.reduce((total: any, client: any) => {
    const startDate = dayjs(client.startDate);
    const monthsActive = target.diff(startDate, 'month');
    const totalMRR = monthsActive * client.mrr;
    const totalRevenue = client.setupFee + totalMRR;
    
    return total + totalRevenue;
  }, 0);
};

type CardData = {
  title: string;
  amount: number;
  currency: string;
  data: { [key: string]: string | number }[];
  columns: { key: string, label: string }[];
};

const DashboardCard: React.FC<CardData> = ({ title, amount, currency, data, columns }) => {
  const [isDetailView, setIsDetailView] = useState(false);

  const toggleDetailView = () => setIsDetailView(!isDetailView);

  return (
    <>
      <Card 
        className="w-full h-full cursor-pointer transition-all duration-300 hover:scale-105 bg-black border-4 border-black rounded-3xl overflow-hidden p-10 shadow-lg"
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
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-10 animated-gradient">
          <Card className="p-10 w-full max-w-4xl h-[90vh] border-4 border-white rounded-3xl overflow-hidden bg-black">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{title} Breakdown</h2>
              <Button color="danger" variant="light" onPress={toggleDetailView} className="text-4xl border-4 border-white rounded-lg p-3 hover:bg-red-500" >
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
                          <TableCell key={column.key} style={{ border: '2px solid white', textAlign: 'center', verticalAlign: 'middle' }}>
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
  );
};

export default function Dashboard() {
  const totalProfit = calculateTotalProfit(financialData.totalClients.breakdown);
  const projectedEarnings = calculateProjectedEarnings(financialData.totalClients.breakdown, '2025-01-01');

  return (
    <div className="min-h-screen p-8 flex flex-col animated-gradient">
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardCard 
          title="Monthly Recurring Revenue" 
          amount={financialData.totalClients.breakdown.reduce((acc, client) => acc + client.mrr, 0)} 
          currency="$"
          data={financialData.totalClients.breakdown}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'mrr', label: 'MRR' },
            { key: 'setupFee', label: 'Setup Fee' },
            { key: 'startDate', label: 'Start Date' },
            { key: 'endDate', label: 'End Date'},
            { key: 'totalRevenue', label: 'Total Revenue' },
          ]}
        />
        <DashboardCard 
          title="Total Profit" 
          amount={totalProfit} 
          currency="$"
          data={financialData.totalClients.breakdown}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'mrr', label: 'MRR' },
            { key: 'setupFee', label: 'Setup Fee' },
            { key: 'startDate', label: 'Start Date' },
            { key: 'endDate', label: 'End Date'},
            { key: 'totalRevenue', label: 'Total Revenue' },
          ]}
        />
        <DashboardCard 
          title="Monthly Expenses" 
          amount={financialData.monthlyExpenses.breakdown.reduce((acc, expense) => acc + expense.cost, 0)} 
          currency="$"
          data={financialData.monthlyExpenses.breakdown}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'cost', label: 'Cost' },
          ]}
        />
        <DashboardCard 
          title="Projected Earnings by Jan 1, 2025" 
          amount={projectedEarnings} 
          currency="$"
          data={financialData.totalClients.breakdown}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'mrr', label: 'MRR' },
            { key: 'setupFee', label: 'Setup Fee' },
            { key: 'startDate', label: 'Start Date' },
            { key: 'endDate', label: 'End Date'},
            { key: 'totalRevenue', label: 'Total Revenue' },
          ]}
        />
      </div>
    </div>
  );
}
