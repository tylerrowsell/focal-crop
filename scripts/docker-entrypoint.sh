#!/bin/bash
set -euo pipefail

if [[ -z "${CI:-}" ]]; then
    SECRETS_PATH="config/secrets.${ENV}.ejson"
    echo "Decrypting secrets from ${SECRETS_PATH}"
    ejson --keydir /key decrypt -o "config/secrets.json" ${SECRETS_PATH}
fi

exec "$@"