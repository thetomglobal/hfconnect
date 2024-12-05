import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { MeetingReport, FellowshipCenter } from '../types';

export function generateMeetingReportPDF(report: MeetingReport, center: FellowshipCenter) {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(229, 9, 20); // Netflix Red
  doc.text("House Fellowship Meeting Report", 20, 20);
  
  // Center Info
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text(`Fellowship Center: ${center.name}`, 20, 40);
  doc.text(`Pastor: ${center.pastor.name}`, 20, 50);
  
  // Report Details
  doc.text("Meeting Details", 20, 70);
  doc.setFontSize(12);
  doc.text(`Date: ${format(new Date(report.date), 'MMMM d, yyyy')}`, 30, 85);
  doc.text(`Attendance: ${report.attendanceCount}`, 30, 95);
  doc.text(`Offering Amount: ₦${report.offeringAmount.toFixed(2)}`, 30, 105);
  doc.text(`Offering Status: ${report.offeringPaidStatus ? 'Paid' : 'Pending'}`, 30, 115);
  
  if (report.notes) {
    doc.text("Notes:", 20, 135);
    const splitNotes = doc.splitTextToSize(report.notes, 170);
    doc.text(splitNotes, 30, 145);
  }
  
  return doc;
}