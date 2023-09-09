const emailTemplate = (name = '', verificationLink) => `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title></title>
  <!--[if mso]>
	<noscript>
		<xml>
			<o:OfficeDocumentSettings>
				<o:PixelsPerInch>96</o:PixelsPerInch>
			</o:OfficeDocumentSettings>
		</xml>
	</noscript>
	<![endif]-->
  <style>
    table,
    td,
    div,
    h1,
    p {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
  </style>
</head>

<body style="margin:0;padding:0; padding-bottom: 50px; min-height: 100vh; background-color:#ffffff ;">
  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" style="width:600px;border-collapse:collapse;border-spacing:0;text-align:left;">
          <tr style="background-color:  #ffffff;">
            <td align="center" style="padding:0px 0 0px 0; border-bottom: solid 20px #1081E8 ;">
              <!-- <img src="https://assets.codepen.io/210284/h1.png" alt="" height="300"  /> -->
              <img class="logo" role="img"
                src="https://pipsville-bucket.s3.us-west-004.backblazeb2.com/pipsville+logo2.jpg" height="250px"
                alt="yahoo">
            </td>
          </tr>
          <tr style="background-color: #fafafa;">
            <td style="padding:36px 30px 42px 30px;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                <tr>
                  <td style="padding:0 0 36px 0;color:#153643;">
                    <h1
                      style="font-size:32px;margin:0 0 20px 0;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-weight:bold;">
                      Welcome to pipsville, ${name}</h1>
                    <p
                      style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; ">
                      Proceed to identity verification by clicking the proceed button below</p>
                    <p
                      style="margin:0;font-size:16px;line-height:24px;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; ">
                      note, this link expires in 30 days. Login to continue.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 36px 0;color:#153643;">
                    <a target="_blank" href="${verificationLink}" role="link"
                      style="font-size: 24px; padding: 10px 30px; background-color: #1081E8; font-weight: bold; color: white; text-decoration: none;">
                      Proceed</a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>


          <tr>

            <td align="left" style="vertical-align:top;">

              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td align="center" style="vertical-align:top;padding:21px 28px 17px 27px;" bgcolor="#0026a0">


                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                          <tr>

                            <td align="left" style="vertical-align:middle;">


                              <table border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>


                                    <td align="left" style="vertical-align:top;padding-top:0px;">
                                      <h1
                                        style="display: inline-block; font-size:32px; color: #ffffff; margin:0 0 0 0;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-weight:bold;">
                                        PIPSVILLE</h1>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td align="left" style="vertical-align:top;">

                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td align="right" style="vertical-align:top;">

                                      <table border="0" cellspacing="0" cellpadding="0">
                                        <tbody>
                                        <tr>

                                        <td align="left" style="vertical-align:top;"><a
                                            rel="nofollow noopener noreferrer" target="_blank"
                                            href="https://t.me/PipsvilleCrypto_support"
                                            style="color:#ffffff;text-decoration:none;">
                                            
                                            <svg stroke="currentColor" fill="currentColor" style="width:41px;height:41px;" stroke-width="0" viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"></path></svg>
                                        </td>
                                      </tr>
                                        </tbody>
                                      </table>

                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                            </td>

                          </tr>
                        </tbody>
                      </table>

                    </td>
                  </tr>
                </tbody>
              </table>



              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td align="center" style="vertical-align:top;padding:44px 0px 28px 0px;" bgcolor="#1081E8">


                      <table border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                          <tr>
                            <td align="center"
                              style="vertical-align:top;font-family:Arial, Helvetica, sans-serif;font-size:13px;line-height:17px;color:#ffffff;font-weight:bold;">
                              <a rel="nofollow noopener noreferrer" target="_blank" href="#"
                                style="color:#ffffff;text-decoration:none;"><span class="yiv9127454720link">Privacy
                                  Policy</span></a>&nbsp;|&nbsp;<a rel="nofollow noopener noreferrer" target="_blank"
                                href="https://t.me/PipsvilleCrypto_support"
                                style="color:#ffffff;text-decoration:none;"><span
                                  class="yiv9127454720link">Customer&nbsp;Support</span></a>&nbsp;|&nbsp;<a
                                rel="nofollow noopener noreferrer" target="_blank" href="pipsville.top"
                                style="color:#ffffff;text-decoration:none;"><span class="yiv9127454720link">View
                                  Online</span></a>
                            </td>
                          </tr>
                          <tr>
                            <td align="center"
                              style="vertical-align:top;font-family:Arial, Helvetica, sans-serif;font-size:13px;line-height:16px;color:#ffffff;padding-top:13px;">
                              Ensure that you continue to receive your e-mails from Yahoo Mail.<br>

                              Please add <a rel="nofollow noopener noreferrer"
                                target="_blank"
                                href="https://t.me/PipsvilleCrypto_support"
                                style="color:#ffffff;text-decoration:none;"><span
                                  style="color:#ffffff;text-decoration:none;">Pipsville Investment</span></a> to
                              your Address Book or Safe List.</td>
                          </tr>
                          <tr>
                            <td align="center"
                              style="vertical-align:top;font-family:Arial, Helvetica, sans-serif;font-size:13px;line-height:17px;color:#ffffff;padding-top:13px;"
                              class="yiv9127454720whiteLinkText">© 2022 pipsville </td>
                          </tr>
                        </tbody>
                      </table>

                    </td>
                  </tr>
                </tbody>
              </table>


            </td>
          </tr>




        </table>
      </td>
    </tr>
  </table>
</body>

</html>`;

export default emailTemplate;
