import React, { createContext, useState, useContext, useEffect } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [unreadAlertsCount, setUnreadAlertsCount] = useState(0);

  // You can also add functions here to fetch unread alerts periodically
  // if you want it decoupled from the map component, but for now we'll just expose the setter.

  return (
    <GlobalContext.Provider
      value={{
        selectedRegion,
        setSelectedRegion,
        unreadAlertsCount,
        setUnreadAlertsCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
