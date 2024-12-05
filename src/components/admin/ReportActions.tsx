import React from 'react';
import { Download, Mail, Share2 } from 'lucide-react';
import { MeetingReport, FellowshipCenter } from '../../types';
import { generateMeetingReportPDF } from '../../utils/reportGenerator';
import { generateEmailContent, generateWhatsAppContent } from '../../utils/shareUtils';

interface ReportActionsProps {
  report: MeetingReport;
  center: FellowshipCenter;
}

export default function ReportActions({ report, center }: ReportActionsProps) {
  const handleDownloadPDF = () => {
    const doc = generateMeetingReportPDF(report, center);
    doc.save(`fellowship-report-${report.id}.pdf`);
  };

  const handleEmailShare = () => {
    const { mailtoLink } = generateEmailContent(report, center);
    window.location.href = mailtoLink;
  };

  const handleWhatsAppShare = () => {
    const whatsappLink = generateWhatsAppContent(report, center);
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleDownloadPDF}
        className="p-2 text-gray-400 hover:text-white transition-colors"
        title="Download PDF"
      >
        <Download className="w-4 h-4" />
      </button>
      
      <button
        onClick={handleEmailShare}
        className="p-2 text-gray-400 hover:text-white transition-colors"
        title="Share via Email"
      >
        <Mail className="w-4 h-4" />
      </button>
      
      <button
        onClick={handleWhatsAppShare}
        className="p-2 text-gray-400 hover:text-white transition-colors"
        title="Share via WhatsApp"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
}