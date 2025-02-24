import { google, sheets_v4 } from 'googleapis';
import { json } from '@sveltejs/kit';

import { GOOGLE_API_CREDENTIALS, SHEETS_USECASES_ID } from '$env/static/private';
import type { RequestEvent } from './$types';

let googleSheets: sheets_v4.Sheets | null = null;

async function getGoogleSheets(): Promise<sheets_v4.Sheets>
{
    if(googleSheets){
        return googleSheets;
    }

    const auth = await google.auth.getClient({ 
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        keyFilename: GOOGLE_API_CREDENTIALS
    });

    googleSheets = google.sheets({ version: 'v4', auth });

    let sheetMetaData = await getReqManSheetMetaData();
    let rowCount;
    if(sheetMetaData.sheets)
        rowCount = sheetMetaData.sheets[0].properties?.gridProperties;

    console.log(rowCount);

    return googleSheets;
}

async function getReqManSheetMetaData()
{
    const spreadsheetId = SHEETS_USECASES_ID;
    if (!spreadsheetId) {
        throw new Error("Missing Spreadsheet ID environment variable");
    }

    const sheets = await getGoogleSheets();
    const response = await sheets.spreadsheets.get({
        spreadsheetId: spreadsheetId
    });
    
    return response.data;
}

export async function GET()
{
    try {
        console.log("API /api/usecases called"); // Debug log
        
        const sheets = await getGoogleSheets();

        const spreadsheetId = SHEETS_USECASES_ID;
        if (!spreadsheetId) {
            throw new Error("Missing Spreadsheet ID environment variable");
        }

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: 'usecases'
        });

        response.data.values?.shift(); //TODO: Code this better ;)
        
        return json(response.data.values);
    } catch (error) {
        console.error("API Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

export async function POST({request}: RequestEvent)
{
    console.log("API /api/usecases called"); // Debug log
        
    const sheets = await getGoogleSheets();

    const spreadsheetId = SHEETS_USECASES_ID;
    await sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: "usecases",
        valueInputOption:"RAW",
        requestBody: {
            values: [
                [1, "Hallo from post", "This is the text inserted by post via the googleapi"]
            ]
        }
    });

    //Have the Usecase object transformed back into a js object
    let reqBody = await request.text();

    return json({body: "Hi back!"});
}