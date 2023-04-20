#!/usr/bin/env bash
# exit on error
set -o errexit

npm install

pip install -r requirements.txt

python3 manage.py collectstatic --no-input
python3 manage.py migrate
python3 manage.py create_demo_user
