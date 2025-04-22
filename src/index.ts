import {SecretsManagerClient, GetSecretValueCommand} from '@aws-sdk/client-secrets-manager';

/**
 * AWS Secrets loader for brek.
 *
 * Config example:
 *
 * {
 *   "dbPassword": {
 *     "[awsSecret]": {
 *       "secretName": "my/db/password",
 *       "region": "us-west-2"  // optional; falls back to AWS_REGION env var or defaults to 'us-east-1'
 *     }
 *   }
 * }
 *
 */

export const awsSecret = async (params: {
    secretName: string
    region?: string
}): Promise<string> => {

    const region = params.region || process.env.AWS_REGION || 'us-east-1';
    const client = new SecretsManagerClient({region});
    const command = new GetSecretValueCommand({SecretId: params.secretName});
    const response = await client.send(command);

    if (response.SecretString) {

        return response.SecretString;

    } else if (response.SecretBinary) {

        // Convert binary secret to string (UTF-8 decoded)
        return Buffer.from(response.SecretBinary as Uint8Array).toString('utf-8');

    } else {

        throw new Error(`Secret ${params.secretName} did not return any string or binary data.`);

    }

};
