import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import crypto from 'crypto'


MoMo.propTypes = {
    orderID: PropTypes.string,
    total: PropTypes.number,
}

MoMo.defaultProps = {
    orderID: '',
    total: 0,
}


function MoMo(props) {

    const [error, setError] = useState(false)

    const { orderID, total } = props

    console.log(orderID)

    useEffect(() => {
        const path = "https://test-payment.momo.vn/gw_payment/transactionProcessor"
        const partnerCode = "MOMOHMXO20210608"
        const accessKey = "XPBbArMut5PxmWiY"
        const serectkey = "uLb683H8g9dWuiyipZbLHgO6zjSDlVm5"
        const orderInfo = "Thanh toán MoMo"
        const notifyurl = "http://localhost:8000/api/Payment/momo"
        const returnUrl = "http://localhost:3000/momo"
        const amount = total.toString()
        const orderId = orderID
        const requestType = "captureMoMoWallet"
        const extraData = "merchantName=Payment"
        const rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${orderId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&returnUrl=${returnUrl}&notifyUrl=${notifyurl}&extraData=${extraData}`

        var signature = crypto.createHmac('sha256', serectkey)
            .update(rawSignature)
            .digest('hex');

        var body = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: orderId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            returnUrl: returnUrl,
            notifyUrl: notifyurl,
            extraData: extraData,
            requestType: requestType,
            signature: signature
        })

        axios.post(path, body)
            .then((response) => {
                if (response.data.errorCode !== 0) {
                    setError(true)
                    setTimeout(() => {
                        setError(false)
                    }, 1500)
                } else {

                    window.location.href = response.data.payUrl

                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            })
    }, [orderID])

    return (
        <div>
            {
                error &&
                <div className="modal_success">
                    <div className="group_model_success pt-3">
                        <div className="text-center p-2">
                            <i className="fa fa-bell fix_icon_bell" style={{ fontSize: '40px', color: '#fff', backgroundColor: '#f84545' }}></i>
                        </div>
                        <h4 className="text-center p-3" style={{ color: '#fff' }}>Lỗi thanh toán!!!</h4>
                    </div>
                </div>
            }
        </div>
    );
}

export default MoMo;