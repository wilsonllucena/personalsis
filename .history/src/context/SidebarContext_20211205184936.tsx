import React, { useState, useMemo, useCallback } from 'react';

// create context
interface ISidebarContext{
  isSidebarOpen: boolean
  closeSidebar: () => void
  toggleSidebar: () => void
}

export const SidebarContext = React.createContext<ISidebarContext>({ isSidebarOpen: false, closeSidebar: () => {  }, toggleSidebar: () => {} });

interface ISidebarPovider{ children: React.ReactChildren }

export const SidebarProvider = ({ children }: ISidebarPovider) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() =>{
    setIsSidebarOpen(!isSidebarOpen)
  },[isSidebarOpen])

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  const value = useMemo(
    
    () => ({
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    }),
    [isSidebarOpen, toggleSidebar]
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}
