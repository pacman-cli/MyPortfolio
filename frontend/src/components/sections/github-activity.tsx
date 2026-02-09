"use client"

import { Reveal } from '@/components/ui/reveal'
import { getGithubProfile } from '@/lib/github'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Calendar, Flame, Github, Trophy, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ActivityCalendar, ThemeInput } from 'react-activity-calendar'

interface ContributionData {
  total: {
    [year: string]: number
    lastYear: number
  }
  contributions: Array<{
    date: string
    count: number
    level: 0 | 1 | 2 | 3 | 4
  }>
}

export const GithubActivity = () => {
  const [data, setData] = useState<ContributionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [streak, setStreak] = useState(0)
  const [followers, setFollowers] = useState(0)

  const username = 'pacman-cli'

  // Premium Green Theme (Emerald)
  const theme: ThemeInput = {
    light: ['#f0fdf4', '#dcfce7', '#86efac', '#22c55e', '#15803d'],
    dark: ['#1e293b', '#064e3b', '#059669', '#10b981', '#34d399'],
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contribResponse, profile] = await Promise.all([
          axios.get(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
          getGithubProfile()
        ])

        setData(contribResponse.data)
        calculateStreak(contribResponse.data.contributions)
        if (profile) setFollowers(profile.followers)
      } catch (error) {
        console.error("Failed to fetch GitHub contributions", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const calculateStreak = (contributions: Array<{ date: string; count: number }>) => {
    const reversed = [...contributions].reverse()
    let currentStreak = 0

    for (const day of reversed) {
      if (day.count > 0) currentStreak++
      else {
        const today = new Date().toISOString().split('T')[0]
        if (day.date !== today) break
      }
    }
    setStreak(currentStreak)
  }

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden" id="open-source">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Header */}
        <Reveal width="100%">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
              <Github className="w-4 h-4" />
              <span>Open Source</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Contributions & Activity
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Building public tools and contributing to the developer ecosystem.
            </p>
          </div>
        </Reveal>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
            ))}
          </div>
        ) : data ? (
          <div className="flex flex-col gap-8">

            {/* Stats Grid - Premium Layout (Fixed) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pb-4 md:pb-0">
              <StatCard
                icon={<Trophy className="w-4 h-4 md:w-5 md:h-5" />}
                value={data.total.lastYear}
                label="Total Contributions"
                delay={0.1}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
              />
              <StatCard
                icon={<Flame className="w-4 h-4 md:w-5 md:h-5" />}
                value={streak}
                label="Current Streak"
                delay={0.2}
                iconColor="text-orange-500"
                bgColor="bg-orange-500/10"
              />
              <StatCard
                icon={<Calendar className="w-4 h-4 md:w-5 md:h-5" />}
                value={new Date().getFullYear()}
                label="Active Year"
                delay={0.3}
                iconColor="text-blue-500"
                bgColor="bg-blue-500/10"
              />
              <StatCard
                icon={<Users className="w-4 h-4 md:w-5 md:h-5" />}
                value={followers}
                label="Followers"
                delay={0.4}
                iconColor="text-purple-500"
                bgColor="bg-purple-500/10"
              />
            </div>


            {/* Calendar - Clean Container */}
            <Reveal delay={0.5} width="100%">
              <motion.div
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 overflow-hidden hover:border-emerald-500/30 transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                <div className="overflow-x-auto pb-2 scrollbar-hide">
                  <div className="min-w-[800px] flex justify-center md:min-w-0">
                    <ActivityCalendar
                      data={data.contributions}
                      theme={theme}
                      blockSize={13}
                      blockMargin={4}
                      blockRadius={2}
                      fontSize={12}
                      showWeekdayLabels
                    />
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Unable to load contribution data.
          </div>
        )}
      </div>
    </section>
  )
}

// Refined Stat Card
interface StatCardProps {
  icon: React.ReactNode
  value: number | string
  label: string
  delay: number
  iconColor: string
  bgColor: string
}

const StatCard = ({ icon, value, label, delay, iconColor, bgColor }: StatCardProps) => (
  <Reveal delay={delay} width="100%">
    <motion.div
      className="group relative flex items-center gap-2 md:gap-4 p-3 md:p-5 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 transition-all duration-300 w-full hover:-translate-y-1"
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`p-2.5 md:p-3 rounded-xl ${bgColor} ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <div>
        <div className="text-xl md:text-2xl font-bold tracking-tight">{value}</div>
        <div className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">{label}</div>
      </div>
    </motion.div>
  </Reveal>
)
