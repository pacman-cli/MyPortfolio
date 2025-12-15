"use client";

import { useEffect, useState } from 'react';
import { ActivityCalendar, Activity, ThemeInput } from 'react-activity-calendar';
import { Card } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { Github, Flame, Trophy, Calendar, Users } from 'lucide-react';
import axios from 'axios';
import { subDays } from 'date-fns';
import { getGithubProfile } from '@/lib/github';

interface ContributionData {
  total: {
    [year: string]: number;
    lastYear: number;
  };
  contributions: Array<{
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
  }>;
}

export const GithubActivity = () => {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [followers, setFollowers] = useState(0);

  const username = 'pacman-cli';

  // Custom Green Theme
  const theme: ThemeInput = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contribResponse, profile] = await Promise.all([
            axios.get(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
            getGithubProfile()
        ]);
        
        setData(contribResponse.data);
        calculateStreak(contribResponse.data.contributions);
        if (profile) setFollowers(profile.followers);
      } catch (error) {
        console.error("Failed to fetch GitHub contributions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculateStreak = (contributions: Array<{ date: string; count: number }>) => {
    // Simple current streak calculation
    // Reverse array to start from today/yesterday
    const reversed = [...contributions].reverse();
    let currentStreak = 0;
    
    // Check from today backwards
    // Note: This API might return today as the last entry, or yesterday depending on timezone
     for (const day of reversed) {
        if (day.count > 0) {
            currentStreak++;
        } else {
            // Allow missing today if it's just started, but break on first zero
             const today = new Date().toISOString().split('T')[0];
             if (day.date !== today) {
                  break;
             }
        }
    }
    setStreak(currentStreak);
  };

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Github className="w-8 h-8" /> Open Source Activity
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full" />
            <p className="mt-4 text-muted-foreground">
              My contributions to the open source community over the last year.
            </p>
          </div>
        </Reveal>

        {loading ? (
             <div className="flex justify-center h-40 items-center text-muted-foreground animate-pulse">
                Loading contribution data...
             </div>
        ) : data ? (
            <div className="max-w-5xl mx-auto">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Reveal delay={0.1}>
                        <Card className="p-6 flex flex-col items-center justify-center text-center gap-3 hover:border-green-500/50 transition-colors group">
                            <div className="p-3 bg-green-500/10 rounded-full text-green-600 group-hover:scale-110 transition-transform">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{data.total.lastYear}</p>
                                <p className="text-xs text-muted-foreground mt-1">Total Contributions</p>
                            </div>
                        </Card>
                    </Reveal>
                    
                    <Reveal delay={0.2}>
                         <Card className="p-6 flex flex-col items-center justify-center text-center gap-3 hover:border-orange-500/50 transition-colors group">
                            <div className="p-3 bg-orange-500/10 rounded-full text-orange-600 group-hover:scale-110 transition-transform">
                                <Flame className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{streak}</p>
                                <p className="text-xs text-muted-foreground mt-1">Current Streak</p>
                            </div>
                        </Card>
                    </Reveal>

                    <Reveal delay={0.3}>
                         <Card className="p-6 flex flex-col items-center justify-center text-center gap-3 hover:border-blue-500/50 transition-colors group">
                            <div className="p-3 bg-blue-500/10 rounded-full text-blue-600 group-hover:scale-110 transition-transform">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{new Date().getFullYear()}</p>
                                <p className="text-xs text-muted-foreground mt-1">Current Year</p>
                            </div>
                        </Card>
                    </Reveal>

                     <Reveal delay={0.4}>
                         <Card className="p-6 flex flex-col items-center justify-center text-center gap-3 hover:border-purple-500/50 transition-colors group">
                            <div className="p-3 bg-purple-500/10 rounded-full text-purple-600 group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{followers}</p>
                                <p className="text-xs text-muted-foreground mt-1">GitHub Followers</p>
                            </div>
                        </Card>
                    </Reveal>
                </div>

                {/* Calendar */}
                <Reveal delay={0.5}>
                    <Card className="p-6 md:p-8 flex justify-center bg-card/50 backdrop-blur-sm overflow-x-auto">
                         <div className="min-w-[800px] md:min-w-0">
                            <ActivityCalendar 
                                data={data.contributions}
                                theme={theme}
                                showWeekdayLabels
                                labels={{
                                    legend: {
                                        less: 'Less',
                                        more: 'More',
                                    },
                                    months: [
                                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                                    ],
                                    totalCount: '{{count}} contributions in {{year}}',
                                    weekdays: [
                                    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
                                    ]
                                }}
                            />
                        </div>
                    </Card>
                </Reveal>
            </div>
        ) : (
            <div className="text-center text-muted-foreground">
                Unable to load GitHub activity at this time.
            </div>
        )}
      </div>
    </section>
  );
};
