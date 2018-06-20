Lamba + SQS Facebook og-update shizzle dizzle ma nizzle fizzle

## How

Create an s3 bucket to hold your lambda script:

`aws s3 mb s3://facebook-og-scrape-shizzle-dizzle-fizzle`

Add your bucket and [facebook application token](https://developers.facebook.com/docs/facebook-login/access-tokens/#apptokens) to `deploy.sh`

Deploy this nizzle with `nvm use 8 && ./deploy.sh`

Fill the SQS with an url, it'll get scraped by facebook in few minutes.

## Todo

- Lambda + API gateway where you can POST url's to get scraped

## Credits

Nearly all of this shit comes from [widdix/sqs-lambda-example](https://github.com/widdix/sqs-lambda-example)