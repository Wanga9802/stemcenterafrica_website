import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body;
  if (!data) {
    return res.status(400).json({ error: 'Missing request body' });
  }

  const requiredFields = [
    'serviceTitle',
    'selectedPackageLabel',
    'selectedPackagePrice',
    'businessName',
    'industry',
    'businessDescription',
    'needs',
    'mainGoal',
    'timeline',
    'budget',
    'city',
    'fullName',
    'whatsapp',
    'email',
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      return res.status(400).json({ error: `Missing required field: ${field}` });
    }
  }

  const body = [
    `Service: ${data.serviceTitle}`,
    `Package: ${data.selectedPackageLabel} (${data.selectedPackagePrice})`,
    '',
    '01 - Business Information',
    `Company name: ${data.businessName}`,
    `Industry / sector: ${data.industry}`,
    `Business description: ${data.businessDescription}`,
    '',
    '02 - Your Need',
    `Needs: ${data.needs}`,
    `Main goal: ${data.mainGoal}`,
    `Has website: ${data.hasWebsite || 'No'}`,
    `Website link: ${data.websiteLink || 'N/A'}`,
    `Website issue: ${data.websiteIssue || 'N/A'}`,
    '',
    '03 - Add-ons',
    `Add-ons: ${data.selectedAddonsText || 'None'}`,
    '',
    '04 - Timeline & Budget',
    `Timeline: ${data.timeline}`,
    `Budget: ${data.budget}`,
    '',
    '05 - Location & Communication',
    `City: ${data.city}`,
    `Preferred channel: ${data.contactChannel}`,
    '',
    '06 - Contact',
    `Full name: ${data.fullName}`,
    `WhatsApp number: ${data.whatsapp}`,
    `Email address: ${data.email}`,
    '',
    'Thanks,',
  ].join('\n');

  const message = {
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_FROM,
    subject: `Quote request: ${data.selectedPackageLabel} (${data.serviceTitle})`,
    text: body,
  };

  try {
    await sendgrid.send(message);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('SendGrid error:', error);
    return res.status(500).json({ error: 'Unable to send email. Please try later.' });
  }
}
