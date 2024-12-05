import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { useStore } from '../../store';

interface MeetingReportFormProps {
  centerId: string;
}

export default function MeetingReportForm({ centerId }: MeetingReportFormProps) {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addMeetingReport } = useStore();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const report = {
        id: crypto.randomUUID(),
        fellowshipCenterId: centerId,
        date: new Date().toISOString(),
        attendanceCount: parseInt(data.attendanceCount),
        offeringAmount: parseFloat(data.offeringAmount),
        notes: data.notes,
        offeringPaidStatus: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addMeetingReport(report);
      reset();
      alert('Report submitted successfully!');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!centerId) {
    return (
      <div className="netflix-card p-6">
        <p className="text-gray-400">Please select a fellowship center to submit a report.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="netflix-card p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Submit Meeting Report</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Attendance Count</label>
          <input
            type="number"
            {...register('attendanceCount', { required: true })}
            className="netflix-input w-full"
            placeholder="Enter attendance count"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Offering Amount (₦)</label>
          <input
            type="number"
            step="0.01"
            {...register('offeringAmount', { required: true })}
            className="netflix-input w-full"
            placeholder="Enter offering amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Notes</label>
          <textarea
            {...register('notes')}
            className="netflix-input w-full h-24"
            placeholder="Enter any additional notes"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Upload Offering Receipt</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-400">
                <label className="relative cursor-pointer netflix-button px-4">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*,.pdf"
                    {...register('offeringReceipt')}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="netflix-button w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </motion.div>
  );
}