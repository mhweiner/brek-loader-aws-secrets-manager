# Brek AWS Secrets Manager Loader

[![build status](https://github.com/mhweiner/brek-loader-aws-secrets-manager/actions/workflows/release.yml/badge.svg)](https://github.com/mhweiner/brek-loader-aws-secrets-manager/actions)
[![SemVer](https://img.shields.io/badge/SemVer-2.0.0-blue)]()
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![AutoRel](https://img.shields.io/badge/v2-AutoRel?label=AutoRel&labelColor=0ab5fc&color=grey&link=https%3A%2F%2Fgithub.com%2Fmhweiner%2Fautorel)](https://github.com/mhweiner/autorel)

This is a loader for [brek](https://github.com/mhweiner/brek) that loads secrets from [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html). It is a simple and easy-to-use loader that allows you to load secrets from AWS Secrets Manager into your configuration.

## Installation

1. **Install the package and `brek` using npm/yarn:**

    ```bash
    npm install @brekjs/loader-aws-secrets-manager brek
    ```

2. **Install the AWS SDK v3:**

    ```bash
    npm install @aws-sdk/client-secrets-manager
    ```

3. **Configure your AWS credentials:**

    You can do this by setting the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables, or by using the AWS CLI to configure your credentials. You can also use [OpenID Connect](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_oidc.html) or [AWS SSO](https://docs.aws.amazon.com/singlesignon/latest/userguide/getting-started.html) to authenticate.

4. **Set IAM Policy:**

    Make sure that the IAM role you are using for your server has the necessary permissions to access the secrets in AWS Secrets Manager. You can do this by attaching the following policy to role (as an example):

    ```yaml
    Version: '2012-10-17'
    Statement:
        - Effect: Allow
          Action:
            - secretsmanager:GetSecretValue
            - secretsmanager:DescribeSecret
          Resource: "*"
    ```

    Read more about [IAM policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) and [AWS Secrets Manager permissions](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples.html).

## Usage

To use the loader, you need to add it to your `brek` configuration. You can do this by adding the following code to your `brek.loaders.js` configuration file:

_brek.loaders.js_
```javascript
const {awsSecret} = require('@brekjs/loader-aws-secrets-manager');

module.exports = {
    awsSecret,
};
```

Then, you can use the loader in your configuration files. For example, if you have a configuration file called `/config/prod.json`, you can use the loader like this:

_config/prod.json_
```json
{
  "foo": {
    "[awsSecret]": {
      "key": "foo",
      "region": "us-east-1"
    }
  }
} 
```

> Note: Region is optional but recommended.

The loader will automatically load the secret from AWS Secrets Manager and replace the `[awsSecret]` placeholder with the value of the secret.

_blah.ts_
```typescript
import {getConfig} from "brek";

const {foo} = getConfig();
console.log(foo); // MySuperSecretValue
```

[🔗 Learn more about how to use Loaders with brek](https://github.com/mhweiner/brek/blob/main/docs/loaders.md)

## Contributing

- ⭐ Star this repo if you like it!
- 🐛 Open an [issue](https://github.com/mhweiner/brek-loader-aws-secrets-manager/issues) for bugs or suggestions.
- 🤝 Submit a PR to `main` — all tests must pass.