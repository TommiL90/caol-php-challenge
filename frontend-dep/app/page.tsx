import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FinancialProvider } from '@/contexts/financial-context'
import ConsultantsComponent from '@/components/consultants-component'
import { ClientsProvider } from '@/contexts/client-context'
import ClientsComponent from '@/components/clients-component'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Financeiro</h2>
          <a
            href="https://tomidev.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center text-3xl font-bold"
          >
            <Avatar className="mr-2 h-12 w-12">
              <AvatarImage
                src={`https://github.com/tommil90.png`}
                className="rounded-full"
              />
              <AvatarFallback>TB</AvatarFallback>
            </Avatar>
            <span>Tomi</span>
            <span className="text-primary">Dev</span>
          </a>
        </div>
        <Tabs defaultValue="consultants">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="consultants">Consultores</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
          </TabsList>
          <TabsContent value="consultants">
            <FinancialProvider>
              <ConsultantsComponent />
            </FinancialProvider>
          </TabsContent>
          <TabsContent value="clients">
            <ClientsProvider>
              <ClientsComponent />
            </ClientsProvider>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
