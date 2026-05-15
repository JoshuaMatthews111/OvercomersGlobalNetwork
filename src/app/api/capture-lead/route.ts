import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, book, source } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Send notification email to OGN Media
    const notificationEmail = 'ognmedia2024@gmail.com';
    
    // For now, we'll log the lead and you can integrate with your email service
    // Options: SendGrid, Mailchimp, ConvertKit, etc.
    console.log('New Lead Captured:', {
      email,
      firstName,
      book,
      source,
      timestamp: new Date().toISOString(),
      notifyEmail: notificationEmail,
    });

    // If you have an email service API key, uncomment and configure:
    /*
    // Example with SendGrid:
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    await sgMail.send({
      to: notificationEmail,
      from: 'noreply@overcomersglobalnetwork.com',
      subject: `New Lead: ${book} - ${firstName}`,
      html: `
        <h2>New Book Lead Captured</h2>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Book:</strong> ${book}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    // Send welcome email to the lead
    await sgMail.send({
      to: email,
      from: 'noreply@overcomersglobalnetwork.com',
      subject: `Your Free Chapter of ${book} is Ready!`,
      html: `
        <h2>Welcome, ${firstName}!</h2>
        <p>Thank you for your interest in <strong>${book}</strong> by Prophet Joshua Matthews.</p>
        <p>Click the button below to read your free chapter:</p>
        <a href="https://overcomersglobalnetwork.com/books/divine-intimacy" 
           style="display:inline-block;background:#C9A24A;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;">
          Read Free Chapter
        </a>
        <p>God bless you on your journey to Divine Intimacy!</p>
        <p>— Overcomers Global Network</p>
      `,
    });
    */

    return NextResponse.json({ 
      success: true,
      message: 'Lead captured successfully'
    });
  } catch (error: any) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to capture lead' },
      { status: 500 }
    );
  }
}
