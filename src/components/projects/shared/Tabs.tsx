import React from 'react';

interface TabsProps {
  activeTab: string;
  onChange: (tabId: string) => void;
  children: React.ReactNode;
}

interface TabProps {
  id: string;
  children: React.ReactNode;
}

interface TabPanelProps {
  id: string;
  children: React.ReactNode;
}

export function Tabs({ activeTab, onChange, children }: TabsProps) {
  return <div>{children}</div>;
}

export function TabList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex border-b">
      {children}
    </div>
  );
}

export function Tab({ id, children }: TabProps) {
  const isActive = id === React.useContext(TabContext);
  
  return (
    <button
      className={`px-4 py-2 font-medium text-sm ${
        isActive
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={() => React.useContext(TabDispatchContext)(id)}
    >
      {children}
    </button>
  );
}

export function TabPanel({ id, children }: TabPanelProps) {
  const activeTab = React.useContext(TabContext);
  if (id !== activeTab) return null;
  return <div>{children}</div>;
}

const TabContext = React.createContext('');
const TabDispatchContext = React.createContext<(id: string) => void>(() => {});

export function TabProvider({ activeTab, onChange, children }: TabsProps) {
  return (
    <TabContext.Provider value={activeTab}>
      <TabDispatchContext.Provider value={onChange}>
        {children}
      </TabDispatchContext.Provider>
    </TabContext.Provider>
  );
}