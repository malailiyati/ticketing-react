FROM ubuntu:24.04

RUN apt-get update && apt-get install openssh-server -y

RUN mkdir -p /run/sshd

RUN useradd -m -d /home/lala -s /usr/bin/bash lala

COPY ssh_acces_container.pub /home/lala/.ssh/authorized_keys

RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config
RUN sed -i 's/#PubkeyAuthentication no/PubkeyAuthentication yes/' /etc/ssh/sshd_config

CMD ["/usr/sbin/sshd", "-D", "-e"]