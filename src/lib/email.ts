import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderUpdate(orderId: string, status: string) {
  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: 'staff@yourdomain.com',
    subject: `Order ${orderId} Update`,
    text: `Order status changed to: ${status}`
  });
}
