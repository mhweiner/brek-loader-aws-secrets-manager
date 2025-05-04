import {SecretsManagerClient, GetSecretValueCommand} from '@aws-sdk/client-secrets-manager';
import {toResultAsync} from './lib/toResult';

/**
 * AWS Secrets loader for brek.
 *
 * Config example:
 *
 * {
 *   "dbPassword": {
 *     "[awsSecret]": {
 *       "key": "my/db/password",
 *       "region": "us-west-2"  // optional; falls back to env var AWS_REGION env var or defaults to 'us-east-1'
 *     }
 *   }
 * }
 *
 */

// eslint-disable-next-line max-lines-per-function
export const awsSecret = async (params: {
    key: string
    region?: string
}): Promise<string> => {

    const region = params.region || process.env.AWS_REGION || 'us-east-1';
    const client = new SecretsManagerClient({region});
    const command = new GetSecretValueCommand({SecretId: params.key});
    const [err, response] = await toResultAsync(client.send(command));

    if (err) {

        throw new Error(`Error getting secret AWS Secrets Manager:
    Key: ${params.key}
    Region: ${params.region}
    Message: ${err.message}
    Code: ${(err as any).code}
    RequestId: ${(err as any).requestId}
    StatusCode: ${(err as any).statusCode}
`);

    }

    if (response.SecretString) {

        return response.SecretString;

    } else if (response.SecretBinary) {

        // Convert binary secret to string (UTF-8 decoded)
        return Buffer.from(response.SecretBinary as Uint8Array).toString('utf-8');

    } else {

        throw new Error(`Error getting secret AWS Secrets Manager:
            Key: ${params.key}
            Region: ${params.region}$
            Message: Returned secret is empty
        `);

    }

};
