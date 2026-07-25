/**
 * Code.gs
 * ĐIỂM VÀO CHÍNH CỦA WEB APP (WEB APP ENTRY POINT)
 * Tuân thủ Master GAS OS V8.1 Playbooks [FILE 1 - Mục 3.1 & FILE 3 - Pattern 07]
 */

/**
 * Lắng nghe request HTTP GET khởi tạo ứng dụng Web App
 * @param {Object} e - Event parameter từ Google Apps Script
 * @return {HtmlOutput}
 */
function doGet(e) {
  try {
    var template = HtmlService.createTemplateFromFile('Index');
    
    // Đền bù các biến khởi tạo ban đầu nếu cần
    template.appVersion = "2.0.0";
    template.serverTime = Utils_System.formatDate(new Date());

    return template.evaluate()
      .setTitle('UniLMS - Student Portal')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    Logger.log('[doGet Critical Error] ' + err.toString());
    return HtmlService.createHtmlOutput(
      '<div style="font-family: sans-serif; padding: 20px; text-align: center;">' +
      '<h2>Hệ thống UniLMS đang bảo trì</h2>' +
      '<p>Vui lòng thử lại sau hoặc liên hệ Quản trị viên.</p>' +
      '<small style="color: #666;">Chi tiết: ' + Utils_System.sanitizeHtml(err.toString()) + '</small>' +
      '</div>'
    );
  }
}

/**
 * Hàm bao bọc (Include Helper) cho phép ghép nối các file HTML/CSS/JS linh hoạt
 * Tuân thủ [FILE 1 - Mục 10.2 & Enterprise Playbook]
 * @param {string} filename - Tên file HTML cần nhúng (không cần đuôi .html)
 * @return {string} Nội dung HTML thuần
 */
function include(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (e) {
    Logger.log('[Include Error] Không thể tải file: ' + filename + ' | ' + e.toString());
    return '';
  }
}