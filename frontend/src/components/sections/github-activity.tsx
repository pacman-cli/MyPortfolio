"use client";

import { useEffect, useState } from 'react';
import { ActivityCalendar, ThemeInput } from 'react-activity-calendar';
import { Card } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { Github, Flame, Trophy, Calendar, Users } from 'lucide-react';
import axios from 'axios';
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

  // Responsive State (Mobile First Defaults)
  const [blockSize, setBlockSize] = useState(10); // Smaller for mobile
  const [blockRadius, setBlockRadius] = useState(2);
  const [blockMargin, setBlockMargin] = useState(2); // Tighter gap
  const [fontSize, setFontSize] = useState(12); // Smaller text

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

    // Responsive Handler
    const handleResize = () => {
        const width = window.innerWidth;
        if (width < 640) { // Mobile (Strict Rules)
            setBlockSize(10); 
            setBlockMargin(2);
            setBlockRadius(2); 
            setFontSize(12);
        } else if (width < 1024) { // Tablet
            setBlockSize(12);
            setBlockMargin(3);
            setBlockRadius(3);
            setFontSize(14);
        } else { // Desktop
            setBlockSize(14);
            setBlockMargin(4);
            setBlockRadius(3);
            setFontSize(14);
        }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateStreak = (contributions: Array<{ date: string; count: number }>) => {
    const reversed = [...contributions].reverse();
    let currentStreak = 0;
    
     for (const day of reversed) {
        if (day.count > 0) currentStreak++;
        else {
             const today = new Date().toISOString().split('T')[0];
             if (day.date !== today) break;
        }
    }
    setStreak(currentStreak);
  };

  return (
    <section className="py-12 md:py-20 bg-muted/10 relative overflow-hidden w-full">
        {/* Background blobs - Hidden on small mobile to reduce noise */}
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[100px] -z-10" />

      {/* Constrained Container - Strict 16px padding on mobile */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Header Section */}
        <Reveal width="100%">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 flex items-center justify-center gap-2 md:gap-3">
              <Github className="w-5 h-5 md:w-8 md:h-8" /> 
              <span>Open Source Activity</span>
            </h2>
            <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-4" />
            <p className="text-sm md:text-base text-muted-foreground mx-auto max-w-md md:max-w-lg leading-relaxed">
              My contributions to the open source community.
            </p>
          </div>
        </Reveal>

        {loading ? (
             <div className="flex justify-center h-40 items-center text-muted-foreground animate-pulse text-sm">
                Loading contribution data...
             </div>
        ) : data ? (
            <div className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-8">
                
                {/* Stats Grid - Strict 2x2 on Mobile with Equality */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                    <StatCard 
                        icon={<Trophy className="w-4 h-4 md:w-5 md:h-5" />} 
                        value={data.total.lastYear} 
                        label="Total Contributions" 
                        color="text-green-500" 
                        bg="bg-green-500/10"
                        delay={0.1}
                    />
                    <StatCard 
                        icon={<Flame className="w-4 h-4 md:w-5 md:h-5" />} 
                        value={streak} 
                        label="Current Streak" 
                        color="text-orange-500" 
                        bg="bg-orange-500/10"
                        delay={0.2}
                    />
                    <StatCard 
                        icon={<Calendar className="w-4 h-4 md:w-5 md:h-5" />} 
                        value={new Date().getFullYear()} 
                        label="Current Year" 
                        color="text-blue-500" 
                        bg="bg-blue-500/10"
                        delay={0.3}
                    />
                    <StatCard 
                        icon={<Users className="w-4 h-4 md:w-5 md:h-5" />} 
                        value={followers} 
                        label="Followers" 
                        color="text-purple-500" 
                        bg="bg-purple-500/10"
                        delay={0.4}
                    />
                </div>

                {/* Calendar Wrapper */}
                <Reveal delay={0.5}>
                    <Card className="p-3 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/5 flex flex-col shadow-sm">
                         {/* Scrollable Container with Min Width */}
                         <div className="w-full overflow-x-auto pb-2 hide-scrollbar">
                             {/* Min-width ensures grid doesn't squash, users scroll horizontally */}
                             <div className="min-w-[600px] md:min-w-full flex justify-center md:items-center px-1">
                                <ActivityCalendar 
                                    data={data.contributions}
                                    theme={theme}
                                    blockSize={blockSize}
                                    blockMargin={blockMargin}
                                    blockRadius={blockRadius}
                                    fontSize={fontSize}
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
                        </div>
                    </Card>
                </Reveal>
            </div>
        ) : (
            <div className="text-center text-sm text-muted-foreground">
                Unable to load GitHub activity at this time.
            </div>
        )}
      </div>
    </section>
  );
};

// Reusable Stat Card - Equal Height Enforced
// Passing className="h-full" to Reveal to ensure the wrapper stretches
const StatCard = ({ icon, value, label, color, bg, delay }: any) => (
    <Reveal delay={delay} className="h-full">
        <Card className="h-full p-3 md:p-6 flex flex-col items-center justify-center text-center gap-1.5 md:gap-2 bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all shadow-sm">
            <div className={`p-2 md:p-3 rounded-full ${bg} ${color}`}>
                {icon}
            </div>
            <div className="flex flex-col gap-0.5">
                <p className="text-lg md:text-3xl font-bold text-foreground leading-none md:leading-normal">{value}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight">{label}</p>
            </div>
        </Card>
    </Reveal>
);
