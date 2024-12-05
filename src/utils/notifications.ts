import { Member, FellowshipCenter } from '../types';

function formatPhoneNumber(phone: string): string {
  // Remove non-numeric characters and ensure proper format
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.startsWith('0') ? '234' + cleaned.slice(1) : cleaned;
}

export function generateWhatsAppMessage(member: Member, center: FellowshipCenter): string {
  const message = `
🏠 *New House Fellowship Member Registration*

*Personal Details*
👤 Name: ${member.fullName}
📧 Email: ${member.email}
📱 Phone: ${member.phone}
🎂 Birthday: ${member.birthday}
✝️ Membership: ${member.membershipLevel}
👥 Group: ${member.group}
💑 Marital Status: ${member.maritalStatus}

📍 *Location Details*
${member.street ? `Street: ${member.street}` : ''}

⛪ *Fellowship Assignment*
Center: ${center.name}
Location: ${center.location.address}

_This is an automated notification. Please reach out to welcome our new member!_
`.trim();

  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = formatPhoneNumber(center.pastor.phone);
  
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export async function sendPastorNotification(member: Member, center: FellowshipCenter): Promise<void> {
  const whatsappUrl = generateWhatsAppMessage(member, center);
  
  // Open WhatsApp in a new window
  window.open(whatsappUrl, '_blank');
  
  // Return a resolved promise after a short delay to ensure the window opens
  return new Promise((resolve) => setTimeout(resolve, 500));
}