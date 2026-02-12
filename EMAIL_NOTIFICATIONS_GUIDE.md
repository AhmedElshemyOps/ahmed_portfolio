# Email Notifications Guide

## Overview

Your portfolio website now includes an **Email Notification System** that automatically sends you an email whenever a visitor submits a message through the contact form. This ensures you never miss an opportunity from potential employers or clients.

## How It Works

### Contact Form Submission Flow

1. **Visitor Submits Form**: A visitor fills out the contact form with their name, email, subject, and message
2. **Message Saved**: The message is stored in the database for your records
3. **Owner Notification**: You receive an email with the visitor's complete message
4. **Visitor Confirmation**: The visitor receives an automatic confirmation email
5. **Email Tracking**: The system tracks whether emails were sent successfully

### Email Types

#### 1. Owner Notification Email
**Recipient**: You (Ahmed)  
**When Sent**: Immediately after form submission  
**Contains**:
- Visitor's name and email address
- Visitor's phone number (if provided)
- Message subject
- Full message content
- Instructions to reply directly

**Example Subject**: "New Contact: Job Inquiry - Hospitality Operations"

#### 2. Visitor Confirmation Email
**Recipient**: The visitor  
**When Sent**: Immediately after form submission  
**Contains**:
- Thank you message
- Expected response time (24-48 hours)
- Your name and professional signature
- Note that it's an automated message

**Example Subject**: "Thank You for Your Message"

## Configuration

### Required Settings

Your email notification system requires the following environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `OWNER_EMAIL` | Your email address where notifications are sent | ahmed@example.com |
| `OWNER_FULL_NAME` | Your full name for confirmation emails | Ahmed Mahmoud |
| `BUILT_IN_FORGE_API_URL` | Email service API endpoint | https://api.manus.im |
| `BUILT_IN_FORGE_API_KEY` | Email service authentication key | Bearer token |

### Email Service

The system uses the **Manus Built-in Email Service** for sending emails. This service:

- Provides reliable email delivery
- Handles HTML and plain text formatting
- Includes automatic retry logic
- Tracks delivery status
- Is pre-configured and ready to use

## Features

### ✅ Automatic Notifications
- Receive instant email alerts for every contact form submission
- Never miss an important inquiry from recruiters or clients

### ✅ Professional Email Templates
- Beautifully formatted HTML emails with your branding
- Clear hierarchy and easy-to-read layout
- Mobile-responsive design

### ✅ Visitor Confirmation
- Automatic confirmation emails set visitor expectations
- Professional tone builds trust and credibility
- Reduces follow-up inquiries about message receipt

### ✅ Message Tracking
- All messages stored in the database
- Track which emails were successfully sent
- Mark messages as read/unread
- View message history anytime

### ✅ Phone Number Support
- Optional phone field for visitors to provide contact information
- Included in your notification email for easy follow-up

## Contact Form Fields

### Required Fields
- **Full Name**: Visitor's name (required)
- **Email Address**: Visitor's email (required, validated)
- **Subject**: Message topic/subject (required)
- **Message**: Main message content (required, minimum 10 characters)

### Optional Fields
- **Phone Number**: Visitor's phone number (optional)

## Email Content Examples

### Owner Notification Email

```
Subject: New Contact: Job Inquiry

From: John Smith
Email: john.smith@company.com
Phone: +1 (555) 123-4567
Subject: Job Inquiry

Message:
I am very interested in discussing the Operations Manager position 
at your organization. With my 10+ years of hospitality experience 
and Lean Six Sigma Black Belt certification, I believe I would be 
a great fit for your team.

---
This is an automated notification from your portfolio website.
Reply to this email or contact the visitor directly using the information above.
```

### Visitor Confirmation Email

```
Subject: Thank You for Your Message

Dear John,

Thank you for submitting your message through my portfolio website. 
I have received your inquiry and will get back to you as soon as possible.

Expected Response Time: 24-48 hours

I review all inquiries carefully and will respond with a personalized message.

Best regards,
Ahmed Mahmoud
```

## Troubleshooting

### Not Receiving Emails

**Problem**: You're not receiving owner notification emails  
**Solutions**:
1. Check that `OWNER_EMAIL` is correctly configured
2. Check your email spam/junk folder
3. Verify email address is correct
4. Check email service status

### Emails Going to Spam

**Problem**: Emails are being marked as spam  
**Solutions**:
1. Add sender email to your contacts
2. Mark emails as "Not Spam" in your email client
3. Check email provider's security settings
4. Verify sender domain configuration

### Visitor Not Receiving Confirmation

**Problem**: Visitors report not receiving confirmation emails  
**Solutions**:
1. Check visitor's spam folder
2. Verify visitor email address was entered correctly
3. Check email service logs
4. Ask visitor to check email provider settings

### Form Submission Fails

**Problem**: "Failed to send message" error  
**Solutions**:
1. Verify all required fields are filled
2. Check that message is at least 10 characters
3. Verify email format is valid
4. Check internet connection
5. Try again in a few moments

## Database Schema

Contact messages are stored with the following information:

```sql
CREATE TABLE contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  visitorName VARCHAR(255) NOT NULL,
  visitorEmail VARCHAR(320) NOT NULL,
  visitorPhone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  isRead INT DEFAULT 0,
  emailSent INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Fields Explained

| Field | Type | Purpose |
|-------|------|---------|
| `id` | INT | Unique message identifier |
| `visitorName` | VARCHAR(255) | Visitor's full name |
| `visitorEmail` | VARCHAR(320) | Visitor's email address |
| `visitorPhone` | VARCHAR(20) | Visitor's phone (optional) |
| `subject` | VARCHAR(255) | Message subject/topic |
| `message` | TEXT | Full message content |
| `isRead` | INT | Whether you've read the message (0/1) |
| `emailSent` | INT | Whether notification email was sent (0/1) |
| `createdAt` | TIMESTAMP | When message was submitted |

## API Reference

### Contact Form Submission

**Endpoint**: `trpc.contact.submit`  
**Method**: POST (Mutation)  
**Authentication**: Public (no login required)

**Request Parameters**:
```typescript
{
  visitorName: string;      // Required: 1+ characters
  visitorEmail: string;     // Required: valid email format
  visitorPhone?: string;    // Optional: phone number
  subject: string;          // Required: 1+ characters
  message: string;          // Required: 10+ characters
}
```

**Response**:
```typescript
{
  success: boolean;
  messageId: number;
  message: string;
}
```

**Example Usage**:
```typescript
const result = await trpc.contact.submit.mutate({
  visitorName: 'John Doe',
  visitorEmail: 'john@example.com',
  visitorPhone: '+1234567890',
  subject: 'Job Inquiry',
  message: 'I am interested in discussing opportunities with your organization.'
});

// Response:
// {
//   success: true,
//   messageId: 42,
//   message: 'Thank you for your message! We will get back to you soon.'
// }
```

## Best Practices

### For You (Ahmed)

✅ **Respond Promptly**: Try to respond to inquiries within 24-48 hours  
✅ **Save Important Emails**: Archive emails from promising opportunities  
✅ **Track Follow-ups**: Note which inquiries need follow-up  
✅ **Update Contact Info**: Keep your email address current  
✅ **Monitor Spam**: Check spam folder regularly for missed emails

### For Visitors

✅ **Be Professional**: Write clear, professional messages  
✅ **Include Context**: Explain why you're reaching out  
✅ **Provide Contact Info**: Include your phone number if possible  
✅ **Check Spam**: Look in spam folder if you don't receive confirmation  
✅ **Be Patient**: Allow 24-48 hours for a response

## Email Customization

### Customizing Email Templates

To customize the email templates, edit the email helper functions in `server/email.ts`:

- `sendContactNotification()` - Owner notification email
- `sendContactConfirmation()` - Visitor confirmation email

You can modify:
- Email subject lines
- HTML formatting and styling
- Message content and tone
- Color scheme and branding

### Adding More Email Types

To add additional email notifications (e.g., for specific inquiry types):

1. Create a new function in `server/email.ts`
2. Define the email template (HTML and text)
3. Call the function from the appropriate procedure
4. Add tests in `server/contact.test.ts`

## Security & Privacy

### Data Protection

- All messages are stored securely in the database
- Email addresses are validated before sending
- Phone numbers are optional and not shared
- Messages are only accessible to you
- No data is shared with third parties

### Spam Prevention

- Email validation prevents invalid addresses
- Message length requirements prevent empty/spam messages
- Rate limiting can be added if needed
- Visitor confirmation email verifies active email addresses

### GDPR Compliance

- Visitor data is stored only for contact purposes
- Email addresses are used only to send notifications
- Messages can be deleted anytime
- Privacy policy should mention data collection

## Future Enhancements

Planned improvements to the email notification system:

- [ ] Email digest (daily/weekly summary instead of individual emails)
- [ ] Selective notifications (only for specific inquiry types)
- [ ] Auto-reply templates for common inquiries
- [ ] Message forwarding to multiple email addresses
- [ ] SMS notifications for urgent inquiries
- [ ] Slack/Teams integration for instant alerts
- [ ] Email scheduling (send at specific times)
- [ ] Unsubscribe option for visitors
- [ ] Email analytics and tracking
- [ ] Custom email templates per inquiry type

## Support

For issues or questions about the email notification feature:

1. Check the troubleshooting section above
2. Review the API reference documentation
3. Check email service status
4. Review logs for error messages
5. Contact the development team with details

## FAQ

**Q: How often do I receive emails?**  
A: You receive an email for every contact form submission, immediately after it's submitted.

**Q: Can I change my email address?**  
A: Yes, update the `OWNER_EMAIL` environment variable and restart the server.

**Q: What if I don't want email notifications?**  
A: You can still access all messages through the database. Contact support to disable email sending.

**Q: Are emails sent if the database is down?**  
A: No, the message must be saved to the database first before emails are sent.

**Q: Can I customize the email templates?**  
A: Yes, edit the functions in `server/email.ts` to customize the HTML and content.

**Q: How long are messages stored?**  
A: Messages are stored indefinitely until you manually delete them.

**Q: Can visitors opt-out of confirmation emails?**  
A: Currently no, but this feature can be added if needed.

**Q: What if an email fails to send?**  
A: The system tracks failed emails. You can retry sending or contact support.

---

**Last Updated**: February 2026  
**Version**: 1.0
