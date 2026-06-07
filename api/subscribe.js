const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getRestUrl() {
  const configuredUrl = process.env.SUPABASE_URL;

  if (!configuredUrl) {
    return null;
  }

  const trimmedUrl = configuredUrl.replace(/\/+$/, '');

  if (trimmedUrl.endsWith('/rest/v1')) {
    return trimmedUrl;
  }

  return `${trimmedUrl}/rest/v1`;
}

function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const requiredStrings = ['name', 'company', 'email', 'role'];
  const hasRequiredStrings = requiredStrings.every(
    key => typeof payload[key] === 'string' && payload[key].trim().length > 0
  );

  if (!hasRequiredStrings || !EMAIL_PATTERN.test(payload.email)) {
    return false;
  }

  if (!Array.isArray(payload.interests) || payload.interests.length === 0) {
    return false;
  }

  return payload.consent_privacy === true && payload.consent_marketing === true;
}

function isDuplicateEmailError(status, errorBody) {
  if (status === 409 || errorBody?.code === '23505') {
    return true;
  }

  const errorText = [
    errorBody?.message,
    errorBody?.details,
    errorBody?.hint
  ].filter(Boolean).join(' ').toLowerCase();

  return errorText.includes('duplicate key') || errorText.includes('unique constraint');
}

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseRestUrl = getRestUrl();
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseRestUrl || !supabaseKey) {
    return response.status(500).json({ error: 'Missing Supabase configuration' });
  }

  const payload = typeof request.body === 'string'
    ? JSON.parse(request.body)
    : request.body;

  if (!validatePayload(payload)) {
    return response.status(400).json({ error: 'Invalid subscription payload' });
  }

  const subscriber = {
    name: payload.name.trim(),
    company: payload.company.trim(),
    email: payload.email.trim().toLowerCase(),
    role: payload.role,
    interests: payload.interests,
    consent_privacy: payload.consent_privacy === true,
    consent_marketing: payload.consent_marketing === true,
    consent_event: payload.consent_event === true,
    source: 'landing_page'
  };

  try {
    const supabaseResponse = await fetch(`${supabaseRestUrl}/subscribers`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(subscriber)
    });

    if (!supabaseResponse.ok) {
      const errorBody = await supabaseResponse.json().catch(() => null);

      if (isDuplicateEmailError(supabaseResponse.status, errorBody)) {
        return response.status(409).json({
          error: 'Duplicate email',
          code: 'DUPLICATE_EMAIL'
        });
      }

      return response.status(502).json({ error: 'Supabase insert failed' });
    }
  } catch (error) {
    return response.status(502).json({ error: 'Supabase insert failed' });
  }

  return response.status(201).json({ ok: true });
};
