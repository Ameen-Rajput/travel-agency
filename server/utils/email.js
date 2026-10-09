const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send booking confirmation email
const sendBookingConfirmation = async (bookingData) => {
  const { customerName, email, tourName, startDate, endDate, guests, amount } = bookingData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Booking Confirmation - Marwa Travel',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d4a574;">Booking Confirmation</h2>
        <p>Dear ${customerName},</p>
        <p>Thank you for booking with Marwa Travel! Your booking has been confirmed.</p>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Booking Details:</h3>
          <p><strong>Tour:</strong> ${tourName}</p>
          <p><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> ${new Date(endDate).toLocaleDateString()}</p>
          <p><strong>Number of Guests:</strong> ${guests}</p>
          <p><strong>Total Amount:</strong> $${amount}</p>
        </div>

        <p>We will contact you shortly with further details.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>

        <p>Best regards,<br/>Marwa Travel Team</p>
      </div>
    `
  };

  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      await transporter.sendMail(mailOptions);
      console.log('✅ Booking confirmation email sent to:', email);
    } else {
      console.log('⚠️ Email credentials not configured. Skipping email send.');
    }
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};

// Send admin notification
const sendAdminNotification = async (bookingData) => {
  const { customerName, phoneNumber, tourName, startDate, guests, amount } = bookingData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: 'New Booking Alert - Marwa Travel',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d4a574;">New Booking Received!</h2>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Customer Details:</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Phone:</strong> ${phoneNumber}</p>
          <p><strong>Tour:</strong> ${tourName}</p>
          <p><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString()}</p>
          <p><strong>Guests:</strong> ${guests}</p>
          <p><strong>Amount:</strong> $${amount}</p>
        </div>

        <p>Login to the admin dashboard to view complete details.</p>
      </div>
    `
  };

  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      await transporter.sendMail(mailOptions);
      console.log('✅ Admin notification email sent');
    }
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
  }
};

module.exports = {
  sendBookingConfirmation,
  sendAdminNotification
};
