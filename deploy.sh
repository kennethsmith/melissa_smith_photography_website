#!/usr/bin/env bash

aws s3 sync \
   ./ \
   s3://www.melissasmithphotography.com/ \
   --profile greyarea
