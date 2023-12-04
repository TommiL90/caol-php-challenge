import React, { Fragment } from 'react'
import { SelectUser } from './select-users'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import TabletClients from './clients-table'
import { LineOverview } from './graphics/line-overview'
import PieOverviewClients from './pie-overview-clients'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const ClientsComponent = () => {
  return (
    <Fragment>
      <SelectUser.Root>
        <SelectUser.BodyClients />
        <SelectUser.FooterClients />
      </SelectUser.Root>
      <Tabs defaultValue="report" className="space-y-4">
        <TabsList>
          <TabsTrigger value="report">Relatório</TabsTrigger>
          <TabsTrigger value="graphics">Gráficos</TabsTrigger>
        </TabsList>
        <TabsContent value="report" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Reporte Tabela</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <TabletClients />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="graphics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Reporte de Gráfico</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <LineOverview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Reporte Pizza</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <PieOverviewClients />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Fragment>
  )
}

export default ClientsComponent
