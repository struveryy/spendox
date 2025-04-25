
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Transactions from "./pages/Transactions";
import Reminders from "./pages/Reminders";
import Budget from "./pages/Budget";
import Suggestions from "./pages/Suggestions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AppSidebar from "./components/layout/AppSidebar";
import PageContainer from "./components/layout/PageContainer";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Helmet>
              <title>SpendoX - Student Expense Tracker</title>
              <meta name="description" content="SpendoX - Track and manage your student expenses with ease" />
            </Helmet>
            <div className="flex min-h-screen bg-background">
              <AppSidebar />
              <PageContainer>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/reminders" element={<Reminders />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/suggestions" element={<Suggestions />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageContainer>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
