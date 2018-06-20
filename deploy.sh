#!/usr/bin/env bash

BUCKET="your-bucket-name"
AccessToken="your-facebook-app-access-token"

# cd to root of project
cd $(git rev-parse --show-toplevel)

cd consumer
yarn --pure-lockfile
cd ../worker
yarn --pure-lockfile
cd ..

aws cloudformation package \
    --template-file cloudformation.yml \
    --s3-bucket "${BUCKET}" \
    --output-template-file output.yml

aws cloudformation deploy \
    --template-file output.yml \
    --stack-name sqs-lambda-example \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides AccessToken="${AccessToken}"

rm output.yml