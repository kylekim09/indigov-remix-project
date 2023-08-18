import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, useRouteError, isRouteErrorResponse, Link} from "@remix-run/react";
import { getConstituents } from "~/database/db";
import DataCards from "~/components/DataCards";
import { Constituent } from "~/types"

import { V2_ErrorBoundaryComponent } from "@remix-run/react/dist/routeModules";


export default function ConstituentsView () {
  const constituentData = useLoaderData()
  return (
    <>
      <h1>Constituents View</h1>
      <h3>You have {constituentData.length} constituents in our records!</h3>
      <DataCards
      dataList={constituentData as Constituent[]}
      />
    </>
  )
}

export const loader: LoaderFunction = async () => {
  try {
    const data = await getConstituents()
    return data;
  } catch(e) {
    throw json({message: "There was an error retrieving your records"},
    {status: 500, statusText: "There was an internal server error"})
  }

}

export const ErrorBoundary: V2_ErrorBoundaryComponent = () => {
  const error = useRouteError();
  if(isRouteErrorResponse(error)){
    return (
      <main>
        <h1>{error.data.message}</h1>
        <p>Back to <Link to="/"> Home </Link></p>
      </main>
    )
  } else {
    return (
    <main>
      <h1>Unknown Error Occured</h1>
      <p>Back to <Link to="/"> Home </Link></p>
    </main>
    )}
}