#!/bin/bash

set -e

host="$1"
shift
cmd="$@"

until nc -z "$host" 27017; do
  >&2 echo "MongoDB is unavailable - sleeping"
  sleep 5
done

>&2 echo "MongoDB is up - executing command"
exec sh -c "$cmd"
