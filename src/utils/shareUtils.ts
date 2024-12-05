import { MeetingReport, FellowshipCenter } from '../types';
import { format } from 'date-fns';

export function generateEmailContent(report: MeetingReport, center: FellowshipCenter) {
  const subject = `House Fellowship Report - ${center.name} - ${format(new Date(report.date), 'MMM d, yyyy')}`;
  
  const body = `
House Fellowship Meeting Report

Fellowship Center: ${center.name}
Pastor: ${center.pastor.name}

Meeting Details:
Date: ${format(new Date(report.date), 'MMMM d, yyyy')}
Attendance: ${report.attendanceCount}
Offering Amount: ₦${report.offeringAmount.toFixed(2)}
Offering Status: ${report.offeringPaidStatus ? 'Paid' : 'Pending'}

${report.notes ? `\nNotes:\n${report.notes}` : ''}

Generated via House Fellowship Connect
`.trim();

  return {
    subject,
    body,
    mailtoLink: `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  };
}

export function generateWhatsAppContent(report: MeetingReport, center: FellowshipCenter) {
  const message = `
*House Fellowship Meeting Report*

📍 *${center.name}*
👤 Pastor: ${center.pastor.name}

📅 Date: ${format(new Date(report.date), 'MMMM d, yyyy')}
👥 Attendance: ${report.attendanceCount}
💰 Offering: ₦${report.offeringAmount.toFixed(2)}
${report.offeringPaidStatus ? '✅ Offering Paid' : '⏳ Offering Pending'}

${report.notes ? `📝 *Notes:*\n${report.notes}` : ''}

_Generated via House Fellowship Connect_
`.trim();

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}