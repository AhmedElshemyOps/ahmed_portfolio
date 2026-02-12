import { ENV } from './_core/env';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send email using Manus built-in email service
 * This uses the preconfigured email service through the Forge API
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      console.warn('[Email] Email service credentials not configured');
      return false;
    }

    const response = await fetch(`${ENV.forgeApiUrl}/v1/email/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ENV.forgeApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[Email] Failed to send email:', error);
      return false;
    }

    console.log('[Email] Email sent successfully to:', options.to);
    return true;
  } catch (error) {
    console.error('[Email] Error sending email:', error);
    return false;
  }
}

/**
 * Send contact form notification email to the portfolio owner
 */
export async function sendContactNotification(
  ownerEmail: string,
  visitorName: string,
  visitorEmail: string,
  visitorPhone: string | null,
  subject: string,
  message: string
): Promise<boolean> {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1F3A5F;">New Contact Form Submission</h2>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>From:</strong> ${visitorName}</p>
        <p><strong>Email:</strong> <a href="mailto:${visitorEmail}">${visitorEmail}</a></p>
        ${visitorPhone ? `<p><strong>Phone:</strong> ${visitorPhone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
      </div>

      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1F3A5F; margin-top: 0;">Message:</h3>
        <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
      </div>

      <div style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p>This is an automated notification from your portfolio website.</p>
        <p>Reply to this email or contact the visitor directly using the information above.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: ownerEmail,
    subject: `New Contact: ${subject}`,
    html: htmlContent,
    text: `New Contact Form Submission\n\nFrom: ${visitorName}\nEmail: ${visitorEmail}\n${visitorPhone ? `Phone: ${visitorPhone}\n` : ''}Subject: ${subject}\n\nMessage:\n${message}`,
  });
}

/**
 * Send confirmation email to the visitor
 */
export async function sendContactConfirmation(
  visitorEmail: string,
  visitorName: string,
  ownerName: string
): Promise<boolean> {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1F3A5F;">Thank You for Reaching Out</h2>
      
      <p>Hi ${visitorName},</p>

      <p>Thank you for submitting your message through my portfolio website. I have received your inquiry and will get back to you as soon as possible.</p>

      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Expected Response Time:</strong> 24-48 hours</p>
        <p>I review all inquiries carefully and will respond with a personalized message.</p>
      </div>

      <p>If you need to reach me urgently, please feel free to contact me directly.</p>

      <p>Best regards,<br/>
      <strong>${ownerName}</strong></p>

      <div style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p>This is an automated confirmation email. Please do not reply to this message.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: visitorEmail,
    subject: 'Thank You for Your Message',
    html: htmlContent,
    text: `Thank You for Reaching Out\n\nHi ${visitorName},\n\nThank you for submitting your message through my portfolio website. I have received your inquiry and will get back to you as soon as possible.\n\nExpected Response Time: 24-48 hours\n\nBest regards,\n${ownerName}`,
  });
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
