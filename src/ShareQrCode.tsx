
import QRCode from "react-qr-code";
import base64url from "base64url"

export const ShareQrCode = (props: { shareUrl: string }) => {
    
    let { shareUrl } = props;
    
    if (!shareUrl) {
        return <></>
    }

    shareUrl = base64url.fromBase64(shareUrl)
    return <div title={shareUrl} style={{ height: "auto", margin: "2rem auto", maxWidth: 350, width: "100%" }}>
        <div className="title">Share this boc through QR code</div>
        <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={shareUrl}
        viewBox={`0 0 256 256`}
        />
</div>
};
