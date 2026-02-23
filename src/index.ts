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

interface AWSError extends Error {
    code?: string
    requestId?: string
    statusCode?: number
}

function formatError(params: {key: string, region?: string}, err: AWSError): string {

    return `Error getting secret AWS Secrets Manager:
    Key: ${params.key}
    Region: ${params.region}
    Message: ${err.message}
    Code: ${err.code}
    RequestId: ${err.requestId}
    StatusCode: ${err.statusCode}`;

}

export const awsSecret = async (params: {key: string, region?: string}): Promise<string> => {

    const region = params.region || process.env.AWS_REGION || 'us-east-1';
    const client = new SecretsManagerClient({region});
    const command = new GetSecretValueCommand({SecretId: params.key});
    const [err, response] = await toResultAsync(client.send(command));

    if (err) throw new Error(formatError(params, err as AWSError));

    if (response.SecretString) return response.SecretString;

    if (response.SecretBinary) {

        return Buffer.from(response.SecretBinary as Uint8Array).toString('utf-8');

    }

    throw new Error(`Error getting secret AWS Secrets Manager:
        Key: ${params.key}
        Region: ${params.region}
        Message: Returned secret is empty`);

};
