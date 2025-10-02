import { useState } from 'react'
import { Send, Lightbulb, HelpCircle, BookOpen, Brain, Zap, Clock, Star, ChevronRight, Sparkles } from 'lucide-react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { apiClient } from '../utils/api'

interface Topic {
  id: string
  name: string
  difficulty_levels: string[]
}

function StudyPage() {
  const [selectedTopic, setSelectedTopic] = useState('')
  const [difficulty, setDifficulty] = useState('intermediate')
  const [action, setAction] = useState('explain')
  const [generatedContent, setGeneratedContent] = useState('')

  // Fetch available topics
  const { data: topicsData, isLoading: topicsLoading } = useQuery({
    queryKey: ['topics'],
    queryFn: () => apiClient.get('/content/topics'),
  })

  // Content generation mutation
  const generateContentMutation = useMutation({
    mutationFn: (request: any) => apiClient.post('/content/generate', request),
    onSuccess: (data) => {
      setGeneratedContent(data.data?.content || 'Content generated successfully!')
    },
    onError: (error) => {
      console.error('Error generating content:', error)
      setGeneratedContent('Error generating content. Please try again.')
    },
  })

  const topics: Topic[] = topicsData?.topics || [
    { id: '1', name: 'Machine Learning Fundamentals', difficulty_levels: ['beginner', 'intermediate', 'advanced'] },
    { id: '2', name: 'Data Structures & Algorithms', difficulty_levels: ['beginner', 'intermediate', 'advanced'] },
    { id: '3', name: 'React & Frontend Development', difficulty_levels: ['beginner', 'intermediate', 'advanced'] },
    { id: '4', name: 'Python Programming', difficulty_levels: ['beginner', 'intermediate', 'advanced'] },
    { id: '5', name: 'Database Design', difficulty_levels: ['beginner', 'intermediate', 'advanced'] },
  ]

  const handleGenerateContent = () => {
    if (!selectedTopic) {
      alert('Please select a topic first')
      return
    }

    const request = {
      action,
      topic: selectedTopic,
      difficulty,
      style: 'default',
      context: 'learning session'
    }

    generateContentMutation.mutate(request)
  }

  const actionTypes = [
    { 
      value: 'explain', 
      label: 'Deep Explanation', 
      icon: Lightbulb,
      description: 'Get comprehensive explanations with examples',
      gradient: 'from-blue-500 to-indigo-500'
    },
    { 
      value: 'quiz', 
      label: 'Interactive Quiz', 
      icon: HelpCircle,
      description: 'Test your knowledge with smart questions',
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      value: 'summary', 
      label: 'Smart Summary', 
      icon: BookOpen,
      description: 'Get key points and takeaways',
      gradient: 'from-purple-500 to-pink-500'
    },
  ]

  const popularTopics = [
    { name: 'Machine Learning Fundamentals', students: 1240, rating: 4.8 },
    { name: 'React & Frontend Development', students: 980, rating: 4.9 },
    { name: 'Python Programming', students: 1560, rating: 4.7 },
    { name: 'Data Structures & Algorithms', students: 2100, rating: 4.6 },
  ]

  return (
    <div className="min-h-screen px-6 py-8 sm:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-8 py-16 text-white mb-8">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
          </div>
          
          <div className="relative text-center">
            <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium mb-6">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Study Session
            </div>
            <h1 className="text-4xl font-bold sm:text-5xl mb-4">
              Personalized Learning Experience
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Our advanced AI agents create tailored content that adapts to your learning style and progress
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Control Panel */}
          <div className="xl:col-span-2 space-y-8">
            {/* Topic Selection */}
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-8">
              <div className="flex items-center mb-6">
                <div className="rounded-lg bg-indigo-100 p-2 mr-3">
                  <Brain className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Choose Your Topic</h2>
              </div>

              {topicsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="loading-spinner mr-3"></div>
                  <span className="text-gray-500">Loading topics...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topics.map((topic) => (
                    <button
                      key={topic.id}
                      className={`group relative p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedTopic === topic.name
                          ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedTopic(topic.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{topic.name}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" />
                            <span>Popular choice</span>
                          </div>
                        </div>
                        <ChevronRight className={`h-5 w-5 transition-transform ${
                          selectedTopic === topic.name ? 'rotate-90 text-indigo-600' : 'text-gray-400'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Type Selection */}
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-8">
              <div className="flex items-center mb-6">
                <div className="rounded-lg bg-purple-100 p-2 mr-3">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Content Type</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {actionTypes.map((actionType) => {
                  const Icon = actionType.icon
                  return (
                    <button
                      key={actionType.value}
                      className={`group relative overflow-hidden rounded-xl p-6 border-2 transition-all duration-300 ${
                        action === actionType.value
                          ? 'border-transparent shadow-xl scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                      }`}
                      onClick={() => setAction(actionType.value)}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${actionType.gradient} ${
                        action === actionType.value ? 'opacity-100' : 'opacity-0'
                      } transition-opacity duration-300`} />
                      
                      <div className="relative">
                        <div className={`inline-flex rounded-lg p-3 mb-4 ${
                          action === actionType.value 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className={`font-semibold mb-2 ${
                          action === actionType.value ? 'text-white' : 'text-gray-900'
                        }`}>
                          {actionType.label}
                        </h3>
                        <p className={`text-sm ${
                          action === actionType.value ? 'text-white/90' : 'text-gray-600'
                        }`}>
                          {actionType.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Difficulty & Generate */}
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Difficulty Level
                  </label>
                  <div className="flex space-x-3">
                    {['beginner', 'intermediate', 'advanced'].map((level) => (
                      <button
                        key={level}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          difficulty === level
                            ? 'bg-indigo-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setDifficulty(level)}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  onClick={handleGenerateContent}
                  disabled={generateContentMutation.isPending || !selectedTopic}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center justify-center">
                    {generateContentMutation.isPending ? (
                      <>
                        <div className="loading-spinner mr-3"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-3" />
                        Generate Content
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* Content Display */}
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Generated Content</h2>
              
              {generatedContent ? (
                <div className="prose max-w-none">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 whitespace-pre-wrap border border-gray-200">
                    {generatedContent}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Generate Content</h3>
                  <p className="text-gray-600">Select a topic and content type to get started with your personalized learning experience</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Session Stats */}
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Session Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Content Generated</span>
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Study Time</span>
                  <span className="text-2xl font-bold text-green-600">25m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="text-2xl font-bold text-purple-600">7d</span>
                </div>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {popularTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{topic.name}</div>
                      <div className="text-xs text-gray-500">{topic.students} students</div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{topic.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyPage