import csvtojsonv2 from "csvtojson/v2";
import fs from "fs/promises"
import { Constituent } from "~/types";

/**
 * @description Reads our file and returns all data in a readable array.
 * 
 * @returns {Promise<Constituent[]>}
 */
export async function getConstituents (): Promise <Constituent[]> {
  const fileContent = await fs.readFile ('database.csv', {encoding: "utf-8"})
  const jsonData: Constituent[] = await csvtojsonv2().fromString(fileContent)
  return jsonData
}

/**
 * @description upserts our CSV via using a JS Map. to overwrite/merge duplicate data. Then writes our file!
 * 
 * @param {string} csvString CSV String we are writing to
 * 
 * @returns {Promise<void>}
 */
export async function upsertConstituents(csvString: string): Promise<void> {

  // Make a quick map from our arr. (email will be our key since it's our unique id)
  const constituentMap = new Map<string, Constituent>();
  const constituentData = await getConstituents();
  const payloadData: Constituent[] = await csvtojsonv2().fromString(csvString);

  // Merge these two datasets together. this way any new data can also update existing data!
  constituentData.forEach(constituent => constituentMap.set(constituent.email, constituent));
  payloadData.forEach( constituent => constituentMap.set(constituent.email, constituent));

  const newCsvContent = constructNewCSVContent(constituentMap, Object.keys(payloadData[0]));
  await fs.writeFile('database.csv', newCsvContent)
  return;
}

/**
 * helper function that will take our merge'd data and create a new CSV String
 *
 * @param constituentMap {Map<string, Constituent>}
 * @returns {string} that can be used as the net new content of our CSV file
 * 
 * @remarks A library like json2csv could have done this! But I did want to showcase my usage of some fun ES6 methods.
 */
function constructNewCSVContent(constituentMap: Map<string, Constituent>, headerValues: string[]): string {

  // smaller util function to parse down to a row level.
  const jsonToCSVRow = (keys: string[], obj: Constituent) => {
    return keys.reduce((acc, key, currentIndex) => {
      const isLastElement = currentIndex === keys.length - 1;
      return `${acc}${obj[key as keyof Constituent]}${isLastElement ? "" : ","}`
    }, '')
  }

  // Iterate through each row, then call util func, and create final CSV string.
  let csvString = ''
  for(const [_, value] of constituentMap) {
    csvString = `${csvString}${jsonToCSVRow(headerValues,value)} \n`
  }

  return headerValues.join(",") + "\n" + csvString;
  }
