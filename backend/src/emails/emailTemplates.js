export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to SyncLounge</title>
  </head>
  <body style="font-family: 'Courier New', Courier, monospace; line-height: 1.6; color: #c8d8e8; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #05080f;">

    <!-- Header -->
    <div style="background: linear-gradient(180deg, #0a0f1e 0%, #060d1a 100%); padding: 40px 30px; text-align: center; border-radius: 4px 4px 0 0; border-top: 2px solid #00e5ff; border-left: 1px solid #0a2a3a; border-right: 1px solid #0a2a3a; position: relative; overflow: hidden;">
      
      <!-- Grid overlay effect -->
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px); background-size: 30px 30px; pointer-events: none;"></div>

      <!-- Logo glow ring -->
      <div style="display: inline-block; width: 80px; height: 80px; border-radius: 50%; border: 2px solid #00e5ff; box-shadow: 0 0 20px #00e5ff, 0 0 40px rgba(0,229,255,0.3), inset 0 0 20px rgba(0,229,255,0.1); margin-bottom: 24px; line-height: 76px; font-size: 32px; color: #00e5ff; background: rgba(0,229,255,0.05);">&#9671;</div>

      <div style="font-size: 11px; letter-spacing: 6px; color: #ff6b00; text-transform: uppercase; margin-bottom: 10px; text-shadow: 0 0 10px rgba(255,107,0,0.8);">TRANSMISSION INCOMING</div>
      <h1 style="color: #00e5ff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; text-shadow: 0 0 20px rgba(0,229,255,0.9), 0 0 40px rgba(0,229,255,0.4);">SyncLounge</h1>
      <div style="font-size: 10px; letter-spacing: 4px; color: #4a7a8a; margin-top: 8px; text-transform: uppercase;">SECURE CHANNEL ESTABLISHED</div>
    </div>

    <!-- Body -->
    <div style="background: linear-gradient(180deg, #060d1a 0%, #080e1c 100%); padding: 40px 35px; border-left: 1px solid #0a2a3a; border-right: 1px solid #0a2a3a;">

      <!-- Greeting -->
      <div style="margin-bottom: 28px;">
        <div style="font-size: 10px; color: #ff6b00; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 8px; text-shadow: 0 0 8px rgba(255,107,0,0.6);">// IDENTITY CONFIRMED</div>
        <p style="font-size: 20px; color: #00e5ff; margin: 0; font-weight: 700; letter-spacing: 2px; text-shadow: 0 0 15px rgba(0,229,255,0.7);">HELLO, ${name.toUpperCase()}.</p>
      </div>

      <p style="color: #7a9ab0; font-size: 14px; line-height: 1.8; margin-bottom: 28px; letter-spacing: 0.5px;">You have been granted access to the Messenger network. Real-time encrypted communications are now available to you across all nodes — regardless of location, regardless of distance.</p>

      <!-- Steps block -->
      <div style="background: rgba(0,229,255,0.03); border: 1px solid rgba(0,229,255,0.15); border-left: 3px solid #ff6b00; padding: 25px 28px; border-radius: 2px; margin: 28px 0; box-shadow: 0 0 30px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,229,255,0.02);">
        <div style="font-size: 10px; color: #ff6b00; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 16px; text-shadow: 0 0 8px rgba(255,107,0,0.6);">// ONBOARDING PROTOCOL</div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,229,255,0.08); color: #7a9ab0; font-size: 13px; letter-spacing: 0.5px;">
              <span style="color: #00e5ff; margin-right: 12px; text-shadow: 0 0 8px rgba(0,229,255,0.7);">01</span> Upload identity profile
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,229,255,0.08); color: #7a9ab0; font-size: 13px; letter-spacing: 0.5px;">
              <span style="color: #00e5ff; margin-right: 12px; text-shadow: 0 0 8px rgba(0,229,255,0.7);">02</span> Locate and sync your contacts
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(0,229,255,0.08); color: #7a9ab0; font-size: 13px; letter-spacing: 0.5px;">
              <span style="color: #00e5ff; margin-right: 12px; text-shadow: 0 0 8px rgba(0,229,255,0.7);">03</span> Initialize a secure channel
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #7a9ab0; font-size: 13px; letter-spacing: 0.5px;">
              <span style="color: #00e5ff; margin-right: 12px; text-shadow: 0 0 8px rgba(0,229,255,0.7);">04</span> Transmit files, images, and data
            </td>
          </tr>
        </table>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 36px 0;">
        <a href="${clientURL}" style="display: inline-block; background: transparent; color: #00e5ff; text-decoration: none; padding: 14px 44px; border: 1px solid #00e5ff; border-radius: 2px; font-family: 'Courier New', Courier, monospace; font-size: 13px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; text-shadow: 0 0 10px rgba(0,229,255,0.8); box-shadow: 0 0 20px rgba(0,229,255,0.2), inset 0 0 20px rgba(0,229,255,0.05);">[ ACCESS NETWORK ]</a>
      </div>

      <!-- Closing -->
      <div style="border-top: 1px solid rgba(0,229,255,0.1); padding-top: 24px; margin-top: 8px;">
        <p style="color: #4a6a7a; font-size: 13px; margin: 0 0 4px 0; letter-spacing: 0.5px;">Support channels remain open around the clock.</p>
        <p style="color: #4a6a7a; font-size: 13px; margin: 0 0 20px 0; letter-spacing: 0.5px;">Stay connected. Stay vigilant.</p>
        <p style="color: #00e5ff; font-size: 13px; margin: 0; letter-spacing: 1px; text-shadow: 0 0 8px rgba(0,229,255,0.5);">— The Messenger Network</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #040810; text-align: center; padding: 24px 20px; border-radius: 0 0 4px 4px; border-bottom: 1px solid #0a2a3a; border-left: 1px solid #0a2a3a; border-right: 1px solid #0a2a3a;">
      <p style="color: #1e3545; font-size: 11px; margin: 0 0 10px 0; letter-spacing: 2px; text-transform: uppercase;">© 2025 MESSENGER CORP. ALL RIGHTS RESERVED.</p>
      <p style="margin: 0;">
        <a href="#" style="color: #2a4a5a; text-decoration: none; margin: 0 12px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">Privacy</a>
        <a href="#" style="color: #2a4a5a; text-decoration: none; margin: 0 12px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">Terms</a>
        <a href="#" style="color: #2a4a5a; text-decoration: none; margin: 0 12px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">Contact</a>
      </p>
    </div>

  </body>
  </html>
  `;
}
