FROM python:3.11-alpine

ENV PYTHONUNBUFFERED=1

RUN apk add --no-cache bash
WORKDIR /code/

COPY ./requirements/celery /code/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /code/