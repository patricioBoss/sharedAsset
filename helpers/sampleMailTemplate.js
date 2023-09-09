const sampleMailTemplate = (name = '', message) => `<!DOCTYPE html>
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
            margin: 0;
            font-size: 16px;
            line-height: 24px;
        }
    </style>
</head>

<body style="margin:0;padding:0; padding-bottom: 50px; min-height: 100vh; background-color:#ffffff ;">
    <table role="presentation"
        style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
        <tr>
            <td align="center" style="padding:0;">
                <table role="presentation"
                    style="width:600px;border-collapse:collapse;border-spacing:0;text-align:left;">
                    <tr style="background-color:  #ffffff;">
                        <td align="center" style="padding:0px 0 0px 0; border-bottom: solid 20px #1081E8 ;">
                            <!-- <img src="https://assets.codepen.io/210284/h1.png" alt="" height="300"  /> -->
                            <img class="logo" role="img"
                                src="https://pipsville-bucket.s3.us-west-004.backblazeb2.com/pipsville-email.png"
                                height="200px" alt="pipsville logo">
                        </td>
                    </tr>
                    <tr style="background-color: #fafafa;">
                        <td style="padding:36px 30px 42px 30px;">
                            <table role="presentation"
                                style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                <tr>
                                    <td style="padding:0 0 36px 0;color:#153643;">
                                        <h3
                                            style="font-size:32px;margin:0 0 20px 0;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-weight:bold;">
                                            hello, ${name}</h3>
                                        <p> ${message}	</p>
                                        <p
                                            style="margin:0;font-size:16px;line-height:24px;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; ">
                                            Click  <a href="https://www.pipsville.top/login">here</a> to login.</p>
                                       <br/>
                                       <br/>
                                       <br/>
                                       <br/>

                                       
                                            <p
                                            style="margin:0;font-size:16px;line-height:24px;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; ">
                                            Contact support to know more.</p>
                                    </td>
                                </tr>
                                <!-- <tr>
                                    <td style="padding:0 0 36px 0;color:#153643;">
                                    </td>
                                </tr> -->

                            </table>
                        </td>
                    </tr>


                    <tr>

                        <td align="left" style="vertical-align:top;">

                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td align="center" style="vertical-align:top;padding:21px 28px 17px 27px;"
                                            bgcolor="#0026a0">


                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>

                                                        <td align="left" style="vertical-align:middle;">


                                                            <table border="0" cellspacing="0" cellpadding="0">
                                                                <tbody>
                                                                    <tr>


                                                                        <td align="left"
                                                                            style="vertical-align:top;padding-top:0px;">
                                                                            <h1
                                                                                style="display: inline-block; font-size:32px; color: #ffffff; margin:0 0 0 0;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-weight:bold;">
                                                                                PIPSVILLE</h1>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <td align="left" style="vertical-align:top;">

                                                            <table width="100%" border="0" cellspacing="0"
                                                                cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="right" style="vertical-align:top;">

                                                                            <table border="0" cellspacing="0"
                                                                                cellpadding="0">
                                                                                <tbody>
                                                                                    <tr>

                                                                                        <td align="left"
                                                                                            style="vertical-align:top;">
                                                                                            <a rel="nofollow noopener noreferrer"
                                                                                                target="_blank"
                                                                                                href="https://t.me/PipsvilleCrypto_support"
                                                                                                style="color:#ffffff;text-decoration:none;">

                                                                                        <td align="left"
                                                                                            style="vertical-align:top;padding:0px 10px;">
                                                                                            <a rel="nofollow noopener noreferrer"
                                                                                                target="_blank"
                                                                                                href="https://twitter.com/yahoomail"
                                                                                                style="color:#000001;text-decoration:none;"><img
                                                                                                    src="https://pipsville-bucket.s3.us-west-004.backblazeb2.com/telegram.png"
                                                                                                    width="40"
                                                                                                    height="40"
                                                                                                    border="0"
                                                                                                    alt="Twitter"
                                                                                                    style="display:block;font-size:14px;color:#fffffe;">
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
                                        <td align="center" style="vertical-align:top;padding:44px 0px 28px 0px;"
                                            bgcolor="#1081E8">


                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td align="center"
                                                            style="vertical-align:top;font-family:Arial, Helvetica, sans-serif;font-size:13px;line-height:17px;color:#ffffff;font-weight:bold;">
                                                            <a rel="nofollow noopener noreferrer" target="_blank"
                                                                href="#"
                                                                style="color:#ffffff;text-decoration:none;"><span
                                                                    class="yiv9127454720link">Privacy
                                                                    Policy</span></a>&nbsp;|&nbsp;<a
                                                                rel="nofollow noopener noreferrer" target="_blank"
                                                                href="https://t.me/PipsvilleCrypto_support"
                                                                style="color:#ffffff;text-decoration:none;"><span
                                                                    class="yiv9127454720link">Customer&nbsp;Support</span></a>&nbsp;|&nbsp;<a
                                                                rel="nofollow noopener noreferrer" target="_blank"
                                                                href="https://www.pipsville.top/"
                                                                style="color:#ffffff;text-decoration:none;"><span
                                                                    class="yiv9127454720link">View
                                                                    Online</span></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="vertical-align:top;font-family:Arial, Helvetica, sans-serif;font-size:13px;line-height:16px;color:#ffffff;padding-top:13px;">
                                                            Ensure that you continue to receive your e-mails from Yahoo
                                                            Mail.<br>

                                                            Please add <a rel="nofollow noopener noreferrer"
                                                                target="_blank"
                                                                href="https://t.me/PipsvilleCrypto_support"
                                                                style="color:#ffffff;text-decoration:none;"><span
                                                                    style="color:#ffffff;text-decoration:none;">Pipsville
                                                                    Investment</span></a> to
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

export default sampleMailTemplate;
