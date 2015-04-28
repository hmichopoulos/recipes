#!/bin/bash

# Stops marathon, mesos-slave, mesos-master, zookeeper and starts them in reverse order
# TODO: better write a nice script for this

service marathon stop
service mesos-slave stop
service mesos-master stop
service zookeeper stop

service zookeeper start
service mesos-master start
service mesos-slave start
service marathon start
