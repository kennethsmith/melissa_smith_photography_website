#!/usr/bin/env bash

aws s3 sync \
   ./ \
   s3://www.melissasmithphotography.com/ \
   --profile greyarea
   
aws cloudfront create-invalidation --distribution-id E1RLOE638VT4JU --paths "/*" --profile greyarea