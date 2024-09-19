//demo payment momo by "collection link"

import { NextResponse } from "next/server";
import crypto from 'crypto'
import axios from 'axios'
import { AuthenticatedRequest, checkLogin } from "../../auth/auth";

var accessKey = 'F8BBA842ECF85';
var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
var orderInfo = 'Pay with MoMo';
var partnerCode = 'MOMO';
var redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}/product`;
const ipnUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/payment/invoice`;
var requestType = "payWithMethod";
// var amount = '1000';
var orderId = partnerCode + new Date().getTime();
var requestId = orderId;
var orderGroupId = '';
var autoCapture = true;
var lang = 'vi';

//before sign HMAC SHA256 with format
//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType





const createPaymentLink = async (request: AuthenticatedRequest) => {
    try {
        const user = request.user;

        if (typeof user !== 'string' && user && user.id) {
            const userId = user.id;
            const { amount, products } = await request.json();

            const extraData = Buffer.from(JSON.stringify({ userId, products })).toString('base64');

            var rawSignature =
                'accessKey=' +
                accessKey +
                '&amount=' +
                amount +
                '&extraData=' +
                extraData +
                '&ipnUrl=' +
                ipnUrl +
                '&orderId=' +
                orderId +
                '&orderInfo=' +
                orderInfo +
                '&partnerCode=' +
                partnerCode +
                '&redirectUrl=' +
                redirectUrl +
                '&requestId=' +
                requestId +
                '&requestType=' +
                requestType;

            //signature
            var signature = crypto.createHmac('sha256', secretKey)
                .update(rawSignature)
                .digest('hex');


            const requestBody = JSON.stringify({
                partnerCode: partnerCode,
                partnerName: 'Test',
                storeId: 'MomoTestStore',
                requestId: requestId,
                amount: amount,
                orderId: orderId,
                orderInfo: orderInfo,
                redirectUrl: redirectUrl,
                ipnUrl: ipnUrl,
                lang: lang,
                requestType: requestType,
                autoCapture: autoCapture,
                extraData: extraData,
                orderGroupId: orderGroupId,
                signature: signature
            });
            const options = {
                method: 'POST',
                url: 'https://test-payment.momo.vn/v2/gateway/api/create',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(requestBody),
                },
                data: requestBody,
            };

            const result = await axios(options);
            return NextResponse.json(result.data);
        }
        else {
            return NextResponse.json({ message: 'Invalid user information' }, { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

export const POST = checkLogin(createPaymentLink);

