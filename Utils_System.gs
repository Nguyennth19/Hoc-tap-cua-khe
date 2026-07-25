/**
 * Utils_System.gs
 * THƯ VIỆN HÀM TIỆN ÍCH DÙNG CHUNG (SYSTEM UTILITIES)
 * Tuân thủ Master GAS OS V8.1 Playbooks [FILE 1 - Mục 10.1 & FILE 4]
 */

var Utils_System = {
  /**
   * Định dạng Thời gian theo múi giờ Script
   * @param {Date|string} date 
   * @param {string} formatPattern - Mặc định: 'yyyy-MM-dd HH:mm:ss'
   * @return {string}
   */
  formatDate: function(date, formatPattern) {
    if (!date) return '';
    var pattern = formatPattern || 'yyyy-MM-dd HH:mm:ss';
    var timeZone = Session.getScriptTimeZone();
    return Utilities.formatDate(new Date(date), timeZone, pattern);
  },

  /**
   * Chuyển đổi mảng 2D từ Google Sheets (Header ở Dòng 2) thành Mảng JSON Object
   * Đọc dữ liệu từ Dòng 3 trở đi (index 2 trong mảng 0-indexed).
   * Tuân thủ [FILE 1 - Mục 1.3]
   * @param {Array<Array>} rawValues - Mảng 2D đọc từ sheet.getValues()
   * @return {Array<Object>}
   */
  sheetValuesToObjects: function(rawValues) {
    if (!rawValues || rawValues.length < 2) return [];
    
    var headerKeys = rawValues[1]; // Dòng 2 chứa Header Keys (camelCase)
    var result = [];

    for (var i = 2; i < rawValues.length; i++) {
      var row = rawValues[i];
      var obj = {};
      var isEmptyRow = true;

      for (var j = 0; j < headerKeys.length; j++) {
        var key = headerKeys[j];
        if (key) {
          var val = row[j];
          obj[key] = val;
          if (val !== "" && val !== null && val !== undefined) {
            isEmptyRow = false;
          }
        }
      }

      if (!isEmptyRow) {
        result.push(obj);
      }
    }

    return result;
  },

  /**
   * Chuyển đổi Mảng JSON Object thành mảng 2D để ghi Batch xuống Sheet (từ Dòng 3)
   * Tuân thủ [FILE 1 - Mục 2.2 - Cấm vòng lặp I/O]
   * @param {Array<Object>} objects 
   * @param {Array<string>} headerKeys - Danh sách key khớp Dòng 2
   * @return {Array<Array>}
   */
  objectsToSheetValues: function(objects, headerKeys) {
    if (!objects || !headerKeys) return [];
    
    var rows = [];
    for (var i = 0; i < objects.length; i++) {
      var item = objects[i];
      var row = [];
      for (var j = 0; j < headerKeys.length; j++) {
        var key = headerKeys[j];
        var val = item[key];
        row.push(val !== undefined ? val : '');
      }
      rows.push(row);
    }
    return rows;
  },

  /**
   * Làm sạch Input tiền tệ/chuỗi số từ Frontend gửi lên
   * Tuân thủ [FILE 1 - Mục 3.4 & FILE 5 - Failure 02]
   * @param {string|number} input 
   * @return {number}
   */
  cleanNumberInput: function(input) {
    if (typeof input === 'number') return input;
    if (!input) return 0;
    var cleaned = String(input).replace(/\./g, '').replace(/,/g, '');
    var parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  },

  /**
   * Mã hóa chuỗi chống tấn công XSS
   * Tuân thủ [FILE 1 - Mục 4.2]
   * @param {string} str 
   * @return {string}
   */
  sanitizeHtml: function(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
};