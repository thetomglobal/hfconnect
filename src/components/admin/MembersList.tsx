import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store';

export default function MembersList() {
  const { members, fellowshipCenters } = useStore();

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white mb-8">Members Directory</h1>
      
      <div className="netflix-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400">Name</th>
                <th className="text-left p-4 text-gray-400">Fellowship Center</th>
                <th className="text-left p-4 text-gray-400">Contact</th>
                <th className="text-left p-4 text-gray-400">Joined</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => {
                const center = fellowshipCenters.find(
                  (c) => c.id === member.fellowshipCenter?.id
                );
                
                return (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-white">{member.fullName}</p>
                        <p className="text-sm text-gray-400">{member.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{center?.name || 'Unassigned'}</p>
                      <p className="text-sm text-gray-400">{member.street}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{member.phone}</p>
                      <p className="text-sm text-gray-400">{member.membershipLevel}</p>
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(member.createdAt).toLocaleDateString()}
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