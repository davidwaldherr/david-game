'use client';

import { useEffect, useState } from 'react';
import HomeBackground from "@/components/Backgrounds/HomeBackground";

interface Activity {
  id: number;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  start_date: string;
}

interface AthleteData {
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  country: string;
  profile: string;
  stats?: {
    all_run_totals: {
      count: number;
      distance: number;
      moving_time: number;
      elapsed_time: number;
    };
    all_ride_totals: {
      count: number;
      distance: number;
      moving_time: number;
      elapsed_time: number;
    };
    recent_run_totals: {
      count: number;
      distance: number;
      moving_time: number;
      elapsed_time: number;
    };
    biggest_climb_elevation_gain: number;
    biggest_ride_distance: number;
  };
  activities?: Activity[];
}

// Add color constants at the top
const COLORS = {
  stats: {
    distance: { bg: '#FF6B6B', border: '#FF4949', text: '#2D0404' },
    activities: { bg: '#4ECDC4', border: '#45B7B0', text: '#0A2827' },
    time: { bg: '#FFE66D', border: '#FFD93D', text: '#2D2504' }
  },
  profile: {
    bg: '#FF8484',
    border: '#FF6B6B',
  },
  activities: {
    bg: '#95DAC1',
    border: '#6FB69B',
    text: '#0F2D24',
    heading: '#FFD93D'
  }
};

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

function StatBox({ title, value, unit, colorScheme }: { 
  title: string; 
  value: string | number; 
  unit?: string;
  colorScheme: { bg: string; border: string; text: string };
}) {
  return (
    <div 
      className="p-4 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
      style={{
        backgroundColor: colorScheme.bg,
        border: `4px solid ${colorScheme.border}`,
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
        color: colorScheme.text
      }}
    >
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-4xl font-black">
        {value}
        {unit && <span className="text-2xl ml-1">{unit}</span>}
      </p>
    </div>
  );
}

function ActivityBar({ activity }: { activity: Activity }) {
  const date = new Date(activity.start_date);
  const formattedDate = date.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });

  return (
    <div 
      className="p-4 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
      style={{
        backgroundColor: COLORS.activities.bg,
        border: `4px solid ${COLORS.activities.border}`,
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
        color: COLORS.activities.text
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="font-bold text-xl">{activity.name}</h3>
          <p className="font-bold opacity-80">
            {formattedDate} at {formattedTime}
          </p>
        </div>
        <div className="flex gap-8 items-center">
          <div className="text-right">
            <p className="font-bold">Distance</p>
            <p className="text-2xl font-black">
              {(activity.distance / 1609.34).toFixed(2)}
              <span className="text-lg ml-1">mi</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold">Time</p>
            <p className="text-2xl font-black">
              {formatTime(activity.moving_time)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold">Type</p>
            <p className="text-2xl font-black">
              {activity.type}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StravaDashboard() {
  const [athleteData, setAthleteData] = useState<AthleteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAthleteData = async () => {
      try {
        const response = await fetch('/api/strava/athlete');
        if (!response.ok) throw new Error('Failed to fetch athlete data');
        const data = await response.json();
        setAthleteData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAthleteData();
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div className="fixed inset-0">
        <HomeBackground />
      </div>
      <div className="absolute inset-0 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* All-time Stats Section */}
          {athleteData?.stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <StatBox 
                title="Total Distance" 
                value={((athleteData.stats.all_run_totals.distance + athleteData.stats.all_ride_totals.distance) / 1609.34).toFixed(1)}
                unit="mi"
                colorScheme={COLORS.stats.distance}
              />
              <StatBox 
                title="Total Activities" 
                value={athleteData.stats.all_run_totals.count + athleteData.stats.all_ride_totals.count}
                colorScheme={COLORS.stats.activities}
              />
              <StatBox 
                title="Total Time" 
                value={formatTime(athleteData.stats.all_run_totals.moving_time + athleteData.stats.all_ride_totals.moving_time)}
                colorScheme={COLORS.stats.time}
              />
            </div>
          )}

          {/* Profile Section */}
          <div className="flex justify-center mb-12">
            {loading && <div className="text-black text-center text-2xl font-bold">Loading...</div>}
            {error && <div className="text-red-500 text-center text-2xl font-bold">{error}</div>}
            {athleteData?.profile && (
              <div 
                className="p-2 rounded-full hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
                style={{
                  backgroundColor: COLORS.profile.bg,
                  border: `4px solid ${COLORS.profile.border}`,
                  boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)'
                }}
              >
                <img 
                  src={athleteData.profile} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full"
                />
              </div>
            )}
          </div>

          {/* Recent Activities Section */}
          {athleteData?.activities && (
            <div className="space-y-4">
              <h2 
                className="text-3xl font-black mb-6 text-center"
                style={{ color: COLORS.activities.heading }}
              >
                Recent Activities
              </h2>
              {athleteData.activities.map(activity => (
                <ActivityBar key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
