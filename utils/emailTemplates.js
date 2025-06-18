function generateVerificationEmail({ fullname, code }) {
    return {
        subject: 'Chào mừng bạn đến với dịch vụ của chúng tôi',
        text: `Xin chào ${fullname},\n\nCảm ơn bạn đã đăng ký tài khoản. Mã xác thực của bạn là: ${code}\n\nMã sẽ hết hạn sau 5 phút.\n\nTrân trọng,\nĐội ngũ hỗ trợ`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <h2 style="color: #007bff;">🎉 Chào mừng bạn đến với dịch vụ của chúng tôi!</h2>
                <p>Xin chào <strong>${fullname}</strong>,</p>
                <p>Cảm ơn bạn đã đăng ký tài khoản.</p>
                <p style="font-size: 16px; margin: 20px 0 8px;">Mã xác thực của bạn là:</p>
                <div style="font-size: 22px; font-weight: bold; color: #ffffff; background-color: #007bff; padding: 12px 24px; display: inline-block; border-radius: 6px; letter-spacing: 2px;">
                    ${code}
                </div>
                <p style="margin-top: 20px; color: #d9534f;">⚠️ Mã xác thực chỉ có hiệu lực trong 5 phút.</p>
                <p style="margin-top: 30px;">Trân trọng,<br><strong>Đội ngũ hỗ trợ</strong></p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
                <p style="font-size: 13px; color: #888;">Nếu bạn không thực hiện đăng ký, vui lòng bỏ qua email này.</p>
            </div>
        `
    };
}

function generateForgotPasswordEmail({ fullname, code }) {
    return {
        subject: 'Yêu cầu đặt lại mật khẩu',
        text: `Xin chào ${fullname},\n\nBạn đã yêu cầu đặt lại mật khẩu. Mã xác thực của bạn là: ${code}\n\nMã sẽ hết hạn sau 5 phút.\n\nNếu không phải bạn yêu cầu, vui lòng bỏ qua.`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; background-color: #fefefe; border-radius: 8px; border: 1px solid #ddd;">
                <h2 style="color: #dc3545;">🔐 Yêu cầu đặt lại mật khẩu</h2>
                <p>Xin chào <strong>${fullname}</strong>,</p>
                <p>Bạn đã yêu cầu đặt lại mật khẩu. Mã xác thực của bạn là:</p>
                <div style="font-size: 22px; font-weight: bold; color: #ffffff; background-color: #dc3545; padding: 12px 24px; display: inline-block; border-radius: 6px;">
                    ${code}
                </div>
                <p style="margin-top: 20px; color: #d9534f;">⚠️ Mã xác thực chỉ có hiệu lực trong 5 phút.</p>
                <p style="margin-top: 30px;">Nếu không phải bạn yêu cầu, vui lòng bỏ qua email này.</p>
                <p>Trân trọng,<br><strong>Đội ngũ hỗ trợ</strong></p>
            </div>
        `
    };
}


module.exports = { generateVerificationEmail, generateForgotPasswordEmail };
