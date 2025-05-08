import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, FileText, Image, FileArchive } from 'lucide-react'

export default function VaultPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Secure Vault</h1>
        <Button>
          <Lock className="mr-2 h-4 w-4" />
          Add Document
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Personal Documents
            </CardTitle>
            <CardDescription>Secure storage for your important documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
                <span className="text-sm">Passport.pdf</span>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
                <span className="text-sm">ID_Card.pdf</span>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
                <span className="text-sm">Insurance.pdf</span>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Image className="mr-2 h-5 w-5 text-primary" />
              Media Files
            </CardTitle>
            <CardDescription>Your secure media storage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={item} 
                  className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-md flex items-center justify-center"
                >
                  <span className="text-xs text-muted-foreground">IMG</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <FileArchive className="mr-2 h-5 w-5 text-primary" />
              Archived Files
            </CardTitle>
            <CardDescription>Previously stored documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
                <span className="text-sm">Archive_2023.zip</span>
                <Button variant="ghost" size="sm">Extract</Button>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
                <span className="text-sm">Old_Documents.zip</span>
                <Button variant="ghost" size="sm">Extract</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}