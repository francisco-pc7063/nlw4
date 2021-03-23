FROM debian:buster

RUN apt update
RUN apt install -y apache2 net-tools

RUN a2enmod proxy proxy_http
RUN rm /etc/apache2/sites-enabled/*
COPY ./proxy.conf /etc/apache2/sites-enabled/

#ENV MAPPING
ENV SERVER_NAME=""
ENV SERVER_URL=""

ENV FRONTEND_URI="/"
ENV FRONTEND_URL="http://frontend.example"

ENV BACKEND_URI="/api"
ENV BACKEND_URL="http://api.example/api"


#DEBUG TOOLS
RUN apt install -y curl sudo bash vim
#COPY ./debug.sh /tmp/
#RUN chmod 700 /tmp/debug.sh

COPY ./apacheStart.sh /opt/
RUN chmod 700 /opt/apacheStart.sh
CMD [ "/opt/apacheStart.sh" ]
