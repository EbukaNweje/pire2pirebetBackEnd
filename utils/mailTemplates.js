function forgotMailTemplate(link, firstname) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      background: linear-gradient(90deg, #0d99ffff, white);
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    .container {
      max-width: 400px;
      padding: 40px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .header h1 {
      font-size: 36px;
      color: #0d99ffff;
      margin: 0;
    }

    .reset-button {
      display: block;
      width: 100%;
      max-width: 200px; 
      background-color: #0d99ffff;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px; 
      font-size: 16px;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin: 0 auto; 
    }

    .reset-button:hover {
      background-color: #444;
    }

    .key-symbol {
      display: block;
      text-align: center;
      font-size: 48px;
      margin-bottom: 20px;
      color: #007bff;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="key-symbol">
      &#128272; <!-- Unicode for the key symbol -->
    </div>
    <div class="header">
      <h1>Password Reset</h1>
    </div>
    <p>Hello ${firstname},</p>
    <p>It seems you have requested to reset your password. Click the button below to proceed:</p>
    <a class="reset-button" href=${link}>Reset Password</a>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Best regards,</p>
  </div>
</body>
</html>
  `;
}




function mailTemplate(otp, firstname) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
          }
          .content {
              padding: 20px;
          }
          .otp {
              font-size: 24px;
              text-align: center;
              color: #007bff;
              margin-top: 10px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h2>OTP Verification</h2>
          </div>
          <div class="content">
              <p>Hello ${firstname},</p>
              <p>Thank you for signing up with our service. To complete your registration, please enter the following OTP code:</p>
              <p class="otp"><strong>${otp}</strong></p>
              <p>This OTP code is valid for 10 minutes. Please do not share it with anyone.</p>
              <p>If you did not sign up for our service, please ignore this email.</p>
              <p>Best regards,</p>
              <p>PIER2PIER BET TEAM</p>
          </div>
      </div>
  </body>
  </html>  



`;
}

function paymentNotificationTemplate(deposit, email, cancel, confirm) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Deposit Notification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
  
          .header {
              text-align: center;
          }
  
          .content {
              padding: 20px;
          }
  
          .deposit-info {
              font-size: 16px;
              margin-top: 10px;
          }
  
          .signature {
              margin-top: 20px;
              font-style: italic;
              text-align: right;
          }
  
          .buttons {
              text-align: center;
              margin-top: 20px;
          }
  
          .button {
              display: inline-block;
              padding: 10px 20px;
              margin-right: 10px;
              text-decoration: none;
              background-color: #4CAF50;
              color: white;
              border-radius: 5px;
          }
  
          .cancel-button {
              background-color: #FF5722;
          }
  
          .file-preview {
              margin-top: 10px;
          }
  
          .file-preview img {
              max-width: 100%;
              height: auto;
              display: block;
              margin-top: 10px;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <div class="header">
              <h2>New Deposit Notification</h2>
          </div>
          <div class="content">
              <p>Dear Admin,</p>
              <p>We have received a new deposit request. Here are the deposit details:</p>
              <div class="deposit-info">
                  <p><strong>User:</strong> ${deposit.userEmail}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Amount:</strong> ${deposit.amount}</p>
                  <p><strong>Payment Mode:</strong> ${deposit.type}</p>
                  <p><strong>Date of Deposit:</strong> ${deposit.date.toLocaleString()}</p>
                  <p><strong>Proof of Payment:</strong></p>
                  <div class="file-preview">
                      ${getProofOfPaymentPreview(deposit.proofOfPayment)}
                  </div>
              </div>
              <div class="buttons">
                  <a href="${cancel}" class="button cancel-button">Cancel Payment</a>
                  <a href="${confirm}" class="button">Confirm Payment</a>
              </div>
              <p>If you have any questions or need further assistance, please reach out.</p>
              <div class="signature">
                  <p>Best regards,</p>
                  <p>Your Developer</p>
              </div>
          </div>
      </div>
  </body>
  
  </html>
  `;

  function getProofOfPaymentPreview(secureUrl) {
    const fileExtension = secureUrl.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return `<img src="${secureUrl}" alt="Proof of Payment">`;
    } else if (fileExtension === 'pdf') {
      return `<a href="${secureUrl}" download>Download PDF</a>`;
    } else {
      return `File format not supported for preview.`;
    }
  }
}



module.exports = {
  forgotMailTemplate,
  mailTemplate,
  paymentNotificationTemplate
}