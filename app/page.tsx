"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Users,
  BookOpen,
  Calendar,
  Star,
  Play,
  CheckCircle,
  MessageCircle,
  Award,
  TrendingUp,
  Globe,
  Zap,
  Heart,
  Code,
  Palette,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Connect & Learn",
      description: "Find people with complementary skills and learn from each other",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Schedule Sessions",
      description: "Book learning sessions that fit your schedule",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Earn Rewards",
      description: "Get recognized for teaching and learning achievements",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Join Communities",
      description: "Connect with like-minded learners in specialized groups",
      color: "from-orange-500 to-red-500",
    },
  ]

  const stats = [
    { number: "10K+", label: "Active Learners" },
    { number: "500+", label: "Skills Available" },
    { number: "50K+", label: "Sessions Completed" },
    { number: "95%", label: "Success Rate" },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "UX Designer",
      content: "I learned Python from a data scientist and taught design thinking in return. Amazing experience!",
      avatar: "/professional-headshot.png",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Marketing Manager",
      content: "The community here is incredible. I've improved my coding skills while sharing my marketing expertise.",
      avatar: "/placeholder-40x40.png",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Software Engineer",
      content: "Perfect platform for skill exchange. I've made great connections and learned so much!",
      avatar: "/placeholder-40x40.png",
      rating: 5,
    },
  ]

  const skillCategories = [
    { name: "Programming", icon: <Code className="h-6 w-6" />, count: "120+ skills" },
    { name: "Design", icon: <Palette className="h-6 w-6" />, count: "80+ skills" },
    { name: "Business", icon: <TrendingUp className="h-6 w-6" />, count: "95+ skills" },
    { name: "Languages", icon: <Globe className="h-6 w-6" />, count: "40+ languages" },
    { name: "Music", icon: <Heart className="h-6 w-6" />, count: "60+ skills" },
    { name: "Fitness", icon: <Zap className="h-6 w-6" />, count: "45+ skills" },
  ]

  return (
    <>
      <style jsx global>{`
        .main-header { display: none !important; }
      `}</style>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        {/* Header */}

        {/* Hero Section */}
        <section className="pt-8 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Join 10,000+ skill exchangers
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Learn Together,
              <br />
              Grow Together
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with people who have the skills you want to learn, and share your expertise in return. The future
              of learning is collaborative.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start Learning Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/communities">
                <Button variant="outline" size="lg">
                  <Play className="mr-2 h-5 w-5" />
                  Explore Communities
                </Button>
              </Link>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-2xl p-8 shadow-2xl">
                <Image
                  src="/diverse-group.png"
                  alt="People learning together"
                  width={800}
                  height={400}
                  className="rounded-xl mx-auto"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How E.R.U.D.I.T.E. Works</h2>
              <p className="text-xl text-muted-foreground">Simple steps to start your learning journey</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-300 ${
                      activeFeature === index ? "ring-2 ring-blue-500 shadow-lg" : ""
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white`}>
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-xl">
                  <Image
                    src="/abstract-geometric-flow.png"
                    alt="Learning process visualization"
                    width={400}
                    height={300}
                    className="rounded-xl mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Categories */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Skills</h2>
              <p className="text-xl text-muted-foreground">Discover what you can learn and teach</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {skillCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">{category.count}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
              <p className="text-xl text-muted-foreground">Real stories from real learners</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of learners who are already growing their skills through collaboration
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/communities">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Browse Communities
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-lg text-blue-600">E.R.U.D.I.T.E.</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Connecting learners worldwide through skill exchange and collaborative growth.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <Link href="/communities" className="hover:text-foreground">
                      Communities
                    </Link>
                  </div>
                  <div>
                    <Link href="/skills" className="hover:text-foreground">
                      Skills
                    </Link>
                  </div>
                  <div>
                    <Link href="/challenges" className="hover:text-foreground">
                      Challenges
                    </Link>
                  </div>
                  <div>
                    <Link href="/people" className="hover:text-foreground">
                      People
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <a href="#" className="hover:text-foreground">
                      Help Center
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-foreground">
                      Safety
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-foreground">
                      Guidelines
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-foreground">
                      Contact
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <a href="#" className="hover:text-foreground">
                      About
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-foreground">
                      Privacy
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-foreground">
                      Terms
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-foreground">
                      Careers
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 E.R.U.D.I.T.E. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
