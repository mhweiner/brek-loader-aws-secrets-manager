# Brek AWS Secrets Manager Loader

[![build status](https://github.com/mhweiner/brek-loader-aws-secrets-manager/actions/workflows/release.yml/badge.svg)](https://github.com/mhweiner/pgsmith/actions)
[![SemVer](https://img.shields.io/badge/SemVer-2.0.0-blue)]()
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![AutoRel](https://img.shields.io/badge/v2-AutoRel?label=AutoRel&labelColor=0ab5fc&color=grey&link=https%3A%2F%2Fgithub.com%2Fmhweiner%2Fautorel)](https://github.com/mhweiner/autorel)

This is a loader for [brek](https://github.com/mhweiner/brek) that loads secrets from [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html). It is a simple and easy-to-use loader that allows you to load secrets from AWS Secrets Manager into your configuration.

## Installation

```bash
npm install @brekjs/loader-aws-secrets-manager
```

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

_brek.loaders.js_
```javascript
const {awsSecret} = require('@brekjs/loader-aws-secrets-manager');

module.exports = {
    awsSecret,
};
```

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