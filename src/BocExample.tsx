
const BOC_WITH_STATE_INIT = 'te6cckECAwEAAQ8AAt+IAbcaWXVUguqdxz4NjDzLseJCFvWPlUckZQ7AwWRqvm78EZ50PcvxScy9x3qXO+Do6kpHnnPlEFZiHF4DuyhYcUGUaIiiRsTdjDmm+SSmb2czzydjnagg0zLnNeWmUh1KyAClNTRi/////+AAAAAQAQIA3v8AIN0gggFMl7ohggEznLqxn3Gw7UTQ0x/THzHXC//jBOCk8mCDCNcYINMf0x/TH/gjE7vyY+1E0NMf0x/T/9FRMrryoVFEuvKiBPkBVBBV+RDyo/gAkyDXSpbTB9QC+wDo0QGkyMsfyx/L/8ntVABQAAAAACmpoxcnJTZWfAxBC0SpxXMaIHJbrgfb9No7xJuHNDXaluLadzgetvk=';
const BOC_REGULAR_TX = 'te6cckEBAgEAqQAB34gBtxpZdVSC6p3HPg2MPMux4kIW9Y+VRyRlDsDBZGq+bvwBGJ82qnbjKmXg2u8Of75PNExfAShOBw8CeFHsqAlP364VGB5bEmZyQllIAE3YESvKWOB22QsEC2NFl1AU9FuQWU1NGLsZbKaYAAAACBwBAGhiAHXG0W1CXIYD9CYFNJmdkDcOTrv6yoxMePd0iiCVO26WIBfXhAAAAAAAAAAAAAAAAAAA3/KpOA==';

const SWAP_TON_JETTON =
    "te6cckEBAgEAwAAB34gBxw5akQfJaXlBLYO7rsolHBjY6Ik5Q1Lb9shmS/UwX+QFA+Mbn+vZ8Ki59o1FxqPPryCmcmnP7kY/h0spwq4aKadFQ4MoY/f9KegMbjnn82fQFGHrSdFML3/Pd5VYpYkQaU1NGLsaKFOAAAAMWBwBAJZiAANz3f4sXwpr54TNIKSy7yqQ3VQK/hjvbW8+S2+TzSHqIh+YKAAAAAAAAAAAAAAAAAAAAAAAGQAAAAAAAAABQ7msoAYWbs98KJwKMPmK";

const SWAP_JETTON_TON =
    "te6cckECAwEAAQ8AAd+IAccOWpEHyWl5QS2Du67KJRwY2OiJOUNS2/bIZkv1MF/kBnRSZfWv+62Sayl1lgAMMqDMLT+mekwqIHxlXL1jW+mEkMkaTI0BkS2vX2IAA0Q+FgbTyW2zvLm4Up/kjpBNEFlNTRi7GihegAAADFgcAQFoYgAsINhSTiB00s++1QqrBeb4d1/4USV8aWHz2lw8jgvH06BCwdgAAAAAAAAAAAAAAAAAAQIAxQ+KfqUAAAAAAAAAAWWvMQekAAgBJRzl59Y42NrFTK/xPHgN0bvOu3ZL1501dw55CQFGsuMAOOHLUiD5LS8oJbB3ddlEo4MbHREnKGpbftkMyX6mC/yICrqVAAAAABhBfqjMWOUNPJw=";

const DEPLOY_JETTON = "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";


export const BocExample = ( props: {parseBoc: Function, setName: Function}) => {
    
    function onclick(data: any, name:string) {
        props.parseBoc(data);
        props.setName(name);
    }

    return (
        <div className="border-b">
            <div>Boc Examples</div>
            <div onClick={onclick.bind(null, BOC_REGULAR_TX, 'boc empty')} className="boc-button">boc empty</div>
            <div onClick={onclick.bind(null, BOC_WITH_STATE_INIT, 'boc boc')} className="boc-button">boc boc-state-init</div>
            <div onClick={onclick.bind(null, DEPLOY_JETTON, 'Deploy Jetton')} className="boc-button">Deploy Jetton</div>
            <div onClick={onclick.bind(null, SWAP_JETTON_TON, 'Swap ton')} className="boc-button">Swap Ton</div>
            <div onClick={onclick.bind(null, SWAP_TON_JETTON, 'Swap Jetton')} className="boc-button">Swap Jetton</div>
        </div>   )
}