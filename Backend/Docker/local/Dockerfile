FROM python:3.11-alpine

ENV PYTHONUNBUFFERED=1

RUN apk add --no-cache bash
WORKDIR code/
COPY ./requirements/ /code/requirements/
RUN pip install --no-cache-dir -r requirements/local.txt
COPY . /code/