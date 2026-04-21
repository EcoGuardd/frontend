import React, { useEffect, useState } from 'react';
import { getDetectionZones, markZoneReviewed } from '../utils/api';
import { useGlobalContext } from '../context/GlobalContext';

function AlertPanel({ isOpen, onClose }) {
  const [alerts, setAlerts] = useState([]);
  const { setUnreadAlertsCount } = useGlobalContext();

  const fetchAlerts = async () => {
    try {
      const zones = await getDetectionZones();
      const illegalLoggingZones = zones.filter(z => z.risk === 'illegal_logging' && !z.reviewed);
      setAlerts(illegalLoggingZones);
      setUnreadAlertsCount(illegalLoggingZones.length);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAlerts();
    }
    // Poll every 60 seconds to keep the badge updated
    const interval = setInterval(fetchAlerts, 60000);
    fetchAlerts();
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleMarkReviewed = async (id) => {
    try {
      await markZoneReviewed(id);
      const updatedAlerts = alerts.filter(a => a._id !== id);
      setAlerts(updatedAlerts);
      setUnreadAlertsCount(updatedAlerts.length);
    } catch (error) {
      console.error("Failed to mark as reviewed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex justify-end bg-black/20 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-sm h-full bg-white shadow-2xl overflow-y-auto border-l border-green-200">
        <div className="p-4 flex items-center justify-between border-b border-green-100 bg-green-50">
          <h2 className="text-xl font-bold text-green-900 flex items-center gap-2">
            🚨 Active Alerts
            {alerts.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{alerts.length}</span>
            )}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl leading-none">&times;</button>
        </div>

        <div className="p-4 flex flex-col gap-4">
          {alerts.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">No active alerts. The forests are safe!</p>
          ) : (
            alerts.map((alert) => (
              <div key={alert._id} className="border border-red-200 bg-red-50 rounded-xl p-4 shadow-sm relative">
                <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Critical
                </span>
                <h3 className="font-bold text-red-900 text-lg mb-1">{alert.label || 'Unknown Region'}</h3>
                <p className="text-sm text-red-800 font-medium mb-2">Location: {alert.lat.toFixed(4)}, {alert.lng.toFixed(4)}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🌲</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(alert.treeLossPct, 100)}%` }}></div>
                  </div>
                  <span className="text-red-700 font-bold text-sm">{alert.treeLossPct.toFixed(1)}% Loss</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">Timestamp: {new Date(alert.createdAt || Date.now()).toLocaleString()}</p>
                
                <button 
                  onClick={() => handleMarkReviewed(alert._id)}
                  className="w-full py-2 bg-white border border-red-300 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
                >
                  Mark as Reviewed
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AlertPanel;
