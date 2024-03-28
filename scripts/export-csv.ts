import { write } from "fast-csv";
import * as fs from "fs";
import * as path from "path";
import { getAllDocuments } from "./firebase";

const exportCollectionToCSV = async (collectionName: string) => {
  const { result, error } = await getAllDocuments(collectionName);
  const timestamp = Date.now();
  const csvFilePath = path.join(
    "export",
    collectionName,
    `${collectionName}_${timestamp}.csv`,
  );

  if (error || !result) {
    console.error(
      "Collection name is not valid. Please provide a valid collection name.",
    );
    process.exit(1);
  }

  if (result.docs.length === 0) {
    console.log(`Collection ${collectionName} is empty.`);
    process.exit(0);
  }

  try {
    await fs.promises.mkdir(path.dirname(csvFilePath), { recursive: true });
    const csvStream = write([], { headers: true });
    const writableStream = fs.createWriteStream(csvFilePath);

    csvStream.pipe(writableStream);

    const headers = Object.keys(result.docs[0].data());
    csvStream.write(headers);

    result.docs.forEach((doc) => {
      const rowData = headers.map((header) => doc.data()[header]);
      csvStream.write(rowData);
    });

    csvStream.end();

    console.log(`Collection ${collectionName} exported to CSV: ${csvFilePath}`);
  } catch (error) {
    console.error("Error exporting collection to CSV:", error);
  }

  process.exit(0);
};

const collectionName = process.argv[2];

if (!collectionName) {
  console.error(
    "Collection name not provided. Please provide the collection name as an argument.",
  );
  process.exit(1);
}

exportCollectionToCSV(collectionName);
