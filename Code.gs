function doPost(e) {
      var lock = LockService.getScriptLock();
        lock.tryLock(10000);
          try {
                var doc = SpreadsheetApp.getActiveSpreadsheet();
                    var sheet = doc.getSheetByName("Users") || doc.insertSheet("Users");

                        if (sheet.getLastRow() === 0) {
                                  sheet.appendRow(["Email", "PasswordHash", "Salt", "CreatedAt"]);
                        }

                            var data = JSON.parse(e.postData.contents);
                                var action = data.action;
                                    var email = data.email.toLowerCase().trim();
                                        var rows = sheet.getDataRange().getValues();

                                            if (action === "signup") {
                                                      for (var i = 1; i < rows.length; i++) {
                                                                if (rows[i][0] === email) {
                                                                              return ContentService.createTextOutput(JSON.stringify({success: false, message: "Email already registered."}))
                                                                                          .setMimeType(ContentService.MimeType.JSON);
                                                                }
                                                      }
                                                            sheet.appendRow([email, data.passwordHash, data.salt, new Date().toISOString()]);
                                                                  return ContentService.createTextOutput(JSON.stringify({success: true}))
                                                                          .setMimeType(ContentService.MimeType.JSON);

                                            } else if (action === "login") {
                                                      for (var i = 1; i < rows.length; i++) {
                                                                if (rows[i][0] === email) {
                                                                              return ContentService.createTextOutput(JSON.stringify({
                                                                                            success: true,
                                                                                                        passwordHash: rows[i][1],
                                                                                                                    salt: rows[i][2]
                                                                              })).setMimeType(ContentService.MimeType.JSON);
                                                                }
                                                      }
                                                            return ContentService.createTextOutput(JSON.stringify({success: false, message: "User not found."}))
                                                                    .setMimeType(ContentService.MimeType.JSON);
                                            }
          } catch (err) {
                return ContentService.createTextOutput(JSON.stringify({success: false, message: err.toString()}))
                      .setMimeType(ContentService.MimeType.JSON);
          } finally {
                lock.releaseLock();
          }
}
                                                                              }))
                                                                }
                                                      }
                        }
          }
}