import { ActionArgs, ActionFunction, LinksFunction, json, redirect, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, useRouteError, Link, isRouteErrorResponse, useActionData } from "@remix-run/react";
import { useState } from "react";
import Papa from "papaparse";
import { Constituent } from "~/types";
import DataCards from "~/components/DataCards";
import {upsertConstituents} from "~/database/db"
import { V2_ErrorBoundaryComponent } from "@remix-run/react/dist/routeModules";

export default function Upload () {
  const [previewData, setPreviewData] = useState<Constituent[]>([]) 

  /**
   * @description Set the state and handle the preview of CSV content
   * 
   * @param event Change event 
   * @returns void
   * 
   * Remarks: using papaparse to be able to easily format our CSV to a readable form.
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!event?.target.files) return;
    Papa.parse(event?.target.files[0], {
      header:true,
      skipEmptyLines: true,
      complete: function (results) {
        setPreviewData(results.data as Constituent[])
      }
    })
  }

  return (
    <>
      <h1>Upload your CSV here</h1>
      <Form method="post" encType="multipart/form-data">
        <input
          onChange={handleFileUpload}
          type="file"
          name="csvData"
          accept=".csv"
        >
        </input>
        <button type="submit">Upload!</button>
      </Form>
      {/* Render This section only if there is actual content */}
      {
      previewData.length !== 0 && 
        <div>
            <h3>Preview of your Data</h3>
            <h3>You want to upload/update {previewData.length} constituents</h3>
            <DataCards
            dataList={previewData}
          />
        </div>
      }
    </>
    )
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
    

    
/**
 * 
 * @remarks digging through docs, and it seems as if functions for file updates are still in progress:
 * 
 * With limited time I decided to use this as an example instead of builing a custom uploadHandler
 * https://remix.run/docs/en/main/utils/unstable-create-memory-upload-handler
 *
 */
export const action: ActionFunction = async ({request}: ActionArgs) => {
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 500_000,
  })

  try {
    const formData = await unstable_parseMultipartFormData(request, uploadHandler);
    const csvFile = formData.get('csvData') as File;
    const csv: string = await csvFile.text();
    await upsertConstituents(csv);
    return redirect("/constituents/view");
  } catch (e) {
    console.log(e)
    throw json({message: "There was an error Uploading your file"},
    {status: 500, statusText: "There was an internal server error"});
  }
}
