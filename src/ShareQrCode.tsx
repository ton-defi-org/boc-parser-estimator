
import QRCode from "react-qr-code";

export const ShareQrCode = (props: { shareUrl: string }) => {
    
    const { shareUrl } = props;
    
    if (!shareUrl) {
        return <></>
    }
    
    return <div title={shareUrl} style={{ height: "auto", margin: "0 auto", maxWidth: 350, width: "100%" }}>
    
        <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={shareUrl}
        viewBox={`0 0 256 256`}
        />
</div>
};
