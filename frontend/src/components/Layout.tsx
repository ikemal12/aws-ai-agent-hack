import { ReactNode, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  BookOpen, BarChart3, Home, Menu, X, User, Settings, Bell, Sparkles, Zap, Brain, Star,
  Search, ChevronDown, Plus, Filter, Calendar, Clock, Trophy, Target, MessageSquare,
  Bookmark, Download, Share, MoreHorizontal, ChevronLeft, ChevronRight, Maximize2,
  Activity, Layers, Command, Database, Cpu, Network, Shield, Globe, Headphones,
  HelpCircle, LogOut, Moon, Sun, Volume2, Wifi, Battery, Signal
} from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const location = useLocation()

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/', 
      icon: Brain, 
      gradient: 'from-violet-500 to-purple-500',
      badge: null,
      description: 'Neural Command Center'
    },
    { 
      name: 'AI Sessions', 
      href: '/study', 
      icon: Zap, 
      gradient: 'from-blue-500 to-cyan-500',
      badge: '3',
      description: 'Active Learning Sessions'
    },
    { 
      name: 'Analytics', 
      href: '/progress', 
      icon: BarChart3, 
      gradient: 'from-emerald-500 to-teal-500',
      badge: null,
      description: 'Performance Metrics'
    },
  ]

  const quickActions = [
    { name: 'New Session', icon: Plus, color: 'violet' },
    { name: 'Quick Quiz', icon: Target, color: 'blue' },
    { name: 'Study Plan', icon: Calendar, color: 'emerald' },
    { name: 'AI Tutor', icon: MessageSquare, color: 'orange' },
  ]

  const systemStats = [
    { label: 'Neural Load', value: 73, max: 100, color: 'violet' },
    { label: 'Memory', value: 8.2, max: 16, color: 'blue', unit: 'GB' },
    { label: 'Learning Rate', value: 94, max: 100, color: 'emerald' },
  ]

  const notifications = [
    { id: 1, type: 'success', message: 'ML Fundamentals completed', time: '2m ago' },
    { id: 2, type: 'info', message: 'New AI model available', time: '15m ago' },
    { id: 3, type: 'warning', message: 'Study session reminder', time: '1h ago' },
  ]

  const isActive = (path: string) => location.pathname === path

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 flex overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-cosmic-drift" />
        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-particle-float" />
        
        {/* Dynamic cursor effect */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r from-white/60 to-white/30 rounded-full floating-element`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Advanced Sidebar */}
      <div className={`${isSidebarCollapsed ? 'w-20' : 'w-80'} ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-50 h-full glass-sidebar transition-all duration-500 ease-out flex flex-col`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
          <div className={`flex items-center space-x-4 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center neon-glow">
                <Sparkles className="h-5 w-5 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse-ring" />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold neon-text">NeuroLearn</h1>
                <p className="text-slate-400 text-xs">AI Learning Platform</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden lg:flex glass-button p-2 rounded-lg"
            >
              {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden glass-button p-2 rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group relative flex items-center ${isSidebarCollapsed ? 'justify-center px-3' : 'px-4'} py-3 rounded-xl transition-all duration-300 interactive-card ${
                  isActive(item.href)
                    ? 'glass-card neon-border'
                    : 'hover:bg-white/5 hover:glass-card'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div className="relative flex items-center space-x-3 z-10">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} ${isActive(item.href) ? 'neon-glow' : ''} transition-all duration-300`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  {!isSidebarCollapsed && (
                    <div className="flex-1">
                      <div className={`font-medium transition-colors duration-200 ${
                        isActive(item.href) ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500">{item.description}</div>
                    </div>
                  )}
                  {!isSidebarCollapsed && item.badge && (
                    <div className="px-2 py-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full text-xs font-bold text-white">
                      {item.badge}
                    </div>
                  )}
                </div>
                
                {/* Tooltip for collapsed sidebar */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Quick Actions */}
        {!isSidebarCollapsed && (
          <div className="p-4 border-t border-slate-800/50">
            <div className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Quick Actions</div>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.name}
                    className="glass-card p-3 rounded-xl interactive-card group text-center"
                  >
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r ${
                      action.color === 'violet' ? 'from-violet-500 to-purple-500' :
                      action.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                      action.color === 'emerald' ? 'from-emerald-500 to-teal-500' :
                      'from-orange-500 to-red-500'
                    } flex items-center justify-center group-hover:neon-glow transition-all duration-300`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-xs text-slate-300 group-hover:text-white transition-colors">
                      {action.name}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* System Stats */}
        {!isSidebarCollapsed && (
          <div className="p-4 border-t border-slate-800/50">
            <div className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">System Status</div>
            <div className="space-y-3">
              {systemStats.map((stat, index) => (
                <div key={stat.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">{stat.label}</span>
                    <span className="text-slate-300">{stat.value}{stat.unit || '%'}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full bg-gradient-to-r ${
                        stat.color === 'violet' ? 'from-violet-500 to-purple-500' :
                        stat.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                        'from-emerald-500 to-teal-500'
                      } progress-cosmic transition-all duration-700`}
                      style={{ width: `${(stat.value / stat.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className="p-4 border-t border-slate-800/50">
          <div className={`glass-card p-3 interactive-card ${isSidebarCollapsed ? 'text-center' : ''}`}>
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
              </div>
              {!isSidebarCollapsed && (
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Alex Chen</div>
                  <div className="text-xs text-slate-400">Neural Engineer</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        
        {/* Top Navigation Bar */}
        <header className="glass-card m-4 px-6 py-4 neon-border">
          <div className="flex items-center justify-between">
            
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden glass-button p-2 rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search neural networks, sessions, analytics..."
                  className="glass-input pl-10 pr-4 py-2 w-80 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Center Section */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm text-slate-300">Neural Systems Online</span>
              </div>
              <div className="text-sm text-slate-400">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <button className="glass-button p-2 rounded-lg relative">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              </button>
              
              <button className="glass-button p-2 rounded-lg">
                <Settings className="h-5 w-5 hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="glass-button p-2 rounded-lg flex items-center space-x-2"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-800/50">
                      <div className="text-sm font-medium text-white">Alex Chen</div>
                      <div className="text-xs text-slate-400">alex@neurolearn.ai</div>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                      Profile Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                      Learning Preferences
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                      Neural Dashboard
                    </button>
                    <div className="border-t border-slate-800/50 mt-2 pt-2">
                      <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 custom-scroll">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
      )}
    </div>
  )
}

export default Layout