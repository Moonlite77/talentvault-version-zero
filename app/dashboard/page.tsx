import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Your performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-md">
              <p className="text-muted-foreground">Analytics data will appear here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Document Updated</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Profile Viewed</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Your upcoming tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="task1" className="h-4 w-4" />
                <label htmlFor="task1" className="text-sm">Complete profile information</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="task2" className="h-4 w-4" />
                <label htmlFor="task2" className="text-sm">Update portfolio</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="task3" className="h-4 w-4" />
                <label htmlFor="task3" className="text-sm">Review new opportunities</label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}