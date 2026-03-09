import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const FB_PIXEL_ID = '241134641469691';
const FB_ACCESS_TOKEN = 'EAASB86lbLeEBQ2bHQKGYuch2T6zuZBjOcwZCrV1D0ZAZCZAuSuoPMPZCeZCRsbmlWb4GXWN1BHSkEEssmTyfYN5wlmdekrA9Ki9rU76Wzl5SJYZBBfL5fDWjlkLDZAuShFZCq9ZApd6RqyyZAb5f7zLS4PvZBvpdZCF8e5hid8ZB7iGM2ZCVFeKfA55YpM65KNl7JOJ9D2AV1QZDZD';

interface FBEventPayload {
  event_name: string;
  event_source_url?: string;
  custom_data?: Record<string, unknown>;
  user_agent?: string;
  client_ip?: string;
  fbc?: string;
  fbp?: string;
}

function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body: FBEventPayload = await request.json();

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || '';
    const userAgent = request.headers.get('user-agent') || '';

    const eventData = {
      data: [
        {
          event_name: body.event_name,
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: body.event_source_url,
          user_data: {
            client_ip_address: ip,
            client_user_agent: userAgent,
            ...(body.fbc && { fbc: body.fbc }),
            ...(body.fbp && { fbp: body.fbp }),
          },
          ...(body.custom_data && { custom_data: body.custom_data }),
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Facebook Conversions API error:', result);
      return NextResponse.json({ error: 'Failed to send event' }, { status: 500 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error sending FB event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
