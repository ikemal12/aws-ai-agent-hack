import { useState } from 'react'
import { Brain, Zap, Rocket, Star, Play, BookOpen, TrendingUp, Users, Bell, Target } from 'lucide-react'

function HomePage() {
  const [userName] = useState('Alex') // In real app, get from auth context

  // Data for dashboard components
  const notifications = [
    { id: 1, type: 'success', message: 'Neural session completed successfully', time: '2 min ago' },
    { id: 2, type: 'info', message: 'New learning path unlocked', time: '5 min ago' },
    { id: 3, type: 'warning', message: 'Weekly goal 85% complete', time: '1 hour ago' },
  ]

  const quickActions = [
    { name: 'Start Learning', icon: Play, color: 'violet' },
    { name: 'View Progress', icon: TrendingUp, color: 'blue' },
    { name: 'Study Group', icon: Users, color: 'emerald' },
    { name: 'Knowledge Base', icon: BookOpen, color: 'orange' },
  ]

  const aiAgents = [
    {
      icon: Brain,
      name: 'Neural Processor',
      description: 'Advanced deep learning algorithms that understand your unique learning patterns and optimize content delivery.',
      status: 'Active',
      gradient: 'from-violet-500 to-purple-500',
      particles: 24
    },
    {
      icon: Zap,
      name: 'Content Generator',
      description: 'Real-time content creation powered by large language models, tailored to your current skill level.',
      status: 'Processing',
      gradient: 'from-blue-500 to-cyan-500',
      particles: 18
    },
    {
      icon: Target,
      name: 'Progress Analyzer',
      description: 'Intelligent analytics engine that tracks micro-improvements and predicts optimal learning paths.',
      status: 'Analyzing',
      gradient: 'from-emerald-500 to-teal-500',
      particles: 21
    },
    {
      icon: Rocket,
      name: 'Adaptive Engine',
      description: 'Dynamic difficulty adjustment system that ensures optimal challenge levels for accelerated growth.',
      status: 'Optimizing',
      gradient: 'from-orange-500 to-red-500',
      particles: 15
    },
  ]

  const recentSessions = [
    { name: 'Quantum Computing Fundamentals', progress: 94, time: '2h ago', difficulty: 'Advanced', score: 98 },
    { name: 'Neural Network Architecture', progress: 76, time: '1 day ago', difficulty: 'Expert', score: 92 },
    { name: 'Machine Learning Ethics', progress: 88, time: '2 days ago', difficulty: 'Intermediate', score: 89 },
  ]

  const systemMetrics = [
    { label: 'Neural Networks', value: '47', unit: 'Active', gradient: 'from-violet-500 to-purple-500' },
    { label: 'Processing Speed', value: '2.4', unit: 'THz', gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Knowledge Base', value: '847', unit: 'TB', gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Accuracy Rate', value: '99.7', unit: '%', gradient: 'from-orange-500 to-red-500' },
  ]

  return (
    <div className="space-y-6">
      
      {/* Welcome Header & Quick Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Welcome Panel */}
        <div className="xl:col-span-2 glass-card p-8 neon-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, <span className="neon-text">{userName}</span>
                </h1>
                <p className="text-slate-300">Your neural learning matrix is optimized and ready</p>
              </div>
              <div className="glass-button px-4 py-2 rounded-xl">
                <span className="flex items-center text-sm">
                  <Rocket className="mr-2 h-4 w-4" />
                  Start Session
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent mb-1`}>
                    {metric.value}{metric.unit}
                  </div>
                  <div className="text-xs text-slate-400">{metric.label}</div>
                  <div className={`mt-2 h-1 bg-gradient-to-r ${metric.gradient} rounded-full progress-cosmic`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-card p-6 neon-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Activity Feed</h3>
            <Bell className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 glass-card rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.type === 'success' ? 'bg-emerald-400' :
                  notification.type === 'info' ? 'bg-blue-400' : 'bg-yellow-400'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-slate-300">{notification.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* AI Agents Status */}
        <div className="xl:col-span-2 glass-card p-6 neon-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Neural Agent Matrix</h3>
            <div className="flex items-center space-x-2 glass-card px-3 py-1 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-slate-300">All Systems Online</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {aiAgents.map((agent, index) => {
              const Icon = agent.icon
              return (
                <div key={index} className="glass-card p-4 interactive-card group relative overflow-hidden">
                  {/* Micro particles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 bg-gradient-to-r ${agent.gradient} rounded-full animate-particle-float opacity-40`}
                        style={{
                          left: `${20 + i * 20}%`,
                          top: `${20 + i * 15}%`,
                          animationDelay: `${i * 0.8}s`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${agent.gradient}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        agent.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' :
                        agent.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                        agent.status === 'Analyzing' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {agent.status}
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{agent.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{agent.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-slate-500">{agent.particles} processes</span>
                      <div className="w-16 h-1 bg-slate-800 rounded-full">
                        <div className={`h-1 bg-gradient-to-r ${agent.gradient} rounded-full progress-cosmic`} style={{ width: '75%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="glass-card p-6 neon-border">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <button
                  key={index}
                  className="w-full glass-card p-4 interactive-card group text-left rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${
                      action.color === 'violet' ? 'from-violet-500 to-purple-500' :
                      action.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                      action.color === 'emerald' ? 'from-emerald-500 to-teal-500' :
                      'from-orange-500 to-red-500'
                    }`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:neon-text transition-colors">
                        {action.name}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="glass-card p-6 neon-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Recent Neural Sessions</h3>
          <button className="glass-button px-4 py-2 rounded-xl text-sm">
            View All Sessions
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {recentSessions.map((session, index) => (
            <div key={index} className="glass-card p-4 interactive-card group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center neon-glow">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white group-hover:neon-text transition-colors">
                    {session.name}
                  </h4>
                  <p className="text-xs text-slate-400">{session.time}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  session.difficulty === 'Expert' ? 'bg-red-500/20 text-red-400' :
                  session.difficulty === 'Advanced' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {session.difficulty}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Progress</span>
                  <span className="text-xs font-medium text-slate-300">{session.progress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full progress-cosmic transition-all duration-700"
                    style={{ width: `${session.progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-slate-400">Neural Score</span>
                  <span className="text-sm font-bold text-emerald-400">{session.score}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Analytics Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 neon-border">
          <h3 className="text-lg font-semibold text-white mb-4">Weekly Learning Pattern</h3>
          <div className="flex items-end justify-between h-32 space-x-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="flex flex-col items-center flex-1">
                <div className="w-full bg-slate-800 rounded-full mb-2">
                  <div
                    className="bg-gradient-to-t from-violet-500 to-purple-500 rounded-full transition-all duration-700"
                    style={{ height: `${Math.random() * 80 + 20}px` }}
                  />
                </div>
                <span className="text-xs text-slate-400">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 neon-border">
          <h3 className="text-lg font-semibold text-white mb-4">Knowledge Domains</h3>
          <div className="space-y-4">
            {[
              { name: 'Machine Learning', level: 94, color: 'from-violet-500 to-purple-500' },
              { name: 'Neural Networks', level: 87, color: 'from-blue-500 to-cyan-500' },
              { name: 'Data Science', level: 71, color: 'from-emerald-500 to-teal-500' },
              { name: 'Quantum Computing', level: 58, color: 'from-orange-500 to-red-500' },
            ].map((domain, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">{domain.name}</span>
                  <span className="text-sm font-medium text-slate-300">{domain.level}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className={`h-2 bg-gradient-to-r ${domain.color} rounded-full progress-cosmic transition-all duration-700`}
                    style={{ width: `${domain.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage