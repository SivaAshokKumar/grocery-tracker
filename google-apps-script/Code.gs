function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    var saleAmount = data.sale_amount || '';
    var expenseName = data.expense_name || '';
    var expenseAmount = data.expense_amount || '';
    var timestamp = new Date();
    
    // Get or create spreadsheet
    var spreadsheet = getOrCreateSpreadsheet('Grocery Tracker');
    var sheet = spreadsheet.getActiveSheet();
    
    // Append row
    sheet.appendRow([timestamp, saleAmount, expenseName, expenseAmount]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully!'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'healthy',
    message: 'Grocery Tracker API is running'
  })).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSpreadsheet(name) {
  try {
    // Try to open existing
    var files = DriveApp.getFilesByName(name);
    if (files.hasNext()) {
      var file = files.next();
      return SpreadsheetApp.openById(file.getId());
    }
  } catch (e) {
    // Create new if not found
  }
  
  // Create new spreadsheet
  var spreadsheet = SpreadsheetApp.create(name);
  var sheet = spreadsheet.getActiveSheet();
  
  // Add headers
  sheet.appendRow(['Date/Time', 'Sale Amount', 'Expense Name', 'Expense Amount']);
  
  return spreadsheet;
}

// For testing in Apps Script editor
function testPost() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        sale_amount: '100',
        expense_name: 'Test',
        expense_amount: '50'
      })
    }
  };
  Logger.log(doPost(mockEvent).getContent());
}
