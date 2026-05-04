const registrationEmailTemplate = (name, role) => {
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const message =
    role === "student"
      ? "You can now browse available books and visit the library to borrow them. Contact an attendant to get started."
      : "You can now manage books, authors, and process borrow transactions from your dashboard.";

  return `<!DOCTYPE html>
  <html><head><meta charset="UTF-8"/></head>
  <body style="font-family:Arial;background:#f4f6f8;padding:20px;margin:0;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
      <table width="560" style="background:white;border-radius:8px;overflow:hidden;">

        <tr><td style="background:#1a1a2e;padding:32px;text-align:center;">
          <span style="color:white;font-size:18px;font-weight:500;">📚 LibraryMS</span>
        </td></tr>

        <tr><td style="padding:32px 32px 0;">
          <span style="background:#eef4ff;color:#2563eb;font-size:12px;font-weight:500;padding:4px 12px;border-radius:100px;">Account created</span>
          <h1 style="font-size:22px;font-weight:500;color:#111;margin:16px 0 12px;">Welcome, ${name} 👋</h1>
          <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 24px;">
            Your account has been successfully created on LibraryMS. You're registered as a 
            <strong>${role}</strong> and now have access to the library system.
          </p>
        </td></tr>

        <tr><td style="padding:0 32px 24px;">
          <table width="100%" style="background:#f9f9f9;border-radius:8px;padding:16px;" cellpadding="0" cellspacing="0">
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;">
              <span style="font-size:13px;color:#888;">Name</span>
              <span style="float:right;font-size:13px;font-weight:500;color:#111;">${name}</span>
            </td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;">
              <span style="font-size:13px;color:#888;">Role</span>
              <span style="float:right;font-size:13px;font-weight:500;color:#111;">${role}</span>
            </td></tr>
            <tr><td style="padding:8px 0;">
              <span style="font-size:13px;color:#888;">Date joined</span>
              <span style="float:right;font-size:13px;font-weight:500;color:#111;">${date}</span>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:0 32px 24px;">
          <div style="background:#f0f7ff;border-left:3px solid #4f8ef7;border-radius:0 8px 8px 0;padding:14px 16px;">
            <p style="font-size:13px;color:#1e40af;margin:0;line-height:1.6;">${message}</p>
          </div>
        </td></tr>

        <tr><td style="padding:0 32px 32px;">
          <a href="#" style="display:block;background:#1a1a2e;color:white;text-align:center;padding:13px;border-radius:8px;font-size:14px;font-weight:500;text-decoration:none;">
            Visit Library Portal
          </a>
        </td></tr>

        <tr><td style="border-top:1px solid #eee;padding:20px 32px;text-align:center;">
          <p style="font-size:12px;color:#aaa;margin:0 0 4px;">If you didn't create this account, contact the library immediately.</p>
          <p style="font-size:12px;color:#aaa;margin:0;">© ${new Date().getFullYear()} LibraryMS. All rights reserved.</p>
        </td></tr>

      </table>
    </td></tr></table>
  </body></html>`;
};

const borrowEmailTemplate = (studentName, bookTitle, borrowDate, dueDate) => {
  const formattedBorrowDate = new Date(borrowDate).toDateString();
  const formattedDueDate = new Date(dueDate).toDateString();

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
  </head>

  <body style="font-family: Arial; background:#f4f6f8; padding:20px; margin:0;">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">

          <table width="600" style="background:white; padding:40px; border-radius:8px; border-top: 4px solid #2980B9;">

            <tr>
              <td align="center">
                <h1 style="color:#2C3E50; margin-bottom:4px;">📚 LibraryMS</h1>
                <p style="color:#888; font-size:13px; margin-top:0;">Library Management System</p>
              </td>
            </tr>

            <tr>
              <td style="padding-top:20px;">
                <h2 style="color:#333;">Book Borrowed Successfully 📖</h2>
                <p style="color:#555; line-height:1.6;">
                  Hi <strong>${studentName}</strong>, you have successfully borrowed a book 
                  from the library. Please find your borrow details below.
                </p>

                <table width="100%" style="background:#f9f9f9; border-radius:6px; padding:20px; margin-top:16px;" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0; border-bottom:1px solid #eee;">
                      <span style="color:#888; font-size:13px;">Book Title</span><br/>
                      <strong style="color:#333;">${bookTitle}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; border-bottom:1px solid #eee;">
                      <span style="color:#888; font-size:13px;">Borrow Date</span><br/>
                      <strong style="color:#333;">${formattedBorrowDate}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;">
                      <span style="color:#888; font-size:13px;">Due Date</span><br/>
                      <strong style="color:#E74C3C;">${formattedDueDate}</strong>
                    </td>
                  </tr>
                </table>

                <p style="color:#555; line-height:1.6; margin-top:20px;">
                  Please ensure you return the book on or before the due date to 
                  avoid any penalties.
                </p>

              </td>
            </tr>

            <tr>
              <td style="padding-top:30px; border-top:1px solid #eee;">
                <p style="font-size:12px; color:#aaa; text-align:center;">
                  If you did not borrow this book, please contact the library immediately.
                </p>
                <p style="font-size:12px; color:#aaa; text-align:center;">
                  © ${new Date().getFullYear()} LibraryMS. All rights reserved.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

const returnEmailTemplate = (
  studentName,
  bookTitle,
  borrowDate,
  returnDate,
) => {
  const formattedBorrowDate = new Date(borrowDate).toDateString();
  const formattedReturnDate = new Date(returnDate).toDateString();

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
  </head>

  <body style="font-family: Arial; background:#f4f6f8; padding:20px; margin:0;">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">

          <table width="600" style="background:white; padding:40px; border-radius:8px; border-top: 4px solid #27AE60;">

            <tr>
              <td align="center">
                <h1 style="color:#2C3E50; margin-bottom:4px;">📚 LibraryMS</h1>
                <p style="color:#888; font-size:13px; margin-top:0;">Library Management System</p>
              </td>
            </tr>

            <tr>
              <td style="padding-top:20px;">
                <h2 style="color:#333;">Book Returned Successfully ✅</h2>
                <p style="color:#555; line-height:1.6;">
                  Hi <strong>${studentName}</strong>, we have successfully received your 
                  book return. Thank you for returning it on time.
                </p>

                <table width="100%" style="background:#f9f9f9; border-radius:6px; padding:20px; margin-top:16px;" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0; border-bottom:1px solid #eee;">
                      <span style="color:#888; font-size:13px;">Book Title</span><br/>
                      <strong style="color:#333;">${bookTitle}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; border-bottom:1px solid #eee;">
                      <span style="color:#888; font-size:13px;">Borrow Date</span><br/>
                      <strong style="color:#333;">${formattedBorrowDate}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;">
                      <span style="color:#888; font-size:13px;">Return Date</span><br/>
                      <strong style="color:#27AE60;">${formattedReturnDate}</strong>
                    </td>
                  </tr>
                </table>

                <p style="color:#555; line-height:1.6; margin-top:20px;">
                  The book is now back in the library's inventory. 
                  Feel free to borrow another book anytime.
                </p>

              </td>
            </tr>

            <tr>
              <td style="padding-top:30px; border-top:1px solid #eee;">
                <p style="font-size:12px; color:#aaa; text-align:center;">
                  If you did not return this book or have any concerns, 
                  please contact the library immediately.
                </p>
                <p style="font-size:12px; color:#aaa; text-align:center;">
                  © ${new Date().getFullYear()} LibraryMS. All rights reserved.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

module.exports = {
  borrowEmailTemplate,
  registrationEmailTemplate,
  returnEmailTemplate,
};
