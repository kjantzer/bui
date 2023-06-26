FROM mysql/mysql-server:5.7 as base

# install `pv` (Pipe Viewer) for the sync script
RUN yum install -y http://www.ivarch.com/programs/rpms/pv-1.6.6-1.x86_64.rpm

WORKDIR /home

# install nodejs (and deps) for the sync script
# https://medium.com/@andrejusb/how-to-setup-node-js-and-oracle-jet-on-oracle-linux-1cec1e96d54e
# TODO: update node version
RUN yum install -y gcc-c++ make \
    && curl -sL https://rpm.nodesource.com/setup_10.x | bash - \
    && yum install nodejs -y \
    && npm install chalk@4.1.2

# add sync script
ADD sync /home/sync


# The database image
FROM base
# NOTE: sync script must be created
ADD sync.js /home/sync.js