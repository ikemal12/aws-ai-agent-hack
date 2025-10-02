import { BarChart3, TrendingUp, Calendar, Award, Target, Clock, Flame, Medal, ChevronUp, ChevronDown, BookOpen, Brain, Zap } from 'lucide-react'

function ProgressPage() {
  // Mock data - in real app, fetch from API
  const progressData = {
    overallProgress: 68,
    weeklyGoal: 85,
    recentSessions: [
      { date: '2024-01-15', topic: 'Machine Learning Fundamentals', score: 85, duration: '45 min', improvement: '+5%' },
      { date: '2024-01-14', topic: 'React & Frontend Development', score: 92, duration: '30 min', improvement: '+8%' },
      { date: '2024-01-13', topic: 'Data Structures & Algorithms', score: 78, duration: '60 min', improvement: '-2%' },
      { date: '2024-01-12', topic: 'Python Programming', score: 88, duration: '40 min', improvement: '+3%' },
    ],
    topicProgress: [
      { topic: 'Machine Learning', progress: 85, level: 'Advanced', sessions: 24, hours: 18.5 },
      { topic: 'Frontend Development', progress: 72, level: 'Intermediate', sessions: 18, hours: 14.2 },
      { topic: 'Data Structures', progress: 65, level: 'Intermediate', sessions: 15, hours: 12.8 },
      { topic: 'Python Programming', progress: 45, level: 'Beginner', sessions: 8, hours: 6.5 },
    ],
    achievements: [
      { name: '7-Day Streak', description: 'Studied for 7 consecutive days', earned: true, icon: Flame, color: 'orange' },
      { name: 'Quiz Master', description: 'Scored 90% or higher on 5 quizzes', earned: true, icon: Brain, color: 'purple' },
      { name: 'Explorer', description: 'Studied 10 different topics', earned: false, icon: BookOpen, color: 'blue' },
      { name: 'Dedicated Learner', description: '20 hours of total study time', earned: true, icon: Clock, color: 'green' },
    ],
    weeklyStats: [
      { day: 'Mon', hours: 2.5, sessions: 3 },
      { day: 'Tue', hours: 1.8, sessions: 2 },
      { day: 'Wed', hours: 3.2, sessions: 4 },
      { day: 'Thu', hours: 2.1, sessions: 3 },
      { day: 'Fri', hours: 1.5, sessions: 2 },
      { day: 'Sat', hours: 3.8, sessions: 5 },
      { day: 'Sun', hours: 2.7, sessions: 3 },
    ]
  }

  const maxHours = Math.max(...progressData.weeklyStats.map(day => day.hours))

  return (
    <div className="min-h-screen px-6 py-8 sm:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 px-8 py-16 text-white mb-8">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold sm:text-5xl mb-4">Learning Progress</h1>
                <p className="text-xl text-white/90 max-w-2xl">
                  Track your journey, celebrate milestones, and stay motivated with detailed insights
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center">
                      <span className="text-3xl font-bold">{progressData.overallProgress}%</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-white/50" style={{
                    background: `conic-gradient(white 0deg ${progressData.overallProgress * 3.6}deg, transparent ${progressData.overallProgress * 3.6}deg 360deg)`
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-xl ring-1 ring-gray-200">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full -mr-12 -mt-12" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{progressData.overallProgress}%</div>
                  <div className="text-xs text-gray-500">Goal: {progressData.weeklyGoal}%</div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-700">Overall Progress</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${(progressData.overallProgress / progressData.weeklyGoal) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-xl ring-1 ring-gray-200">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -mr-12 -mt-12" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">86%</div>
                  <div className="flex items-center text-xs text-green-600">
                    <ChevronUp className="h-3 w-3 mr-1" />
                    +4% this week
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-700">Average Score</div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-xl ring-1 ring-gray-200">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full -mr-12 -mt-12" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="rounded-lg bg-orange-100 p-2">
                  <Flame className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">7</div>
                  <div className="text-xs text-gray-500">days</div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-700">Study Streak</div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-xl ring-1 ring-gray-200">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -mr-12 -mt-12" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <Medal className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {progressData.achievements.filter(a => a.earned).length}
                  </div>
                  <div className="text-xs text-gray-500">of {progressData.achievements.length}</div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-700">Achievements</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Weekly Activity Chart */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Activity</h2>
              <div className="flex items-end justify-between h-48 space-x-2">
                {progressData.weeklyStats.map((day, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="relative w-full max-w-8 mb-3">
                      <div className="w-full bg-gray-200 rounded-full">
                        <div
                          className="bg-gradient-to-t from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                          style={{ height: `${(day.hours / maxHours) * 120 + 20}px` }}
                        />
                      </div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                        {day.hours}h
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-600">{day.day}</div>
                    <div className="text-xs text-gray-500">{day.sessions} sessions</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-8 mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Sessions</h2>
              <div className="space-y-4">
                {progressData.recentSessions.map((session, index) => (
                  <div key={index} className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{session.topic}</p>
                        <p className="text-sm text-gray-600">{session.date} • {session.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${
                        session.score >= 90 ? 'text-green-600' :
                        session.score >= 80 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {session.score}%
                      </div>
                      <div className={`text-sm flex items-center ${
                        session.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {session.improvement.startsWith('+') ? 
                          <ChevronUp className="h-3 w-3 mr-1" /> : 
                          <ChevronDown className="h-3 w-3 mr-1" />
                        }
                        {session.improvement}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Topic Progress */}
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Topic Mastery</h3>
              <div className="space-y-6">
                {progressData.topicProgress.map((topic, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-gray-900">{topic.topic}</div>
                        <div className="text-sm text-gray-500">{topic.sessions} sessions • {topic.hours}h</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-indigo-600">{topic.progress}%</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          topic.level === 'Advanced' ? 'bg-green-100 text-green-700' :
                          topic.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {topic.level}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                        style={{ width: `${topic.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
              <div className="space-y-4">
                {progressData.achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={index}
                      className={`relative overflow-hidden p-4 rounded-xl border-2 transition-all duration-300 ${
                        achievement.earned
                          ? 'border-transparent shadow-lg'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      {achievement.earned && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${
                          achievement.color === 'orange' ? 'from-orange-400 to-red-400' :
                          achievement.color === 'purple' ? 'from-purple-400 to-pink-400' :
                          achievement.color === 'blue' ? 'from-blue-400 to-indigo-400' :
                          'from-green-400 to-emerald-400'
                        } opacity-10`} />
                      )}
                      <div className="relative flex items-center">
                        <div className={`p-2 rounded-lg ${
                          achievement.earned 
                            ? `${
                              achievement.color === 'orange' ? 'bg-orange-100' :
                              achievement.color === 'purple' ? 'bg-purple-100' :
                              achievement.color === 'blue' ? 'bg-blue-100' :
                              'bg-green-100'
                            }`
                            : 'bg-gray-200'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            achievement.earned 
                              ? `${
                                achievement.color === 'orange' ? 'text-orange-600' :
                                achievement.color === 'purple' ? 'text-purple-600' :
                                achievement.color === 'blue' ? 'text-blue-600' :
                                'text-green-600'
                              }`
                              : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className={`font-semibold ${
                            achievement.earned ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {achievement.name}
                          </div>
                          <div className={`text-sm ${
                            achievement.earned ? 'text-gray-700' : 'text-gray-500'
                          }`}>
                            {achievement.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressPage