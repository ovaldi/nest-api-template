import * as env from '@/misc/env';
import AWS, { SES } from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  credentials: {
    accessKeyId: env.get('AWS_SES_KEY'),
    secretAccessKey: env.get('AWS_SES_SECRET'),
  },
});

export const send = async (message: SES.Message, to: string): Promise<void> => {
  const service = new AWS.SES({apiVersion: '2010-12-01'});
  await service.sendEmail({
    Message: message,
    Source: env.get('AWS_SES_SENDER'),
    Destination: { ToAddresses: [to] },
  }).promise();
};
