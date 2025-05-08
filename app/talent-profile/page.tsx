import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Briefcase, Award, BookOpen, MapPin, Mail, Phone, Calendar } from 'lucide-react'

export default function TalentProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="h-32 w-32 rounded-full bg-slate-200 dark:bg-slate-700 mb-4 flex items-center justify-center">
                  <User className="h-16 w-16 text-slate-400" />
                </div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-muted-foreground mb-2">Senior Developer</p>
                <div className="flex gap-2 mb-4">
                  <Badge>React</Badge>
                  <Badge>Next.js</Badge>
                  <Badge>TypeScript</Badge>
                </div>
                <Button className="w-full">Edit Profile</Button>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Member since Jan 2023</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="experience">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            
            <TabsContent value="experience" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Work Experience</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-medium">Senior Developer</h3>
                        <span className="text-sm text-muted-foreground">2020 - Present</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Tech Solutions Inc.</p>
                      <p className="text-sm mt-2">Led development of multiple web applications using React and Next.js.</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-medium">Frontend Developer</h3>
                        <span className="text-sm text-muted-foreground">2018 - 2020</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Web Innovators LLC</p>
                      <p className="text-sm mt-2">Developed responsive web interfaces and implemented UI components.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="education" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Education</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-medium">Master of Computer Science</h3>
                        <span className="text-sm text-muted-foreground">2016 - 2018</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Stanford University</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-medium">Bachelor of Science in Computer Engineering</h3>
                        <span className="text-sm text-muted-foreground">2012 - 2016</span>
                      </div>
                      <p className="text-sm text-muted-foreground">MIT</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Skills & Certifications</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>JavaScript</Badge>
                      <Badge>TypeScript</Badge>
                      <Badge>React</Badge>
                      <Badge>Next.js</Badge>
                      <Badge>Node.js</Badge>
                      <Badge>GraphQL</Badge>
                      <Badge>REST API</Badge>
                      <Badge>CSS/SCSS</Badge>
                      <Badge>Tailwind CSS</Badge>
                      <Badge>Git</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Certifications</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">AWS Certified Developer</span>
                        <span className="text-sm text-muted-foreground">2022</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Google Cloud Professional Developer</span>
                        <span className="text-sm text-muted-foreground">2021</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}