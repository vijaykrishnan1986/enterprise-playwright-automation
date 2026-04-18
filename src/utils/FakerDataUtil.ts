import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the type for the user data
interface UserData {
  name: string;
  email: string;
  username: string;
  phone: string;
  age: number;
  address: string;
}

// Function to generate fake user data
const generateUserData = (): UserData => {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    username: faker.internet.username(),
    phone: faker.phone.number(),
    age: faker.number.int({ min: 18, max: 99 }),
    address: faker.location.streetAddress(), // ✅ more realistic
  };
};

// Function to generate an array of fake user data
export const generateTestData = (numRecords: number): UserData[] => {
  return faker.helpers.multiple(generateUserData, { count: numRecords });
};

const srcDir = path.resolve(__dirname, "..");
const testdataDir = path.resolve(srcDir, "testdata");

// Function to export data to JSON file
export const exportToJson = (data: UserData[], fileName: string) => {
  const filePath = path.join(testdataDir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Data exported to JSON file: ${filePath}`);
};

// Function to export data to CSV file
export const exportToCsv = (data: UserData[], fileName: string) => {
  const csvWriter = createObjectCsvWriter({
    path: path.join(testdataDir, fileName),
    header: [
      { id: 'name', title: 'Name' },
      { id: 'email', title: 'Email' },
      { id: 'username', title: 'Username' },
      { id: 'phone', title: 'Phone' },
      { id: 'age', title: 'Age' },
      { id: 'address', title: 'Address' },
    ],
  });

  csvWriter
    .writeRecords(data)
    .then(() => console.log(`Data exported to CSV file: ${path.join(testdataDir, fileName)}`))
    .catch((error) => console.error(`Error writing CSV file:`, error.message));
};