import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Supabase (server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function POST(request) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !subject || !message) {
    return Response.json({ error: 'All fields are required.' }, { status: 400 });
  }

  try {
    // Save to Supabase
    await supabase.from('contact_submissions').insert({
      name,
      email,
      subject,
      message,
      status: 'new',
    });

    // Send confirmation email
    await resend.emails.send({
      from: 'noreply@theology-geopolitics.com',
      to: email,
      subject: 'We received your message',
      html: `<h2>Thank you ${name}!</h2><p>We received your message and will get back to you soon.</p>`,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
