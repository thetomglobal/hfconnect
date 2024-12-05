import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { MeetingReport, FellowshipCenter } from '../types';

export async function generatePDF(report: MeetingReport, center: FellowshipCenter | undefined) {
  const doc = new jsPDF();
  
  // Set font sizes
  const titleSize = 20;
  const headerSize = 14;
  const normalSize = 12;
  
  // Initial y position
  let y = 20;
  
  // Add title
  doc.setFontSize(titleSize);
  doc.setTextColor(229, 9, 20); // Netflix Red
  doc.text("House Fellowship Meeting Report", 20, y);
  
  // Add fellowship center info
  y += 20;
  doc.setFontSize(headerSize);
  doc.setTextColor(0);
  doc.text(`Fellowship Center: ${center?.name || 'N/A'}`, 20, y);
  
  y += 10;
  doc.setFontSize(normalSize);
  doc.text(`Pastor: ${center?.pastor.name || 'N/A'}`, 20, y);
  
  // Add report details
  y += 20;
  const reportDate = format(new Date(report.date), 'MMMM d, yyyy');
  doc.text(`Date: ${reportDate}`, 20, y);
  
  y += 10;
  doc.text(`Attendance: ${report.attendanceCount}`, 20, y);
  
  y += 10;
  doc.text(`Offering Amount: ₦${report.offeringAmount.toFixed(2)}`, 20, y);
  
  // Add notes if they exist
  if (report.notes) {
    y += 20;
    doc.setFontSize(headerSize);
    doc.text('Notes:', 20, y);
    
    y += 10;
    doc.setFontSize(normalSize);
    
    // Split notes into lines that fit the page width
    const lines = doc.splitTextToSize(report.notes, 170);
    lines.forEach(line => {
      if (y > 270) { // Check if we need a new page
        doc.addPage();
        y = 20;
      }
      doc.text(line, 20, y);
      y += 7;
    });
  }
  
  return doc;
}