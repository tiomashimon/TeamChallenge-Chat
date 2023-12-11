FROM python:3.11-alpine

ENV PYTHONUNBUFFERED=1

RUN apk add --no-cache bash
WORKDIR /code/

COPY ./requirements/ /code/requirements/
RUN pip install --no-cache-dir -r requirements/local.txt

# COPY Docker/local/entrypoint.sh /code/
COPY . /code/

# RUN chmod +x Docker/local/entrypoint.sh


# ENTRYPOINT ["/code/Docker/local/entrypoint.sh"]


