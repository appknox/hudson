FROM quay.io/appknox/ak-ubuntu:2.0.0

LABEL maintainer "Appknox <engineering@appknox.com>"

RUN adduser --disabled-password --gecos '' hudson

RUN DEBIAN_FRONTEND=noninteractive apt-get update -y && \
  apt-get install -y nodejs nginx

ENTRYPOINT ["./docker/entrypoint.sh"]

WORKDIR /code
COPY . /code/
RUN chown -R hudson:hudson /code/
COPY nginx.conf /etc/nginx/nginx.conf

RUN gosu hudson npm install
