FROM python:3.11
ENV PYTHONUNBUFFERED=1
WORKDIR code/
COPY ./requirements/ /code/requirements/
RUN pip install --no-cache-dir -r requirements/local.txt
COPY . /code/