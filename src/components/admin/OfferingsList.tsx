import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Check, X } from 'lucide-react';
import { useStore } from '../../store';

export default function OfferingsList() {
  const { meetingReports, fellowshipCenters } = useStore();

  const totalOfferings = meetingReports.reduce(
    (sum, report) => sum + report.offeringAmount,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Offerings Register</h1>
        <div className="netflix-card px-6 py-3">
          <p className="text-sm text-gray-400">Total Offerings</p>
          <p className="text-2xl font-bold text-white">₦{totalOfferings.toFixed(2)}</p>
        </div>
      </div>

      <div className="netflix-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400">Date</th>
                <th className="text-left p-4 text-gray-400">Fellowship Center</th>
                <th className="text-left p-4 text-gray-400">Amount</th>
                <th className="text-left p-4 text-gray-400">Status</th>
                <th className="text-left p-4 text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetingReports.map((report) => {
                const center = fellowshipCenters.find(
                  (c) => c.id === report.fellowshipCenterId
                );
                
                return (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="p-4 text-white">
                      {new Date(report.date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <p className="text-white">{center?.name}</p>
                      <p className="text-sm text-gray-400">{center?.pastor.name}</p>
                    </td>
                    <td className="p-4 text-white">
                      ₦{report.offeringAmount.toFixed(2)}
                    </td>
                    <td className="p-4">
                      {report.offeringPaidStatus ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Check className="w-4 h-4 mr-1" /> Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <X className="w-4 h-4 mr-1" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {}}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          title="Download Receipt"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {}}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}