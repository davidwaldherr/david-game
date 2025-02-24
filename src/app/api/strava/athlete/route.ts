import { NextResponse } from 'next/server';

console.log('Environment check:', {
  hasClientId: !!process.env.STRAVA_CLIENT_ID,
  hasClientSecret: !!process.env.STRAVA_CLIENT_SECRET,
  hasAccessToken: !!process.env.STRAVA_ACCESS_TOKEN,
  hasRefreshToken: !!process.env.STRAVA_REFRESH_TOKEN
});

async function refreshAccessToken() {
  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  try {
    let accessToken = process.env.STRAVA_ACCESS_TOKEN;
    console.log('Starting API calls with token:', accessToken?.slice(0, 10) + '...');

    let response = await fetch('https://www.strava.com/api/v3/athlete', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    // Always refresh token first
    console.log('Refreshing token...');
    accessToken = await refreshAccessToken();
    
    response = await fetch('https://www.strava.com/api/v3/athlete', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch athlete data');
    }

    const athleteData = await response.json();
    console.log('Athlete ID:', athleteData.id);

    // Fetch athlete stats
    const statsResponse = await fetch(`https://www.strava.com/api/v3/athletes/${athleteData.id}/stats`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (statsResponse.ok) {
      const statsData = await statsResponse.json();
      athleteData.stats = statsData;
    }

    // Fetch recent activities with logging
    console.log('Fetching activities...');
    const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?per_page=7&access_token=${accessToken}`;
    console.log('Activities URL:', activitiesUrl);
    
    const activitiesResponse = await fetch(activitiesUrl);

    console.log('Activities response status:', activitiesResponse.status);
    if (activitiesResponse.ok) {
      const activitiesData = await activitiesResponse.json();
      console.log('Activities data:', JSON.stringify(activitiesData, null, 2));
      athleteData.activities = activitiesData;
    } else {
      const errorText = await activitiesResponse.text();
      console.error('Failed to fetch activities:', errorText);
      // Try alternative endpoint
      const altActivitiesResponse = await fetch(
        'https://www.strava.com/api/v3/activities?per_page=7',
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      if (altActivitiesResponse.ok) {
        const activitiesData = await altActivitiesResponse.json();
        console.log('Activities fetched from alt endpoint:', activitiesData.length);
        athleteData.activities = activitiesData;
      }
    }

    // Log final data structure
    console.log('Final data structure:', {
      hasStats: !!athleteData.stats,
      hasActivities: !!athleteData.activities,
      activitiesCount: athleteData.activities?.length,
      firstActivity: athleteData.activities?.[0]
    });

    return NextResponse.json(athleteData);
  } catch (error) {
    console.error('Strava API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Strava data' },
      { status: 500 }
    );
  }
}