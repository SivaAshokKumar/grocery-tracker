from flask import Flask, render_template, request, jsonify
import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime
import os

app = Flask(__name__)

# Google Sheets Setup
SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]

def get_google_sheets_client():
    """Initialize Google Sheets client using service account."""
    creds = Credentials.from_service_account_file(
        'credentials.json', scopes=SCOPES
    )
    client = gspread.authorize(creds)
    return client

def get_or_create_sheet(client, sheet_name="Grocery Tracker"):
    """Get existing sheet or create new one."""
    try:
        # Try to open existing spreadsheet
        spreadsheet = client.open(sheet_name)
    except gspread.SpreadsheetNotFound:
        # Create new spreadsheet if not found
        spreadsheet = client.create(sheet_name)
        # Create worksheet with headers
        worksheet = spreadsheet.sheet1
        worksheet.append_row(['Date/Time', 'Sale Amount', 'Expense Name', 'Expense Amount'])
    return spreadsheet.sheet1

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save', methods=['POST'])
def save_data():
    try:
        data = request.get_json()
        
        sale_amount = data.get('sale_amount', '').strip()
        expense_name = data.get('expense_name', '').strip()
        expense_amount = data.get('expense_amount', '').strip()
        
        # Get current timestamp
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # Initialize Google Sheets
        client = get_google_sheets_client()
        worksheet = get_or_create_sheet(client)
        
        # Append data to sheet
        worksheet.append_row([
            timestamp,
            sale_amount if sale_amount else '',
            expense_name if expense_name else '',
            expense_amount if expense_amount else ''
        ])
        
        return jsonify({
            'success': True,
            'message': 'Data saved successfully to Google Sheets!'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error saving data: {str(e)}'
        }), 500

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
