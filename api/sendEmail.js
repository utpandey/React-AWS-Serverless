const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async event => {

    const { to, from, subject, text } = JSON.parse(event.body);

    if (!to || !from || !subject || !text) {
        return res_400({ message: 'missing parameter on request body' })
    }

    const emailParams = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Text: { Data: text }
            },
            Subject: { Data: subject }
        },
        Source: from
    }

    try {
        await ses.sendEmail(emailParams).promise();

        return res_200()
    } catch (err) {
        console.log('Error in sending email!', err);

        return res_400({ message: 'Unable to send email...' })
    }
}

const res_400 = body => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: 400,
        body: JSON.stringify(body)
    }
}


const res_200 = () => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*" // Allow from anywhere 
        },
        statusCode: 200,
        body: '',
    }
}