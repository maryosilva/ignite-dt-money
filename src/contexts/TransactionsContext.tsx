import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';

export interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createAt: string;
}

interface CreateTransactionInput {
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createAt',
        _order: 'desc',
        q: query,
      },
    });

    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, type, category } = data;

      const response = await api.post('transactions', {
        description,
        price,
        type,
        category,
        createAt: new Date(),
      });

      setTransactions((state) => [...state, response.data]);
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
