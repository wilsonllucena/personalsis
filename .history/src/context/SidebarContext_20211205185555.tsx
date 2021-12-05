import React, { useState, useMemo, useCallback } from 'react';

// create context
interface ISidebarContext{
  isSidebarOpen: boolean
  closeSidebar: Function
  toggleSidebar: Function
}

export const SidebarContext = React.createContext<ISidebarContext>({ isSidebarOpen: false, closeSidebar: () => {  }, toggleSidebar: () => {} });

interface ISidebarPovider{ children: React.ReactNode }

export const SidebarProvider = ({ children }: ISidebarPovider) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() =>{
    setIsSidebarOpen(!isSidebarOpen)
  },[isSidebarOpen])

 const closeSidebar = useCallback(() =>{
    setIsSidebarOpen(false)
  }, []);

  const value = useMemo(
    
    () => ({
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    }),
    [isSidebarOpen, toggleSidebar, closeSidebar]
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}
