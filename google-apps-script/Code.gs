function doPost(e) {
  try {
    // Handle form-encoded data (from HTML form)
    var params = e.parameter;
    
    var saleAmount = params.sale_amount || '';
    var expenseName = params.expense_name || '';
    var expenseAmount = params.expense_amount || '';
    var timestamp = new Date();
    
    // Get or create spreadsheet
    var spreadsheet = getOrCreateSpreadsheet('Grocery Tracker');
    var sheet = spreadsheet.getActiveSheet();
    
    // Append row
    sheet.appendRow([timestamp, saleAmount, expenseName, expenseAmount]);
    
    // Return HTML response for form submission
    return HtmlService.createHtmlOutput('<!DOCTYPE html><html><head><script>window.location.href = "https://SivaAshokKumar.github.io/grocery-tracker/?success=true";</script></head><body>Saving...</body></html>');
    
  } catch (error) {
    return HtmlService.createHtmlOutput('<!DOCTYPE html><html><head><script>window.location.href = "https://SivaAshokKumar.github.io/grocery-tracker/?error=' + encodeURIComponent(error.toString()) + '";</script></head><body>Error...</body></html>');
  }
}

function doGet(e) {
  var output = ContentService.createTextOutput(JSON.stringify({
    status: 'healthy',
    message: 'Grocery Tracker API is running'
  })).setMimeType(ContentService.MimeType.JSON);
  
  return output;
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
