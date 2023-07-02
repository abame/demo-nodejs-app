# Instructions

## Preface

This application runs on Node.js with ExpressJs framework, Nunjucks as template engine.

Coding standards and style are preserved by using multiple linters which are executed in CI
or locally via [MegaLinter](https://megalinter.io/latest/configuration/)

Tests are executed no ensure that the functionality is working even though here we don't have
too many tests since this is for demo purposes. They are executed via Jest test framework.

It uses AWS cloud to deploy the application on which the resources are provisioned by using
Terraform infrastructure as code.

Terraform needs to be executed manually before since it's not part of the CI/CD.

Yarn is used as a package manager.

## Necessary Env Variables to run the application

Locally we can use `.env.dist` by copying it to `.env` and update the values accordingly
when we want to run the application without and with docker by using `docker-compose.yaml`.

In CI/CD, the env variables are retrieved from GitHub secrets of the repository.

```bash
API_BASE_HOST=http://127.0.0.1:3000
PORT=3000
AUTH_TOKEN='CHANGE_ME' #base64 encoding of AUTH_USERNAME and AUTH_PASSWORD
AUTH_USERNAME=CHANGE_ME
AUTH_PASSWORD=CHANGE_ME
```

Please check the commands in `package.json` scripts section to run the application locally
without docker for development mode.

## Necessary Env Variables to run terraform

Please expose the following env variables on your machine or in your workflow if you decide
to create one.

```bash
TF_VAR_access_key=AWS_ACCESS_KEY_ID
TF_VAR_secret_key=AWS_SECRET_ACCESS_KEY
TF_VAR_aws_region=AWS_REGION
TF_VAR_account_id=AWS_ACCOUNT
TF_VAR_ecr_image=ECR_IMAGE
```
