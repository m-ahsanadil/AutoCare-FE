'use client'

import { Provider } from 'react-redux'
import { store, persistor } from '../store'
import { ReactNode } from 'react'
import { PersistGate } from 'redux-persist/integration/react';


interface StoreProviderProps {
    children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}