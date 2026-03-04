# Everlulo

Everlulo helps you track your workouts to maximize your time.

## Dependencies

- `react-router` — handles client-side routing
- `styled-components` — used for component-level styling

## Installation Instructions

Download the application from this GitHub repo and use Vite to open a local instance.

Install with command: `npm install`
Install Dependcies: `npm install styled-components` and `npm install react-router-dom`

## Run the Development Server

Start the development server with the command: `npm run dev`

## API Connection

This app uses Airtable (https://airtable.com) as its backend. You will need a free Airtable account to run this app.

### Setup Steps
1. Create a new Airtable base
2. Create a table with the following fields:
   - `Exercise` — Single line text
   - `Sets` — Number
   - `Reps` — Number
   - `Weight` — Number
   - `Date` — Date
3. In your .env.local file fill in the following with your values:
    - `VITE_BASE_ID` — The Airtable API URL
   - `VITE_TABLE_NAME` — the name of your table ("Workouts")
   - `VITE_PAT` — Personal Access Token from Airtable