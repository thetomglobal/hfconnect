import { MeetingReport, FellowshipCenter } from '../types';

export async function sendReportEmail(report: MeetingReport, center: FellowshipCenter | undefined) {
  if (!center) return;

  const reportDate = new Date(report.date).toLocaleDateString();
  const subject = `House Fellowship Report - ${center.name} - ${reportDate}`;
  
  const body = `
Dear Church Administrator,

Please find below the house fellowship report for ${center.name}:

Date: ${reportDate}
Attendance: ${report.attendanceCount}
Offering Amount: ₦${report.offeringAmount.toFixed(2)}

Fellowship Pastor: ${center.pastor.name}
Contact: ${center.pastor.phone}

${report.notes ? `\nNotes:\n${report.notes}` : ''}

Best regards,
${center.pastor.name}
  `.trim();

  // Create mailto link
  const mailtoLink = `mailto:admin@godschamber.org?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Open default email client
  window.location.href = mailtoLink;
}